import {
    centralUISteps,
    type Part4Section,
    centralGroups,
} from "@/config/part4";
import { type AdditionalInfoData } from "@/lib/types";

interface UseSectionFourValidationProps {
    isCentral: boolean;
    currentStep: number;
    answers: Record<number, number>;
    additionalInfo: AdditionalInfoData;
    data: Part4Section[];
    getGroupAverage: (questionIds: number[]) => number;
}

export function useSectionFourValidation({
    isCentral,
    currentStep,
    answers,
    additionalInfo,
    data,
    getGroupAverage,
}: UseSectionFourValidationProps) {
    const validateCurrentStep = (): boolean => {
        if (!isCentral) return true;

        const currentUIStep = centralUISteps[currentStep];
        for (const qId of currentUIStep.questions) {
            if (!answers[qId]) return false;
        }

        // Group 2 validation
        if (currentUIStep.containedGroups.includes(2)) {
            const group2 = centralGroups.find((g) => g.id === 2);
            if (group2) {
                const group2Avg = getGroupAverage(group2.questions);
                if (group2Avg > 0 && group2Avg <= 2) {
                    if (!additionalInfo.movementLimit && !additionalInfo.tired)
                        return false;
                }
            }
        }

        // Group 9 validation
        if (currentUIStep.containedGroups.includes(9)) {
            const group9 = centralGroups.find((g) => g.id === 9);
            if (group9) {
                const group9Avg = getGroupAverage(group9.questions);
                if (group9Avg > 0 && group9Avg <= 2) {
                    const q9Topic = additionalInfo.q9Topic;
                    if (
                        !q9Topic ||
                        (typeof q9Topic === "string" && q9Topic.trim() === "")
                    )
                        return false;
                }
            }
        }

        return true;
    };

    const validateNonCentral = (): boolean => {
        return data.every((section) =>
            section.questions.every((q) => answers[q.id]),
        );
    };

    return {
        validateCurrentStep,
        validateNonCentral,
    };
}
