"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
    SurveySubmissionInputSchema,
    GetSubmissionsOptionsSchema,
} from "@/lib/schemas";

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

// Submit survey with Zod validation
export async function submitSurvey(input: unknown) {
    // Validate input with Zod
    const parsed = SurveySubmissionInputSchema.safeParse(input);
    if (!parsed.success) {
        console.error("Validation error:", parsed.error.flatten());
        return {
            success: false,
            error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง",
        };
    }

    const validatedInput = parsed.data;

    try {
        const { userId } = await auth();

        const totalScore = calculateTotalScore(
            validatedInput.sectionFour.answers
        );

        // สร้างหรือค้นหา Patient
        let patient;
        if (validatedInput.nationalId) {
            patient = await prisma.patient.upsert({
                where: { nationalId: validatedInput.nationalId },
                update: {
                    firstName:
                        validatedInput.sectionTwo.respondentName.split(
                            " "
                        )[0] || null,
                    lastName:
                        validatedInput.sectionTwo.respondentName
                            .split(" ")
                            .slice(1)
                            .join(" ") || null,
                    gender: validatedInput.sectionTwo.gender || null,
                    birthDate: parseDateSafely(
                        validatedInput.sectionTwo.birthDate
                    ),
                    addressData: {
                        livingArrangement:
                            validatedInput.sectionTwo.livingArrangement,
                        livingMembers: validatedInput.sectionTwo.livingMembers,
                    },
                },
                create: {
                    nationalId: validatedInput.nationalId,
                    firstName:
                        validatedInput.sectionTwo.respondentName.split(
                            " "
                        )[0] || null,
                    lastName:
                        validatedInput.sectionTwo.respondentName
                            .split(" ")
                            .slice(1)
                            .join(" ") || null,
                    gender: validatedInput.sectionTwo.gender || null,
                    birthDate: parseDateSafely(
                        validatedInput.sectionTwo.birthDate
                    ),
                    addressData: {
                        livingArrangement:
                            validatedInput.sectionTwo.livingArrangement,
                        livingMembers: validatedInput.sectionTwo.livingMembers,
                    },
                },
            });
        } else {
            // ถ้าไม่มี nationalId ให้สร้าง Patient ใหม่เสมอ
            patient = await prisma.patient.create({
                data: {
                    firstName:
                        validatedInput.sectionTwo.respondentName.split(
                            " "
                        )[0] || null,
                    lastName:
                        validatedInput.sectionTwo.respondentName
                            .split(" ")
                            .slice(1)
                            .join(" ") || null,
                    gender: validatedInput.sectionTwo.gender || null,
                    birthDate: parseDateSafely(
                        validatedInput.sectionTwo.birthDate
                    ),
                    addressData: {
                        livingArrangement:
                            validatedInput.sectionTwo.livingArrangement,
                        livingMembers: validatedInput.sectionTwo.livingMembers,
                    },
                },
            });
        }

        // สร้าง rawAnswers ที่รวมข้อมูลทั้งหมด (แปลงเป็น plain JSON object)
        const rawAnswers = JSON.parse(
            JSON.stringify({
                part1: validatedInput.part1,
                sectionTwo: validatedInput.sectionTwo,
                medicalRecord: validatedInput.medicalRecord,
                sectionFour: validatedInput.sectionFour.answers,
                reportData: validatedInput.sectionFour.reportData,
            })
        );

        // บันทึก Survey Submission
        const submission = await prisma.surveySubmission.create({
            data: {
                patientId: patient.id,
                region: validatedInput.region,
                hospital: validatedInput.hospital || null,
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
            error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        };
    }
}

// ดึงข้อมูล submission ตาม id
export async function getSurveySubmission(submissionId: string) {
    // Validate submissionId format
    if (!submissionId || typeof submissionId !== "string") {
        return { success: false, error: "Invalid submission ID" };
    }

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
            error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
        };
    }
}

// ดึงรายการ submissions ทั้งหมด (สำหรับ admin/staff)
export async function getSurveySubmissions(options?: unknown) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Validate options with Zod
        const parsed = GetSubmissionsOptionsSchema.safeParse(options || {});
        if (!parsed.success) {
            return { success: false, error: "Invalid options" };
        }

        const validatedOptions = parsed.data;
        const where: Record<string, unknown> = {};

        if (validatedOptions.region) where.region = validatedOptions.region;
        if (validatedOptions.hospital)
            where.hospital = validatedOptions.hospital;
        if (validatedOptions.startDate || validatedOptions.endDate) {
            where.createdAt = {};
            if (validatedOptions.startDate)
                (where.createdAt as Record<string, Date>).gte =
                    validatedOptions.startDate;
            if (validatedOptions.endDate)
                (where.createdAt as Record<string, Date>).lte =
                    validatedOptions.endDate;
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
                take: validatedOptions.limit || 50,
                skip: validatedOptions.offset || 0,
            }),
            prisma.surveySubmission.count({ where }),
        ]);

        return {
            success: true,
            data: submissions,
            total,
            limit: validatedOptions.limit || 50,
            offset: validatedOptions.offset || 0,
        };
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return {
            success: false,
            error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
        };
    }
}

// ดึง submissions ของ user ที่ login อยู่ (สำหรับ Dashboard)
export async function getUserSubmissions(limit: number = 10) {
    // Validate limit
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
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
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
