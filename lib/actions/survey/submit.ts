"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { SurveySubmissionInputSchema } from "@/lib/schemas";

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

export async function submitSurvey(input: unknown) {
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
        const { firstName, lastName } = splitFullName(
            data.sectionTwo.respondentName
        );

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

        // สร้างหรืออัปเดต Patient
        const patient = data.nationalId
            ? await prisma.patient.upsert({
                  where: { nationalId: data.nationalId },
                  update: patientData,
                  create: { nationalId: data.nationalId, ...patientData },
              })
            : await prisma.patient.create({ data: patientData });

        // สร้าง rawAnswers
        const rawAnswers = JSON.parse(
            JSON.stringify({
                part1: data.part1,
                sectionTwo: data.sectionTwo,
                medicalRecord: data.medicalRecord,
                sectionFour: data.sectionFour.answers,
                reportData: data.sectionFour.reportData,
            })
        );

        // บันทึก Survey Submission
        const submission = await prisma.surveySubmission.create({
            data: {
                patientId: patient.id,
                region: data.region,
                hospital: data.hospital || null,
                submittedByUserId: userId || null,
                totalScorePart4: totalScore,
                rawAnswers,
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
