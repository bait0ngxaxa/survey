import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    getSurveySubmission,
    getSurveySubmissions,
    getUserSubmissions,
} from "@/lib/actions/survey/queries";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

vi.mock("@/lib/prisma", () => ({
    default: {
        surveySubmission: {
            findUnique: vi.fn(),
            findMany: vi.fn(),
            count: vi.fn(),
        },
    },
}));

vi.mock("@clerk/nextjs/server", () => ({
    auth: vi.fn(),
    currentUser: vi.fn(),
}));

describe("Survey query authorization", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(auth).mockResolvedValue({
            userId: "staff-user-id",
        } as unknown as Awaited<ReturnType<typeof auth>>);
        vi.mocked(currentUser).mockResolvedValue({
            id: "staff-user-id",
            publicMetadata: { role: "staff" },
        } as unknown as Awaited<ReturnType<typeof currentUser>>);
    });

    it("denies a non-admin from reading a single submission", async () => {
        const result = await getSurveySubmission("submission-id");

        expect(result).toEqual({ success: false, error: "Unauthorized" });
        expect(prisma.surveySubmission.findUnique).not.toHaveBeenCalled();
    });

    it("allows an admin to read a single submission", async () => {
        vi.mocked(currentUser).mockResolvedValue({
            id: "admin-user-id",
            publicMetadata: { role: "admin" },
        } as unknown as Awaited<ReturnType<typeof currentUser>>);
        vi.mocked(prisma.surveySubmission.findUnique).mockResolvedValue({
            id: "submission-id",
        } as unknown as Awaited<
            ReturnType<typeof prisma.surveySubmission.findUnique>
        >);

        const result = await getSurveySubmission("submission-id");

        expect(result).toMatchObject({
            success: true,
            data: { id: "submission-id" },
        });
    });

    it("denies a non-admin from reading all submissions", async () => {
        const result = await getSurveySubmissions();

        expect(result).toEqual({ success: false, error: "Unauthorized" });
        expect(prisma.surveySubmission.findMany).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.count).not.toHaveBeenCalled();
    });

    it("allows an admin to read all submissions", async () => {
        vi.mocked(currentUser).mockResolvedValue({
            id: "admin-user-id",
            publicMetadata: { role: "admin" },
        } as unknown as Awaited<ReturnType<typeof currentUser>>);
        vi.mocked(prisma.surveySubmission.findMany).mockResolvedValue([]);
        vi.mocked(prisma.surveySubmission.count).mockResolvedValue(0);

        const result = await getSurveySubmissions({ limit: 10 });

        expect(result).toMatchObject({
            success: true,
            data: [],
            total: 0,
            limit: 10,
            offset: 0,
        });
    });

    it("scopes the user query to the authenticated user id", async () => {
        vi.mocked(prisma.surveySubmission.findMany).mockResolvedValue([]);

        const result = await getUserSubmissions();

        expect(result.success).toBe(true);
        expect(prisma.surveySubmission.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { submittedByUserId: "staff-user-id" },
            }),
        );
    });

    it("denies unauthenticated users from reading their submissions", async () => {
        vi.mocked(auth).mockResolvedValue({
            userId: null,
        } as unknown as Awaited<ReturnType<typeof auth>>);

        const result = await getUserSubmissions();

        expect(result).toEqual({
            success: false,
            error: "Unauthorized",
            data: [],
        });
        expect(prisma.surveySubmission.findMany).not.toHaveBeenCalled();
    });
});
