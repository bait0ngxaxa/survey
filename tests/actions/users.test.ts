import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    getStaffUsers,
    getUserSubmissionsList,
} from "@/lib/actions/users";
import prisma from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

vi.mock("@/lib/prisma", () => ({
    default: {
        surveySubmission: {
            findMany: vi.fn(),
            groupBy: vi.fn(),
        },
    },
}));

vi.mock("@clerk/nextjs/server", () => ({
    clerkClient: vi.fn(),
    currentUser: vi.fn(),
}));

describe("User action authorization", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(currentUser).mockResolvedValue({
            id: "staff-user-id",
            publicMetadata: { role: "staff" },
        } as unknown as Awaited<ReturnType<typeof currentUser>>);
    });

    it("does not allow an authenticated non-admin to request another staff user's submissions", async () => {
        const result = await getUserSubmissionsList("other-staff-user-id");

        expect(result).toEqual({ success: false, error: "Unauthorized", data: [] });
        expect(prisma.surveySubmission.findMany).not.toHaveBeenCalled();
    });

    it("allows an admin to request submissions for the selected staff user", async () => {
        vi.mocked(currentUser).mockResolvedValue({
            id: "admin-user-id",
            publicMetadata: { role: "admin" },
        } as unknown as Awaited<ReturnType<typeof currentUser>>);
        vi.mocked(prisma.surveySubmission.findMany).mockResolvedValue([
            {
                id: "submission-id",
                rawAnswers: {},
                region: "central",
                createdAt: new Date("2026-01-01"),
                totalScorePart4: 12,
            },
        ] as unknown as Awaited<
            ReturnType<typeof prisma.surveySubmission.findMany>
        >);

        const result = await getUserSubmissionsList("selected-staff-user-id");

        expect(result.success).toBe(true);
        expect(prisma.surveySubmission.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { submittedByUserId: "selected-staff-user-id" },
            }),
        );
    });

    it("does not expose the staff directory to a non-admin", async () => {
        const result = await getStaffUsers();

        expect(result.success).toBe(false);
        expect(result.error).toBe("Unauthorized");
        expect(clerkClient).not.toHaveBeenCalled();
        expect(prisma.surveySubmission.groupBy).not.toHaveBeenCalled();
    });
});
