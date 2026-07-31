"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { SurveySubmissionInputSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { generateReportData } from "@/lib/utils/reportGenerator";

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function calculateTotalScore(answers: Record<number, number>): number {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
}

function parseDateSafely(dateString: string | undefined | null): Date | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
}

function normalizeNationalId(value: string | undefined): string | null {
    const normalized = value?.trim();
    return normalized || null;
}

function splitFullName(fullName: string): {
    firstName: string | null;
    lastName: string | null;
} {
    const parts = fullName.trim().split(" ");
    return {
        firstName: parts[0] || null,
        lastName: parts.slice(1).join(" ") || null,
    };
}

// ============================================================
// SUBMIT SURVEY
// ============================================================

type SubmitSurveyResult = {
    success: boolean;
    error?: string;
    submissionId?: string;
    totalScore?: number;
};

export async function submitSurvey(
    input: unknown,
): Promise<SubmitSurveyResult> {
    // Validate input
    const parsed = SurveySubmissionInputSchema.safeParse(input);
    if (!parsed.success) {
        console.error("Validation error:", parsed.error.flatten());
        return {
            success: false,
            error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง",
        };
    }

    const data = parsed.data;

    try {
        const { userId } = await auth();
        const totalScore = calculateTotalScore(data.sectionFour.answers);
        // reportData from the client is intentionally ignored.
        const reportData = generateReportData(data.sectionFour.answers, {
            additionalInfo: data.sectionFour.additionalInfo,
        });
        const { firstName, lastName } = splitFullName(
            data.sectionTwo.respondentName,
        );
        const normalizedNationalId = normalizeNationalId(data.nationalId);
        const respondentNameSnapshot = data.sectionTwo.respondentName.trim();
        const genderSnapshot = data.sectionTwo.gender || null;
        const birthDateSnapshot = parseDateSafely(data.sectionTwo.birthDate);

        // Patient data ที่ใช้ทั้ง create และ update
        const patientData = {
            firstName,
            lastName,
            gender: data.sectionTwo.gender || null,
            birthDate: parseDateSafely(data.sectionTwo.birthDate),
            addressData: {
                livingArrangement: data.sectionTwo.livingArrangement,
                livingMembers: data.sectionTwo.livingMembers,
            },
        };

        // สร้าง rawAnswers
        const rawAnswers = JSON.parse(
            JSON.stringify({
                part1: data.part1,
                sectionTwo: data.sectionTwo,
                medicalRecord: data.medicalRecord,
                sectionFour: data.sectionFour.answers,
                additionalInfo: data.sectionFour.additionalInfo,
                reportData,
            }),
        );

        const submission = await prisma.$transaction(async (tx) => {
            let patientId: string | null = null;

            // Resolve Patient เฉพาะเมื่อมี stable identifier เท่านั้น
            if (normalizedNationalId) {
                const patient = await tx.patient.upsert({
                    where: { nationalId: normalizedNationalId },
                    update: patientData,
                    create: {
                        nationalId: normalizedNationalId,
                        ...patientData,
                    },
                });

                patientId = patient.id;
            }

            // บันทึก Survey Submission
            return tx.surveySubmission.create({
                data: {
                    patientId,
                    respondentNameSnapshot,
                    genderSnapshot,
                    birthDateSnapshot,
                    region: data.region,
                    hospital: data.hospital || null,
                    submittedByUserId: userId || null,
                    totalScorePart4: totalScore,
                    rawAnswers,
                },
            });
        });

        revalidatePath("/admin/submissions");

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
