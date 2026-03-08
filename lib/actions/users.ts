"use server";

import { clerkClient, auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ERROR_UNAUTHORIZED, ERROR_GENERIC } from "@/lib/constants/errors";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants/submissionsConstants";

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
}

// Get all users with submission counts
export async function getStaffUsers(
    searchQuery?: string,
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE,
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                error: ERROR_UNAUTHORIZED,
                data: [],
                metadata: {
                    total: 0,
                    page: 1,
                    limit: DEFAULT_PAGE_SIZE,
                    totalPages: 0,
                },
            };
        }

        const client = await clerkClient();

        // Run all 3 independent queries in parallel
        const [{ data: users }, submissionCounts, lastSubmissions] =
            await Promise.all([
                client.users.getUserList({
                    limit: 100,
                    query: searchQuery,
                }),
                prisma.surveySubmission.groupBy({
                    by: ["submittedByUserId"],
                    _count: { id: true },
                    where: {
                        submittedByUserId: { not: null },
                    },
                }),
                prisma.surveySubmission.findMany({
                    where: {
                        submittedByUserId: { not: null },
                    },
                    orderBy: { createdAt: "desc" },
                    distinct: ["submittedByUserId"],
                    select: {
                        submittedByUserId: true,
                        createdAt: true,
                    },
                }),
            ]);

        // Create lookup maps
        const countMap = new Map(
            submissionCounts.map((s) => [s.submittedByUserId, s._count.id]),
        );
        const lastSubMap = new Map(
            lastSubmissions.map((s) => [s.submittedByUserId, s.createdAt]),
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
                    user.email?.toLowerCase().includes(query),
            );
        }

        // Sort by submission count descending - This is why we need to fetch all/many first
        staffUsers.sort((a, b) => b.submissionCount - a.submissionCount);

        const totalUsers = staffUsers.length;
        const totalPages = Math.ceil(totalUsers / limit);

        // Manual Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = staffUsers.slice(startIndex, endIndex);

        return {
            success: true,
            data: paginatedUsers,
            metadata: {
                total: totalUsers,
                page,
                limit,
                totalPages,
            },
        };
    } catch (error) {
        console.error("Error fetching staff users:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : ERROR_GENERIC,
            data: [],
            metadata: {
                total: 0,
                page: 1,
                limit: DEFAULT_PAGE_SIZE,
                totalPages: 0,
            },
        };
    }
}

// Get submissions by a specific user
export async function getUserSubmissionsList(
    staffUserId: string,
    limit: number = 50,
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: ERROR_UNAUTHORIZED, data: [] };
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
        }));

        return { success: true, data: userSubmissions };
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : ERROR_GENERIC,
            data: [],
        };
    }
}
