"use server";

import prisma from "@/lib/prisma";
import { GetSubmissionsOptionsSchema } from "@/lib/schemas";
import {
    requireAdminUser,
    requireAuthenticatedUser,
} from "@/lib/auth/guards";
import {
    ERROR_NOT_FOUND,
    ERROR_FETCH_FAILED,
    ERROR_INVALID_SUBMISSION_ID,
    ERROR_INVALID_OPTIONS,
} from "@/lib/constants/errors";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants/submissionsConstants";
import { getSubmissionSnapshot } from "@/lib/utils/submissionSnapshot";

// ============================================================
// GET SINGLE SUBMISSION
// ============================================================

export async function getSurveySubmission(submissionId: string) {
    if (!submissionId || typeof submissionId !== "string") {
        return { success: false, error: ERROR_INVALID_SUBMISSION_ID };
    }

    try {
        const authorization = await requireAdminUser();
        if (!authorization.authorized) {
            return { success: false, error: authorization.error };
        }

        const submission = await prisma.surveySubmission.findUnique({
            where: { id: submissionId },
            include: { patient: true },
        });

        if (!submission) {
            return { success: false, error: ERROR_NOT_FOUND };
        }

        return { success: true, data: submission };
    } catch (error) {
        console.error("Error fetching submission:", error);
        return { success: false, error: ERROR_FETCH_FAILED };
    }
}

// ============================================================
// GET MULTIPLE SUBMISSIONS (Admin)
// ============================================================

export async function getSurveySubmissions(options?: unknown) {
    try {
        const authorization = await requireAdminUser();
        if (!authorization.authorized) {
            return { success: false, error: authorization.error };
        }

        // Validate options
        const parsed = GetSubmissionsOptionsSchema.safeParse(options || {});
        if (!parsed.success) {
            return { success: false, error: ERROR_INVALID_OPTIONS };
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
        return { success: false, error: ERROR_FETCH_FAILED };
    }
}

// ============================================================
// GET USER'S OWN SUBMISSIONS
// ============================================================

export async function getUserSubmissions(limit: number = DEFAULT_PAGE_SIZE) {
    const validLimit = Math.min(Math.max(1, limit), 100);

    try {
        const authorization = await requireAuthenticatedUser();
        if (!authorization.authorized) {
            return { success: false, error: authorization.error, data: [] };
        }

        const { userId } = authorization;

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

        const submissionsWithRespondent = submissions.map((submission) => ({
            ...submission,
            respondent: getSubmissionSnapshot(submission).respondentName,
        }));

        return { success: true, data: submissionsWithRespondent };
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        return {
            success: false,
            error: ERROR_FETCH_FAILED,
            data: [],
        };
    }
}
