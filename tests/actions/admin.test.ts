import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAdminStats, getSubmissions } from "@/lib/actions/admin";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
    default: {
        surveySubmission: {
            count: vi.fn(),
            groupBy: vi.fn(),
            findMany: vi.fn(),
        },
    },
}));

vi.mock("@clerk/nextjs/server", () => ({
    currentUser: vi.fn(),
}));

vi.mock("next/cache", () => ({
    unstable_cache: (cb: any) => cb,
}));

describe("Admin Actions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Helper to mock admin user
    const mockAdminUser = () => {
        vi.mocked(currentUser).mockResolvedValue({
            publicMetadata: { role: "admin" },
        } as any);
    };

    // Helper to mock normal user
    const mockNormalUser = () => {
        vi.mocked(currentUser).mockResolvedValue({
            publicMetadata: { role: "user" },
        } as any);
    };

    describe("getAdminStats", () => {
        it("should throw error if user is not admin", async () => {
            mockNormalUser();
            await expect(getAdminStats()).rejects.toThrow("Unauthorized");
        });

        it("should return correct stats", async () => {
            mockAdminUser();
            // Mock Prisma responses
            vi.mocked(prisma.surveySubmission.count).mockResolvedValue(100);

            // Mock groupBy for Regions
            vi.mocked(prisma.surveySubmission.groupBy)
                .mockResolvedValueOnce([
                    { region: "Central", _count: { _all: 50 } },
                    { region: "North", _count: { _all: 50 } },
                ] as any)
                // Mock groupBy for Hospitals
                .mockResolvedValueOnce([
                    { hospital: "H1", _count: { _all: 30 } },
                    { hospital: "H2", _count: { _all: 70 } },
                ] as any);

            const result = await getAdminStats();

            expect(result.totalSubmissions).toBe(100);
            expect(result.byRegion).toHaveLength(2);
            expect(result.byRegion[0]).toEqual({
                region: "Central",
                count: 50,
            });
            expect(result.byHospital).toHaveLength(2);
            expect(result.byHospital[1]).toEqual({ hospital: "H2", count: 70 });
        });
    });

    describe("getSubmissions", () => {
        it("should throw error if user is not admin", async () => {
            mockNormalUser();
            await expect(getSubmissions()).rejects.toThrow("Unauthorized");
        });

        it("should return paginated submissions with default params", async () => {
            mockAdminUser();
            const mockSubmissions = [{ id: "1" }, { id: "2" }];
            const expectedSubmissions = [
                { id: "1", interviewer: null, respondent: null },
                { id: "2", interviewer: null, respondent: null },
            ];

            // Mock findMany and count
            vi.mocked(prisma.surveySubmission.findMany).mockResolvedValue(
                mockSubmissions as any,
            );
            vi.mocked(prisma.surveySubmission.count).mockResolvedValue(55);

            const result = await getSubmissions();

            expect(result.submissions).toEqual(expectedSubmissions);
            expect(result.total).toBe(55);
            expect(result.currentPage).toBe(1);
            expect(result.totalPages).toBe(6); // Math.ceil(55/10)

            // Verify default pagination arguments
            expect(prisma.surveySubmission.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 0,
                    take: 10,
                }),
            );
        });

        it("should filter by region", async () => {
            mockAdminUser();
            vi.mocked(prisma.surveySubmission.findMany).mockResolvedValue([]);
            vi.mocked(prisma.surveySubmission.count).mockResolvedValue(0);

            await getSubmissions({ regionFilter: "Central" });

            expect(prisma.surveySubmission.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({ region: "Central" }),
                }),
            );
        });

        it("should search by interviewer or respondent name", async () => {
            mockAdminUser();
            vi.mocked(prisma.surveySubmission.findMany).mockResolvedValue([]);
            vi.mocked(prisma.surveySubmission.count).mockResolvedValue(0);

            const searchQuery = "John";
            await getSubmissions({ searchQuery });

            expect(prisma.surveySubmission.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        OR: expect.arrayContaining([
                            expect.objectContaining({
                                rawAnswers: {
                                    path: ["part1", "interviewerName"],
                                    string_contains: searchQuery,
                                },
                            }),
                            expect.objectContaining({
                                rawAnswers: {
                                    path: ["sectionTwo", "respondentName"],
                                    string_contains: searchQuery,
                                },
                            }),
                        ]),
                    }),
                }),
            );
        });
    });
});
