import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { submitSurvey } from "@/lib/actions/survey/submit";
import prisma from "@/lib/prisma";
import {
    initialPart1Data,
    initialSectionTwoData,
    initialMedicalRecordData,
} from "@/lib/initialData";

// Note: This is an integration test. It uses the real `prisma` client.
// It requires a running database to pass. Next.js creates its own environment
// or we can mock out `auth()` to pass the Clerk middleware.

import { auth } from "@clerk/nextjs/server";
import { vi } from "vitest";

// We mock ONLY Clerk Auth, everything else is real.
vi.mock("@clerk/nextjs/server", () => ({
    auth: vi.fn().mockResolvedValue({ userId: "integration-test-user-id" }),
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

describe("Survey Submission Integration", () => {
    const testNationalId = "0000000000000";

    beforeEach(async () => {
        // Clean up test data before each run
        await prisma.surveySubmission.deleteMany({
            where: {
                patient: {
                    nationalId: testNationalId,
                },
            },
        });
        await prisma.patient.deleteMany({
            where: {
                nationalId: testNationalId,
            },
        });
        vi.clearAllMocks();
    });

    afterAll(async () => {
        // Final cleanup
        await prisma.surveySubmission.deleteMany({
            where: {
                patient: {
                    nationalId: testNationalId,
                },
            },
        });
        await prisma.patient.deleteMany({
            where: {
                nationalId: testNationalId,
            },
        });
        await prisma.$disconnect();
    });

    const mockValidData = {
        region: "central",
        part1: {
            ...initialPart1Data,
            bloodSugarKnown: "Yes",
            visitDoctor: "Yes",
        },
        sectionTwo: {
            ...initialSectionTwoData,
            respondentName: "Integration Test User",
            birthDate: "1980-05-15",
            gender: "Male",
            age: "45",
        },
        medicalRecord: { ...initialMedicalRecordData },
        sectionFour: {
            answers: { 1: 5, 2: 4 },
            reportData: {},
        },
        nationalId: testNationalId,
    };

    it("should write a new patient and submission to the database", async () => {
        // 1. Verify patient does not exist yet
        const existingPatient = await prisma.patient.findUnique({
            where: { nationalId: testNationalId },
        });
        expect(existingPatient).toBeNull();

        // 2. Execute Server Action
        const result = await submitSurvey(mockValidData);

        // 3. Assert Response
        expect(result.success).toBe(true);
        expect(result.submissionId).toBeDefined();

        // 4. Assert Database State
        const createdPatient = await prisma.patient.findUnique({
            where: { nationalId: testNationalId },
        });
        expect(createdPatient).not.toBeNull();
        expect(createdPatient?.firstName).toBe("Integration"); // Extracted from "Integration Test User"
        expect(createdPatient?.lastName).toBe("Test User");

        const createdSubmission = await prisma.surveySubmission.findUnique({
            where: { id: result.submissionId },
        });
        expect(createdSubmission).not.toBeNull();
        expect(createdSubmission?.region).toBe("central");
        expect(createdSubmission?.submittedByUserId).toBe(
            "integration-test-user-id",
        );
        expect(createdSubmission?.totalScorePart4).toBe(9); // 5 + 4

        // Check JSON payload was stored
        const rawAnswers = createdSubmission?.rawAnswers as any;
        expect(rawAnswers.part1.bloodSugarKnown).toBe("Yes");
        expect(rawAnswers.sectionTwo.gender).toBe("Male");
    });

    it("should link a new submission to an existing patient on subsequent submissions", async () => {
        // First submission creates the patient
        const result1 = await submitSurvey(mockValidData);
        expect(result1.success).toBe(true);

        // Change some data for second submission
        const secondSubmissionData = {
            ...mockValidData,
            sectionTwo: {
                ...mockValidData.sectionTwo,
                age: "46", // Updated age
            },
            sectionFour: {
                answers: { 1: 3, 2: 3 },
                reportData: {},
            },
        };

        // Second submission should link to the SAME patient
        const result2 = await submitSurvey(secondSubmissionData);
        expect(result2.success).toBe(true);

        // Verify we still only have 1 patient
        const patientCount = await prisma.patient.count({
            where: { nationalId: testNationalId },
        });
        expect(patientCount).toBe(1);

        // Verify we have 2 distinct submissions for this patient
        const submissions = await prisma.surveySubmission.findMany({
            where: { patient: { nationalId: testNationalId } },
            orderBy: { createdAt: "asc" },
        });

        expect(submissions.length).toBe(2);
        expect(submissions[0].id).toBe(result1.submissionId);
        expect(submissions[1].id).toBe(result2.submissionId);
        expect(submissions[0].totalScorePart4).toBe(9);
        expect(submissions[1].totalScorePart4).toBe(6);
    });
});
