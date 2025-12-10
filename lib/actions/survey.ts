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

// คำนวณคะแนนรวมและแบ่งตาม section
function calculateScores(answers: Record<number, number>) {
    const totalScore = Object.values(answers).reduce(
        (sum, score) => sum + score,
        0
    );

    // แบ่ง section ตาม question id ranges (ปรับตามโครงสร้างจริงของ Part4)
    // ตัวอย่างการแบ่ง section - ควรปรับตาม part4Data.ts
    const sections: Record<string, number[]> = {
        daily_activities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        symptoms: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        psychosocial: [
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
        ],
        satisfaction: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    };

    const scoreBySection: Record<string, number> = {};
    for (const [sectionName, questionIds] of Object.entries(sections)) {
        scoreBySection[sectionName] = questionIds.reduce((sum, id) => {
            return sum + (answers[id] || 0);
        }, 0);
    }

    return { totalScore, scoreBySection };
}

// แปลผลคะแนน
function interpretScore(totalScore: number): string {
    // ตัวอย่างการแปลผล - ควรปรับตามเกณฑ์จริง
    if (totalScore <= 90) return "ผลลัพธ์ต่ำ";
    if (totalScore <= 180) return "ผลลัพธ์ปานกลาง";
    return "ผลลัพธ์ดี";
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

        const { totalScore, scoreBySection } = calculateScores(
            input.sectionFour.answers
        );
        const interpretation = interpretScore(totalScore);

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
                scoreBySection: scoreBySection,
                interpretationResult: interpretation,
                rawAnswers: rawAnswers,
            },
        });

        return {
            success: true,
            submissionId: submission.id,
            totalScore,
            scoreBySection,
            interpretation,
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
