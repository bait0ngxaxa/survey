"use server";

import { type Prisma } from "@prisma/client";
import { requireAdminUser } from "@/lib/auth/guards";
import { cache } from "react";
import prisma from "@/lib/prisma";
import {
    GetAllSubmissionsParamsSchema,
    GetSubmissionsParamsSchema,
} from "@/lib/schemas";
import type { RawAnswers } from "@/lib/types";
import {
    ERROR_FETCH_FAILED,
    ERROR_INVALID_PARAMS,
} from "@/lib/constants/errors";
import { SUBMISSIONS_BULK_BATCH_SIZE } from "@/lib/constants/submissionsConstants";
import { getSubmissionSnapshot } from "@/lib/utils/submissionSnapshot";

const submissionWhere = (
    regionFilter: string,
    searchQuery: string,
): Prisma.SurveySubmissionWhereInput => ({
    ...(regionFilter && { region: regionFilter }),
    ...(searchQuery && {
        OR: [
            {
                id: {
                    contains: searchQuery,
                    mode: "insensitive",
                },
            },
            {
                rawAnswers: {
                    path: ["part1", "interviewerName"],
                    string_contains: searchQuery,
                },
            },
            {
                rawAnswers: {
                    path: ["sectionTwo", "respondentName"],
                    string_contains: searchQuery,
                },
            },
            {
                respondentNameSnapshot: {
                    contains: searchQuery,
                    mode: "insensitive",
                },
            },
        ],
    }),
});

const BULK_SUBMISSION_SELECT = {
    id: true,
    createdAt: true,
    region: true,
    rawAnswers: true,
    respondentNameSnapshot: true,
    genderSnapshot: true,
    birthDateSnapshot: true,
    patient: {
        select: {
            id: true,
            nationalId: true,
            firstName: true,
            lastName: true,
            gender: true,
            birthDate: true,
        },
    },
} as const;

type BulkSubmission = Prisma.SurveySubmissionGetPayload<{
    select: typeof BULK_SUBMISSION_SELECT;
}>;

type GetAllSubmissionsResult =
    | {
          success: true;
          data: BulkSubmission[];
          total: number;
      }
    | {
          success: false;
          error: string;
          data: [];
      };

// Check if user is admin (deduplicated per request via React.cache)
const checkAdmin = cache(async (): Promise<void> => {
    const authorization = await requireAdminUser();

    if (!authorization.authorized) {
        throw new Error(authorization.error);
    }
});

export async function getAdminStats() {
    await checkAdmin();

    const totalSubmissions = await prisma.surveySubmission.count();

    const byRegion = await prisma.surveySubmission.groupBy({
        by: ["region"],
        _count: {
            _all: true,
        },
    });

    const byHospital = await prisma.surveySubmission.groupBy({
        by: ["hospital"],
        _count: {
            _all: true,
        },
    });

    return {
        totalSubmissions,
        byRegion: byRegion.map((r) => ({
            region: r.region,
            count: r._count._all,
        })),
        byHospital: byHospital.map((h) => ({
            hospital: h.hospital,
            count: h._count._all,
        })),
    };
}

import { unstable_cache } from "next/cache";

const getCachedSubmissionsData = unstable_cache(
    async (
        page: number,
        pageSize: number,
        regionFilter: string,
        searchQuery: string,
    ) => {
        const skip = (page - 1) * pageSize;

        const where = submissionWhere(regionFilter, searchQuery);

        const [submissions, total] = await Promise.all([
            prisma.surveySubmission.findMany({
                skip,
                take: pageSize,
                where,
                orderBy: { createdAt: "desc" },
                include: {
                    patient: true,
                },
            }),
            prisma.surveySubmission.count({ where }),
        ]);

        return { submissions, total };
    },
    ["admin-submissions-data"],
    {
        tags: ["dashboard-submissions"],
        revalidate: 3600,
    },
);

export async function getSubmissions(params?: unknown) {
    await checkAdmin();

    const parsed = GetSubmissionsParamsSchema.safeParse(params || {});
    if (!parsed.success) {
        console.error("Validation error:", parsed.error.flatten());
        return {
            submissions: [],
            total: 0,
            totalPages: 0,
            currentPage: 1,
            error: "Invalid parameters",
        };
    }

    const { page, pageSize, regionFilter, searchQuery } = parsed.data;

    // Use cached data fetching
    // Note: We need to pass primitive values to the cached function for the key generation to work predictably
    const { submissions, total } = await getCachedSubmissionsData(
        page,
        pageSize,
        regionFilter || "",
        searchQuery || "",
    );

    const submissionsWithInterviewer = submissions.map((s) => {
        const rawAnswers = s.rawAnswers as unknown as RawAnswers;
        const interviewerName = rawAnswers?.part1?.interviewerName || null;
        const respondentName = getSubmissionSnapshot(s).respondentName;

        return {
            ...s,
            interviewer: interviewerName,
            respondent: respondentName,
        };
    });

    return {
        submissions: submissionsWithInterviewer,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
    };
}

/**
 * Fetches every submission matching the supplied filters in cursor batches.
 * The batch size limits each database response, not the total result set.
 */
export async function getAllSubmissionsForAdmin(
    params?: unknown,
): Promise<GetAllSubmissionsResult> {
    const authorization = await requireAdminUser();
    if (!authorization.authorized) {
        return { success: false, error: authorization.error, data: [] };
    }

    const parsed = GetAllSubmissionsParamsSchema.safeParse(params || {});
    if (!parsed.success) {
        return { success: false, error: ERROR_INVALID_PARAMS, data: [] };
    }

    const { regionFilter, searchQuery } = parsed.data;
    const where = submissionWhere(regionFilter, searchQuery);

    try {
        const total = await prisma.surveySubmission.count({ where });
        const submissions: BulkSubmission[] = [];
        let cursor: { id: string } | undefined;

        if (total === 0) {
            return { success: true, data: submissions, total };
        }

        while (true) {
            const batch = await prisma.surveySubmission.findMany({
                where,
                orderBy: [{ createdAt: "desc" }, { id: "desc" }],
                take: SUBMISSIONS_BULK_BATCH_SIZE,
                ...(cursor ? { cursor, skip: 1 } : {}),
                select: BULK_SUBMISSION_SELECT,
            });

            if (batch.length === 0) break;

            submissions.push(...batch);

            if (batch.length < SUBMISSIONS_BULK_BATCH_SIZE) break;

            const lastSubmission = batch[batch.length - 1];
            if (!lastSubmission) break;

            cursor = { id: lastSubmission.id };
        }

        return { success: true, data: submissions, total };
    } catch (error) {
        console.error("Error fetching all admin submissions:", error);
        return { success: false, error: ERROR_FETCH_FAILED, data: [] };
    }
}
