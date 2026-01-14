"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GetSubmissionsOptionsSchema } from "@/lib/schemas";

// ============================================================
// GET SINGLE SUBMISSION
// ============================================================

export async function getSurveySubmission(submissionId: string) {
    if (!submissionId || typeof submissionId !== "string") {
        return { success: false, error: "Invalid submission ID" };
    }

    try {
        const submission = await prisma.surveySubmission.findUnique({
            where: { id: submissionId },
            include: { patient: true },
        });

        if (!submission) {
            return { success: false, error: "ไม่พบข้อมูล" };
        }

        return { success: true, data: submission };
    } catch (error) {
        console.error("Error fetching submission:", error);
        return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูล" };
    }
}

// ============================================================
// GET MULTIPLE SUBMISSIONS (Admin/Staff)
// ============================================================

export async function getSurveySubmissions(options?: unknown) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Validate options
        const parsed = GetSubmissionsOptionsSchema.safeParse(options || {});
        if (!parsed.success) {
            return { success: false, error: "Invalid options" };
        }

        const opts = parsed.data;

        // Build where clause
        const where: Record<string, unknown> = {};
        if (opts.region) where.region = opts.region;
        if (opts.hospital) where.hospital = opts.hospital;
        if (opts.startDate || opts.endDate) {
            where.createdAt = {
                ...(opts.startDate && { gte: opts.startDate }),
                ...(opts.endDate && { lte: opts.endDate }),
            };
        }

        // Execute queries
        const [submissions, total] = await Promise.all([
            prisma.surveySubmission.findMany({
                where,
                include: {
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true,
                            gender: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                take: opts.limit || 50,
                skip: opts.offset || 0,
            }),
            prisma.surveySubmission.count({ where }),
        ]);

        return {
            success: true,
            data: submissions,
            total,
            limit: opts.limit || 50,
            offset: opts.offset || 0,
        };
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูล" };
    }
}

// ============================================================
// GET USER'S OWN SUBMISSIONS
// ============================================================

export async function getUserSubmissions(limit: number = 10) {
    const validLimit = Math.min(Math.max(1, limit), 100);

    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized", data: [] };
        }

        const submissions = await prisma.surveySubmission.findMany({
            where: { submittedByUserId: userId },
            include: {
                patient: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
            orderBy: { createdAt: "desc" },
            take: validLimit,
        });

        return { success: true, data: submissions };
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        return {
            success: false,
            error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
            data: [],
        };
    }
}
