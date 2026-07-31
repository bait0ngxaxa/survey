import { useCallback } from "react";
import { calculateGroupAverage } from "@/lib/utils/reportGenerator";

interface UseScoringReturn {
    getGroupAverage: (questionIds: number[]) => number;
}

export function useScoring(
    answers: Record<number, number>,
): UseScoringReturn {
    const getGroupAverage = useCallback(
        (questionIds: number[]): number => {
            return calculateGroupAverage(answers, questionIds);
        },
        [answers],
    );

    return { getGroupAverage };
}
