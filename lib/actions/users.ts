"use server";

import { clerkClient, auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export interface StaffUser {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    imageUrl: string | null;
    submissionCount: number;
    lastSubmission: Date | null;
}

export interface UserSubmission {
    id: string;
    patientName: string;
    region: string;
    createdAt: Date;
    totalScore: number | null;
    interpretation: string | null;
}

// Get all users with submission counts
export async function getStaffUsers(searchQuery?: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized", data: [] };
        }

        // Get all users from Clerk
        const client = await clerkClient();
        const { data: users } = await client.users.getUserList({
            limit: 100,
        });

        // Get submission counts grouped by userId
        const submissionCounts = await prisma.surveySubmission.groupBy({
            by: ["submittedByUserId"],
            _count: { id: true },
            where: {
                submittedByUserId: { not: null },
            },
        });

        // Get last submission dates
        const lastSubmissions = await prisma.surveySubmission.findMany({
            where: {
                submittedByUserId: { not: null },
            },
            orderBy: { createdAt: "desc" },
            distinct: ["submittedByUserId"],
            select: {
                submittedByUserId: true,
                createdAt: true,
            },
        });

        // Create lookup maps
        const countMap = new Map(
            submissionCounts.map((s) => [s.submittedByUserId, s._count.id])
        );
        const lastSubMap = new Map(
            lastSubmissions.map((s) => [s.submittedByUserId, s.createdAt])
        );

        // Map users with submission data
        let staffUsers: StaffUser[] = users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0]?.emailAddress || null,
            imageUrl: user.imageUrl,
            submissionCount: countMap.get(user.id) || 0,
            lastSubmission: lastSubMap.get(user.id) || null,
        }));

        // Filter by search query if provided
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            staffUsers = staffUsers.filter(
                (user) =>
                    user.firstName?.toLowerCase().includes(query) ||
                    user.lastName?.toLowerCase().includes(query) ||
                    user.email?.toLowerCase().includes(query)
            );
        }

        // Sort by submission count descending
        staffUsers.sort((a, b) => b.submissionCount - a.submissionCount);

        return { success: true, data: staffUsers };
    } catch (error) {
        console.error("Error fetching staff users:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
            data: [],
        };
    }
}

// Get submissions by a specific user
export async function getUserSubmissionsList(
    staffUserId: string,
    limit: number = 50
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized", data: [] };
        }

        const submissions = await prisma.surveySubmission.findMany({
            where: { submittedByUserId: staffUserId },
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            take: limit,
        });

        const userSubmissions: UserSubmission[] = submissions.map((s) => ({
            id: s.id,
            patientName:
                `${s.patient.firstName || ""} ${
                    s.patient.lastName || ""
                }`.trim() || "ไม่ระบุชื่อ",
            region: s.region,
            createdAt: s.createdAt,
            totalScore: s.totalScorePart4,
            interpretation: s.interpretationResult,
        }));

        return { success: true, data: userSubmissions };
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
            data: [],
        };
    }
}
