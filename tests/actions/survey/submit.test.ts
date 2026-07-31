import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitSurvey } from "@/lib/actions/survey/submit";
import prisma from "@/lib/prisma";
import {
    createCompleteCentralAnswers,
    createValidSurveySubmission,
} from "@/tests/fixtures/surveySubmission";

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
    default: {
        patient: {
            upsert: vi.fn(),
            create: vi.fn(),
        },
        surveySubmission: {
            create: vi.fn(),
        },
    },
}));

vi.mock("@clerk/nextjs/server", () => ({
    auth: vi.fn().mockResolvedValue({ userId: "mock-user-id" }),
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

describe("Server Action: submitSurvey", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockValidData = {
        ...createValidSurveySubmission(),
        part1: {
            ...createValidSurveySubmission().part1,
            bloodSugarKnown: "ไม่ทราบ" as const,
        },
        sectionTwo: {
            ...createValidSurveySubmission().sectionTwo,
            respondentName: "John Doe",
            birthDate: "1990-01-01",
            age: "34",
        },
        sectionFour: {
            answers: createCompleteCentralAnswers(5),
            reportData: {},
        },
        nationalId: "1234567890123",
    };

    it("should return error if input validation fails", async () => {
        // Mock console.error to suppress expected error logs
        const consoleSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        // Create invalid data by missing required field or wrong type
        const invalidData = { ...mockValidData, region: "" }; // Empty region might fail based on schema min(1)
        const result = await submitSurvey(invalidData);

        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
        // Prisma should NOT be called
        expect(prisma.patient.upsert).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.create).not.toHaveBeenCalled();

        // Restore console.error
        consoleSpy.mockRestore();
    });

    it("should successfully submit survey and call Prisma methods", async () => {
        // Mock Prisma responses
        vi.mocked(prisma.patient.upsert).mockResolvedValue({
            id: "patient-id",
        } as any);

        vi.mocked(prisma.surveySubmission.create).mockResolvedValue({
            id: "submission-id",
        } as any);

        const result = await submitSurvey(mockValidData);

        // If validation fails, result.success will be false. Check console error if so.
        if (!result.success) {
            console.error("Test failed validation:", result.error);
        }

        expect(result.success).toBe(true);
        expect(result.submissionId).toBe("submission-id");
        expect(result.totalScore).toBe(145);

        // Check if DB was called
        expect(prisma.patient.upsert).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { nationalId: "1234567890123" },
                create: expect.objectContaining({ firstName: "John" }),
            }),
        );

        expect(prisma.surveySubmission.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    patientId: "patient-id",
                    submittedByUserId: "mock-user-id",
                    totalScorePart4: 145,
                }),
            }),
        );
    });

    it.each([
        ["คำตอบไม่ครบ", { 1: 5, 2: 4 }],
        [
            "มี question ID ที่ไม่มีอยู่จริง",
            {
                ...Object.fromEntries(
                    Object.entries(createCompleteCentralAnswers()).filter(
                        ([id]) => id !== "29",
                    ),
                ),
                99: 4,
            },
        ],
        [
            "มี question ID เกินมา",
            { ...createCompleteCentralAnswers(), 30: 4 },
        ],
        [
            "คะแนนอยู่นอกช่วง 1-6",
            { ...createCompleteCentralAnswers(), 1: 7 },
        ],
        [
            "คะแนนไม่ใช่จำนวนเต็ม",
            { ...createCompleteCentralAnswers(), 1: 1.5 },
        ],
    ])("should reject submission when %s", async (_caseName, answers) => {
        const consoleSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        const result = await submitSurvey({
            ...mockValidData,
            sectionFour: { answers, reportData: {} },
        });

        expect(result.success).toBe(false);
        expect(prisma.patient.upsert).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.create).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
