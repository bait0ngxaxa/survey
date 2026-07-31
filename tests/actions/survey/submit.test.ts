import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitSurvey } from "@/lib/actions/survey/submit";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
    createCompleteCentralAnswers,
    createValidSurveySubmission,
} from "@/tests/fixtures/surveySubmission";

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
    default: (() => {
        const mockPrisma = {
            patient: {
                upsert: vi.fn(),
                create: vi.fn(),
            },
            surveySubmission: {
                create: vi.fn(),
                findUnique: vi.fn(),
            },
            $transaction: vi.fn(),
        };

        mockPrisma.$transaction.mockImplementation(
            async (callback: (tx: typeof mockPrisma) => Promise<unknown>) =>
                callback(mockPrisma),
        );

        return mockPrisma;
    })(),
}));

vi.mock("@clerk/nextjs/server", () => ({
    auth: vi.fn().mockResolvedValue({ userId: "mock-user-id" }),
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

function createUniqueConstraintError(): Error & { code: string } {
    return Object.assign(new Error("unique constraint violation"), {
        code: "P2002",
    });
}

describe("Server Action: submitSurvey", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(prisma.surveySubmission.findUnique).mockReset();
        vi.mocked(auth).mockResolvedValue({
            userId: "mock-user-id",
        } as unknown as Awaited<ReturnType<typeof auth>>);
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
        nationalId: " 1234567890123 ",
    };

    it("should reject unauthenticated submissions before opening a transaction", async () => {
        vi.mocked(auth).mockResolvedValue({
            userId: null,
        } as unknown as Awaited<ReturnType<typeof auth>>);

        const result = await submitSurvey(mockValidData);

        expect(result).toEqual({ success: false, error: "Unauthorized" });
        expect(prisma.$transaction).not.toHaveBeenCalled();
        expect(prisma.patient.upsert).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.create).not.toHaveBeenCalled();
    });

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

    it("should reject cross-field invalid input before opening a transaction", async () => {
        const consoleSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        const result = await submitSurvey({
            ...mockValidData,
            sectionTwo: {
                ...mockValidData.sectionTwo,
                age: "",
                birthDate: "",
            },
        });

        expect(result).toEqual({
            success: false,
            error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง",
        });
        expect(prisma.$transaction).not.toHaveBeenCalled();
        expect(prisma.patient.upsert).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.create).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("should successfully submit survey and call Prisma methods", async () => {
        // Mock Prisma responses
        vi.mocked(prisma.patient.upsert).mockResolvedValue({
            id: "patient-id",
        } as unknown as Awaited<ReturnType<typeof prisma.patient.upsert>>);

        vi.mocked(prisma.surveySubmission.create).mockResolvedValue({
            id: "submission-id",
        } as unknown as Awaited<
            ReturnType<typeof prisma.surveySubmission.create>
        >);

        const result = await submitSurvey(mockValidData);

        // If validation fails, result.success will be false. Check console error if so.
        if (!result.success) {
            console.error("Test failed validation:", result.error);
        }

        expect(result.success).toBe(true);
        expect(result.submissionId).toBe("submission-id");
        expect(result.totalScore).toBe(145);

        // Check if DB was called
        expect(prisma.$transaction).toHaveBeenCalledTimes(1);
        expect(prisma.patient.upsert).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { nationalId: "1234567890123" },
                create: expect.objectContaining({ firstName: "John" }),
            }),
        );

        expect(prisma.surveySubmission.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    submissionToken: mockValidData.submissionToken,
                    patientId: "patient-id",
                    respondentNameSnapshot: "John Doe",
                    genderSnapshot: "ชาย",
                    birthDateSnapshot: new Date("1990-01-01"),
                    submittedByUserId: "mock-user-id",
                    totalScorePart4: 145,
                }),
            }),
        );
    });

    it("should resolve the existing submission for a repeated token", async () => {
        vi.mocked(prisma.surveySubmission.findUnique).mockResolvedValue({
            id: "existing-submission-id",
            totalScorePart4: 145,
            submittedByUserId: "mock-user-id",
        } as unknown as Awaited<
            ReturnType<typeof prisma.surveySubmission.findUnique>
        >);

        const result = await submitSurvey(mockValidData);

        expect(result).toEqual({
            success: true,
            submissionId: "existing-submission-id",
            totalScore: 145,
        });
        expect(prisma.$transaction).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.create).not.toHaveBeenCalled();
        expect(prisma.patient.upsert).not.toHaveBeenCalled();
    });

    it("should resolve the existing submission after a submission token conflict", async () => {
        vi.mocked(prisma.surveySubmission.findUnique)
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({
                id: "existing-submission-id",
                totalScorePart4: 145,
                submittedByUserId: "mock-user-id",
            } as unknown as Awaited<
                ReturnType<typeof prisma.surveySubmission.findUnique>
            >);
        vi.mocked(prisma.surveySubmission.create).mockRejectedValueOnce(
            createUniqueConstraintError(),
        );

        const result = await submitSurvey(mockValidData);

        expect(result).toEqual({
            success: true,
            submissionId: "existing-submission-id",
            totalScore: 145,
        });
        expect(prisma.$transaction).toHaveBeenCalledTimes(1);
        expect(prisma.surveySubmission.create).toHaveBeenCalledTimes(1);
        expect(prisma.surveySubmission.findUnique).toHaveBeenCalledTimes(2);
    });

    it("should regenerate report data from answers instead of trusting the client", async () => {
        vi.mocked(prisma.surveySubmission.create).mockResolvedValue({
            id: "submission-id",
        } as unknown as Awaited<
            ReturnType<typeof prisma.surveySubmission.create>
        >);

        const forgedReportData: Record<
            string,
            {
                label: string;
                action: string;
                criteria: string;
                relatedUnit: string;
                averageScore: number;
            }
        > = {};
        for (let step = 1; step <= 10; step += 1) {
            forgedReportData[`step_${step}`] = {
                label: "Forged label",
                action: "Forged action",
                criteria: "1-2",
                relatedUnit: "Forged unit",
                averageScore: 1,
            };
        }

        const result = await submitSurvey({
            ...mockValidData,
            nationalId: undefined,
            sectionFour: {
                answers: createCompleteCentralAnswers(5),
                reportData: forgedReportData,
            },
        });

        expect(result.success).toBe(true);

        const createCall = vi.mocked(prisma.surveySubmission.create).mock
            .calls[0]?.[0];
        const rawAnswers = createCall?.data.rawAnswers as {
            reportData?: Record<
                string,
                { action?: string; averageScore?: number }
            >;
        };

        expect(Object.keys(rawAnswers.reportData ?? {})).toHaveLength(10);
        expect(rawAnswers.reportData?.step_1).toMatchObject({
            action: "ติดตามตามรอบ",
            averageScore: 5,
        });
        expect(rawAnswers.reportData?.step_3).toMatchObject({
            action: "ส่ง Manager",
            averageScore: 2,
        });
        expect(rawAnswers.reportData?.step_1.action).not.toBe("Forged action");
    });

    it("should create a submission without creating a patient when national ID is absent", async () => {
        vi.mocked(prisma.surveySubmission.create).mockResolvedValue({
            id: "submission-id",
        } as unknown as Awaited<
            ReturnType<typeof prisma.surveySubmission.create>
        >);

        const result = await submitSurvey({
            ...mockValidData,
            nationalId: undefined,
        });

        expect(result.success).toBe(true);
        expect(prisma.$transaction).toHaveBeenCalledTimes(1);
        expect(prisma.patient.create).not.toHaveBeenCalled();
        expect(prisma.patient.upsert).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    patientId: null,
                    respondentNameSnapshot: "John Doe",
                    genderSnapshot: "ชาย",
                    birthDateSnapshot: new Date("1990-01-01"),
                }),
            }),
        );
    });

    it("should store null for an invalid birth date snapshot", async () => {
        vi.mocked(prisma.patient.upsert).mockResolvedValue({
            id: "patient-id",
        } as unknown as Awaited<ReturnType<typeof prisma.patient.upsert>>);
        vi.mocked(prisma.surveySubmission.create).mockResolvedValue({
            id: "submission-id",
        } as unknown as Awaited<
            ReturnType<typeof prisma.surveySubmission.create>
        >);

        const result = await submitSurvey({
            ...mockValidData,
            sectionTwo: {
                ...mockValidData.sectionTwo,
                birthDate: "not-a-date",
            },
        });

        expect(result.success).toBe(true);
        expect(prisma.surveySubmission.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ birthDateSnapshot: null }),
            }),
        );
    });

    it("should return a sanitized error when the transaction fails", async () => {
        const consoleSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        vi.mocked(prisma.surveySubmission.create).mockRejectedValueOnce(
            new Error("database failure"),
        );

        const result = await submitSurvey({
            ...mockValidData,
            nationalId: undefined,
        });

        expect(result).toEqual({
            success: false,
            error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        });
        consoleSpy.mockRestore();
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
