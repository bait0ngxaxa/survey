import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScoring } from "@/hooks/useSectionFourLogic/useScoring";
import { centralGroups, centralNegativeQuestions } from "@/config/part4";

describe("useScoring Integration Tests (Real Config)", () => {
    // Helper to calculate expected score manually
    const calculateExpected = (questionIds: number[], answerValue: number) => {
        let total = 0;
        questionIds.forEach((id) => {
            let score = answerValue;
            // Apply reverse scoring logic if question is negative
            if (centralNegativeQuestions.includes(id)) {
                score = 7 - answerValue;
            }
            total += score;
        });
        return Math.round(total / questionIds.length);
    };

    // Helper to run the hook
    const runScoring = (
        answers: Record<number, number>,
        groupIds: number[],
    ) => {
        const { result } = renderHook(() => useScoring(answers));
        return result.current.getGroupAverage(groupIds);
    };

    // Iterate over every real group defined in config
    centralGroups.forEach((group) => {
        describe(`Group ${group.id}: ${group.label.replace(/\n/g, " ")}`, () => {
            it(`should calculate correctly for Answer = 1 (Min)`, () => {
                const answerValue = 1;
                const answers: Record<number, number> = {};
                // Fill all questions in this group with 1
                group.questions.forEach((id) => (answers[id] = answerValue));

                const expected = calculateExpected(
                    group.questions,
                    answerValue,
                );
                const result = runScoring(answers, group.questions);

                expect(result).toBe(expected);
            });

            it(`should calculate correctly for Answer = 6 (Max)`, () => {
                const answerValue = 6;
                const answers: Record<number, number> = {};
                // Fill all questions in this group with 6
                group.questions.forEach((id) => (answers[id] = answerValue));

                const expected = calculateExpected(
                    group.questions,
                    answerValue,
                );
                const result = runScoring(answers, group.questions);

                expect(result).toBe(expected);
            });
        });
    });

    // Special Check for Known Negative Group (e.g. Group 3 which has Q4-7)
    // Q4, 5, 6, 7 are ALL negative in centralNegativeQuestions.
    describe("Specific Group Logic Verification", () => {
        it("Group 3 (Symptoms) should reverse all scores", () => {
            // Group 3 has questions [4, 5, 6, 7]
            // All of them are in centralNegativeQuestions
            // If answer is 6 (Max symptom), Score should be 7-6 = 1 (Poor health)
            const answers = { 4: 6, 5: 6, 6: 6, 7: 6 };
            const result = runScoring(answers, [4, 5, 6, 7]);
            expect(result).toBe(1);
        });

        it("Group 1 (Physical) should NOT reverse scores", () => {
            // Group 1 has questions [1]
            // Q1 is positive.
            // If answer is 6 (Can do every day), Score should be 6 (Good health)
            const answers = { 1: 6 };
            const result = runScoring(answers, [1]);
            expect(result).toBe(6);
        });
    });
});
