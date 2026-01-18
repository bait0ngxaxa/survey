import {
    centralUISteps,
    type Part4Section,
    centralGroups,
} from "@/config/part4";

interface UseSectionFourViewHelpersProps {
    isCentral: boolean;
    currentStep: number;
    data: Part4Section[];
    getGroupAverage: (questionIds: number[]) => number;
}

export function useSectionFourViewHelpers({
    isCentral,
    currentStep,
    data,
    getGroupAverage,
}: UseSectionFourViewHelpersProps) {
    const getCurrentUIStep = () => {
        return isCentral ? centralUISteps[currentStep] : null;
    };

    const getDisplayQuestions = () => {
        const currentUIStep = getCurrentUIStep();
        if (!currentUIStep) return [];
        return data
            .flatMap((s) => s.questions)
            .filter((q) => currentUIStep.questions.includes(q.id));
    };

    const shouldShowGroup2Extra = (): boolean => {
        const currentUIStep = getCurrentUIStep();
        if (!currentUIStep) return false;

        if (currentUIStep.containedGroups.includes(2)) {
            const group2 = centralGroups.find((g) => g.id === 2);
            if (group2) {
                const avg = getGroupAverage(group2.questions);
                return avg > 0 && avg <= 2;
            }
        }
        return false;
    };

    const shouldShowGroup9Extra = (): boolean => {
        const currentUIStep = getCurrentUIStep();
        if (!currentUIStep) return false;

        if (currentUIStep.containedGroups.includes(9)) {
            const group9 = centralGroups.find((g) => g.id === 9);
            if (group9) {
                const avg = getGroupAverage(group9.questions);
                return avg > 0 && avg <= 2;
            }
        }
        return false;
    };

    return {
        getCurrentUIStep,
        getDisplayQuestions,
        shouldShowGroup2Extra,
        shouldShowGroup9Extra,
    };
}
