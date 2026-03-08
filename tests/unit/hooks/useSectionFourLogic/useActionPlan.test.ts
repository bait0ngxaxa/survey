import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useActionPlan } from "@/hooks/useSectionFourLogic/useActionPlan";
import { centralGroups } from "@/config/part4";
import { type RecommendationsData } from "@/lib/types";

// Mock onRecommendationsChange
const mockOnRecommendationsChange = vi.fn();

describe("useActionPlan Logic", () => {
    // Helper to run the hook
    const runActionPlan = (
        averageScore: number,
        groupIds: number[],
        additionalInfo: any = {},
    ) => {
        // Reset mock
        mockOnRecommendationsChange.mockReset();

        // Mock getGroupAverage to always return the desired score
        const mockGetGroupAverage = vi.fn().mockReturnValue(averageScore);

        const { result } = renderHook(() =>
            useActionPlan({
                recommendations: {},
                onRecommendationsChange: mockOnRecommendationsChange,
                additionalInfo,
                getGroupAverage: mockGetGroupAverage,
            }),
        );

        // Trigger processing
        result.current.processGroupRecommendations(groupIds);

        // Return the last call argument if called
        return mockOnRecommendationsChange.mock.calls.length > 0
            ? mockOnRecommendationsChange.mock.calls[0][0]
            : {};
    };

    it("should set action to 'ติดตามตามรอบ' for High Scores (4-6)", () => {
        // Score 5 -> Criteria 4-6 -> Action "ติดตามตามรอบ"
        const result = runActionPlan(5, [1]);
        const rec = result["step_1"];
        expect(rec.criteria).toBe("4-6");
        expect(rec.action).toBe("ติดตามตามรอบ");
    });

    it("should set action to 'เฝ้าระวัง' for Medium Scores (3)", () => {
        // Score 3 -> Criteria 3 -> Action "เฝ้าระวัง"
        const result = runActionPlan(3, [1]);
        const rec = result["step_1"];
        expect(rec.criteria).toBe("3");
        expect(rec.action).toBe("เฝ้าระวัง");
    });

    describe("Critical Actions (Score <= 2)", () => {
        it("should return specific critical action for Group 1", () => {
            const result = runActionPlan(1, [1]); // Group 1
            const rec = result["step_1"];
            expect(rec.criteria).toBe("1-2");
            expect(rec.action).toBe("ส่ง Manager เพื่อลงทะเบียน LTC");
        });

        it("should return specific critical action for Group 4 (Mental Health)", () => {
            const result = runActionPlan(1, [4]); // Group 4
            const rec = result["step_4"];
            expect(rec.action).toBe("Consult ทีม Mental Health");
        });

        describe("Group 2 Special Logic", () => {
            it("should suggest Physio if movementLimit is true", () => {
                const result = runActionPlan(1, [2], { movementLimit: true });
                const rec = result["step_2"];
                expect(rec.action).toContain("ส่งต่อนักกายภาพ");
            });

            it("should suggest Doctor if tired is true", () => {
                const result = runActionPlan(1, [2], { tired: true });
                const rec = result["step_2"];
                expect(rec.action).toContain("ส่งต่อ Manager หรือ แพทย์");
            });

            it("should combine suggestions if both are true", () => {
                const result = runActionPlan(1, [2], {
                    movementLimit: true,
                    tired: true,
                });
                const rec = result["step_2"];
                expect(rec.action).toContain("ส่งต่อนักกายภาพ");
                expect(rec.action).toContain("ส่งต่อ Manager หรือ แพทย์");
            });

            it("should default to 'ถามเพิ่ม' if no additional info", () => {
                const result = runActionPlan(1, [2], {});
                const rec = result["step_2"];
                expect(rec.action).toBe("ถามเพิ่ม");
            });
        });
    });
});
