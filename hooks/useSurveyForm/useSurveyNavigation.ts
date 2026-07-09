import { useEffect } from "react";
import { useMultiStep } from "@/hooks/useMultiStep";
import { useExitConfirmation } from "@/hooks/useExitConfirmation";
import { validateSectionOne } from "@/lib/validation";
import { type Part1Data } from "@/lib/types";

interface UseSurveyNavigationProps {
    part1Data: Part1Data;
    respondentName: string;
    submitSuccess: boolean;
    showAlert: (message: string) => void;
}

export function useSurveyNavigation({
    part1Data,
    respondentName,
    submitSuccess,
    showAlert,
}: UseSurveyNavigationProps) {
    const { step, goTo } = useMultiStep({
        totalSteps: 5,
        onStepChange: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    });

    const {
        isModalOpen: isExitModalOpen,
        requestExit,
        closeModal: closeExitModal,
        confirmExit,
    } = useExitConfirmation({
        enabled: step > 0,
        skipConfirmation: submitSuccess,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleNext = (): void => {
        const validation = validateSectionOne({
            part1Data,
            respondentName,
        });
        if (!validation.isValid && validation.errorMessage) {
            showAlert(validation.errorMessage);
            return;
        }
        goTo(2);
    };

    return {
        step,
        goTo,
        handleNext,
        isExitModalOpen,
        requestExit,
        closeExitModal,
        confirmExit,
    };
}
