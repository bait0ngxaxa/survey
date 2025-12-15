"use server";

import prisma from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";

// Check if user is admin
async function checkAdmin() {
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

export async function getSubmissions(
    page = 1,
    pageSize = 10,
    regionFilter = "",
    searchQuery = ""
) {
    await checkAdmin();

    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: {
        region?: string;
        id?: { contains: string; mode: "insensitive" };
    } = {};

    if (regionFilter) {
        where.region = regionFilter;
    }

    // Search by Submission ID
    if (searchQuery) {
        where.id = { contains: searchQuery, mode: "insensitive" };
    }

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

    return {
        submissions,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
    };
}
