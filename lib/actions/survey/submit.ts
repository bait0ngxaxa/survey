"use server";

import prisma from "@/lib/prisma";
import { SurveySubmissionInputSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { generateReportData } from "@/lib/utils/reportGenerator";
import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { parseStrictDate } from "@/lib/validation/strictValueValidation";

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function calculateTotalScore(answers: Record<number, number>): number {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
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

type SubmissionReference = {
    id: string;
    totalScorePart4: number | null;
    submittedByUserId: string | null;
};

const submissionReferenceSelect = {
    id: true,
    totalScorePart4: true,
    submittedByUserId: true,
} as const;

class SubmissionTokenConflictError extends Error {
    constructor() {
        super("Submission token already exists");
        this.name = "SubmissionTokenConflictError";
    }
}

function isUniqueConstraintError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: unknown }).code === "P2002"
    );
}

async function findSubmissionByToken(
    submissionToken: string,
    userId: string,
): Promise<SubmissionReference | null> {
    const submission = await prisma.surveySubmission.findUnique({
        where: { submissionToken },
        select: submissionReferenceSelect,
    });

    if (!submission || submission.submittedByUserId !== userId) {
        return null;
    }

    return submission;
}

function toSubmitSurveyResult(
    submission: SubmissionReference,
    fallbackTotalScore?: number,
): SubmitSurveyResult {
    return {
        success: true,
        submissionId: submission.id,
        totalScore: submission.totalScorePart4 ?? fallbackTotalScore,
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
    let authenticatedUserId: string | null = null;

    try {
        const authorization = await requireAuthenticatedUser();
        if (!authorization.authorized) {
            return { success: false, error: authorization.error };
        }

        const { userId } = authorization;
        authenticatedUserId = userId;
        const existingSubmission = await findSubmissionByToken(
            data.submissionToken,
            userId,
        );
        if (existingSubmission) {
            revalidatePath("/admin/submissions");
            return toSubmitSurveyResult(existingSubmission);
        }

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
        const birthDateSnapshot = parseStrictDate(data.sectionTwo.birthDate);

        // Patient data ที่ใช้ทั้ง create และ update
        const patientData = {
            firstName,
            lastName,
            gender: data.sectionTwo.gender || null,
            birthDate: birthDateSnapshot,
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
            try {
                return await tx.surveySubmission.create({
                    data: {
                        submissionToken: data.submissionToken,
                        patientId,
                        respondentNameSnapshot,
                        genderSnapshot,
                        birthDateSnapshot,
                        region: data.region,
                        hospital: data.hospital || null,
                        submittedByUserId: userId,
                        totalScorePart4: totalScore,
                        rawAnswers,
                    },
                });
            } catch (error) {
                if (!isUniqueConstraintError(error)) {
                    throw error;
                }

                throw new SubmissionTokenConflictError();
            }
        });

        revalidatePath("/admin/submissions");

        return toSubmitSurveyResult(submission, totalScore);
    } catch (error) {
        if (error instanceof SubmissionTokenConflictError) {
            try {
                if (authenticatedUserId) {
                    const existingSubmission = await findSubmissionByToken(
                        data.submissionToken,
                        authenticatedUserId,
                    );
                    if (existingSubmission) {
                        revalidatePath("/admin/submissions");
                        return toSubmitSurveyResult(existingSubmission);
                    }
                }
            } catch (resolveError) {
                console.error(
                    "Error resolving existing survey submission:",
                    resolveError,
                );
            }
        }

        console.error("Error submitting survey:", error);
        return {
            success: false,
            error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        };
    }
}
