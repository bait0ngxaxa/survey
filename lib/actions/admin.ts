"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { GetSubmissionsParamsSchema } from "@/lib/schemas";
import type { RawAnswers } from "@/lib/types";

// Check if user is admin
async function checkAdmin(): Promise<void> {
    const user = await currentUser();
    const role = user?.publicMetadata?.role;

    if (role !== "admin") {
        throw new Error("Unauthorized");
    }
}

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

        const [submissions, total] = await Promise.all([
            prisma.surveySubmission.findMany({
                skip,
                take: pageSize,
                where: {
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
                        ],
                    }),
                },
                orderBy: { createdAt: "desc" },
                include: {
                    patient: true,
                },
            }),
            prisma.surveySubmission.count({
                where: {
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
                        ],
                    }),
                },
            }),
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
        const respondentName = rawAnswers?.sectionTwo?.respondentName || null;

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
