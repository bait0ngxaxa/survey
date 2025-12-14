"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import {
    Part1Data,
    SectionTwoData,
    MedicalRecordData,
    SectionFourData,
} from "@/lib/types";

export interface SurveySubmissionInput {
    region: string;
    hospital?: string;
    nationalId?: string;
    part1: Part1Data;
    sectionTwo: SectionTwoData;
    medicalRecord: MedicalRecordData;
    sectionFour: SectionFourData;
}

// คำนวณคะแนนรวม
function calculateTotalScore(answers: Record<number, number>): number {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
}

// Helper function to safely parse date
function parseDateSafely(dateString: string | undefined | null): Date | null {
    if (!dateString) return null;

    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return null;
    }

    return date;
}

export async function submitSurvey(input: SurveySubmissionInput) {
    try {
        const { userId } = await auth();

        const totalScore = calculateTotalScore(input.sectionFour.answers);

        // สร้างหรือค้นหา Patient
        let patient;
        if (input.nationalId) {
            patient = await prisma.patient.upsert({
                where: { nationalId: input.nationalId },
                update: {
                    firstName:
                        input.sectionTwo.respondentName.split(" ")[0] || null,
                    lastName:
                        input.sectionTwo.respondentName
                            .split(" ")
                            .slice(1)
                            .join(" ") || null,
                    gender: input.sectionTwo.gender || null,
                    birthDate: parseDateSafely(input.sectionTwo.birthDate),
                    addressData: {
                        livingArrangement: input.sectionTwo.livingArrangement,
                        livingMembers: input.sectionTwo.livingMembers,
                    },
                },
                create: {
                    nationalId: input.nationalId,
                    firstName:
                        input.sectionTwo.respondentName.split(" ")[0] || null,
                    lastName:
                        input.sectionTwo.respondentName
                            .split(" ")
                            .slice(1)
                            .join(" ") || null,
                    gender: input.sectionTwo.gender || null,
                    birthDate: parseDateSafely(input.sectionTwo.birthDate),
                    addressData: {
                        livingArrangement: input.sectionTwo.livingArrangement,
                        livingMembers: input.sectionTwo.livingMembers,
                    },
                },
            });
        } else {
            // ถ้าไม่มี nationalId ให้สร้าง Patient ใหม่เสมอ
            patient = await prisma.patient.create({
                data: {
                    firstName:
                        input.sectionTwo.respondentName.split(" ")[0] || null,
                    lastName:
                        input.sectionTwo.respondentName
                            .split(" ")
                            .slice(1)
                            .join(" ") || null,
                    gender: input.sectionTwo.gender || null,
                    birthDate: parseDateSafely(input.sectionTwo.birthDate),
                    addressData: {
                        livingArrangement: input.sectionTwo.livingArrangement,
                        livingMembers: input.sectionTwo.livingMembers,
                    },
                },
            });
        }

        // สร้าง rawAnswers ที่รวมข้อมูลทั้งหมด (แปลงเป็น plain JSON object)
        const rawAnswers = JSON.parse(
            JSON.stringify({
                part1: input.part1,
                sectionTwo: input.sectionTwo,
                medicalRecord: input.medicalRecord,
                sectionFour: input.sectionFour.answers,
                reportData: input.sectionFour.reportData,
            })
        );

        // บันทึก Survey Submission
        const submission = await prisma.surveySubmission.create({
            data: {
                patientId: patient.id,
                region: input.region,
                hospital: input.hospital || null,
                submittedByUserId: userId || null,
                totalScorePart4: totalScore,
                rawAnswers: rawAnswers,
            },
        });

        return {
            success: true,
            submissionId: submission.id,
            totalScore,
        };
    } catch (error) {
        console.error("Error submitting survey:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        };
    }
}

// ดึงข้อมูล submission ตาม id
export async function getSurveySubmission(submissionId: string) {
    try {
        const submission = await prisma.surveySubmission.findUnique({
            where: { id: submissionId },
            include: {
                patient: true,
            },
        });

        if (!submission) {
            return { success: false, error: "ไม่พบข้อมูล" };
        }

        return { success: true, data: submission };
    } catch (error) {
        console.error("Error fetching submission:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
        };
    }
}

// ดึงรายการ submissions ทั้งหมด (สำหรับ admin/staff)
export async function getSurveySubmissions(options?: {
    region?: string;
    hospital?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
}) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        const where: Record<string, unknown> = {};

        if (options?.region) where.region = options.region;
        if (options?.hospital) where.hospital = options.hospital;
        if (options?.startDate || options?.endDate) {
            where.createdAt = {};
            if (options.startDate)
                (where.createdAt as Record<string, Date>).gte =
                    options.startDate;
            if (options.endDate)
                (where.createdAt as Record<string, Date>).lte = options.endDate;
        }

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
                take: options?.limit || 50,
                skip: options?.offset || 0,
            }),
            prisma.surveySubmission.count({ where }),
        ]);

        return {
            success: true,
            data: submissions,
            total,
            limit: options?.limit || 50,
            offset: options?.offset || 0,
        };
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
        };
    }
}

// ดึง submissions ของ user ที่ login อยู่ (สำหรับ Dashboard)
export async function getUserSubmissions(limit: number = 10) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized", data: [] };
        }

        const submissions = await prisma.surveySubmission.findMany({
            where: { submittedByUserId: userId },
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            take: limit,
        });

        return { success: true, data: submissions };
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
            data: [],
        };
    }
}
