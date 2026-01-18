import { useCallback } from "react";
import { centralNegativeQuestions } from "@/config/part4";

export function useScoring(answers: Record<number, number>) {
    const getGroupAverage = useCallback(
        (questionIds: number[]): number => {
            if (questionIds.length === 0) return 0;
            const sum = questionIds.reduce((acc, id) => {
                let score = answers[id] || 0;
                if (centralNegativeQuestions.includes(id) && score > 0) {
                    score = 7 - score;
                }
                return acc + score;
            }, 0);
            return Math.round(sum / questionIds.length);
        },
        [answers],
    );

    return { getGroupAverage };
}
