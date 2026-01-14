import { useState } from "react";
import {
    useAlert,
    useRecommendations,
    useAsyncSubmit,
    useConfirmModal,
} from "@/hooks";
import { centralUISteps } from "@/config/part4";
import { RecommendationsData, AdditionalInfoData } from "@/lib/types";
import { Part4Section } from "@/config/part4";

interface UseSectionFourLogicProps {
    data: Part4Section[];
    answers: Record<number, number>;
    region?: string;
    recommendations?: RecommendationsData;
    onRecommendationsChange?: (recs: RecommendationsData) => void;
    additionalInfo?: AdditionalInfoData;
    onAdditionalInfoChange?: (info: AdditionalInfoData) => void;
    onBack: () => void;
    onSubmit: () => void | Promise<void>;
    isSubmittingProp?: boolean;
}

export function useSectionFourLogic({
    data,
    answers,
    region,
    recommendations = {},
    onRecommendationsChange,
    additionalInfo = {},
    onAdditionalInfoChange,
    onBack,
    onSubmit,
    isSubmittingProp = false,
}: UseSectionFourLogicProps) {
    const {
        isOpen: isAlertOpen,
        message: alertMessage,
        showAlert,
        closeAlert,
    } = useAlert();

    const {
        isOpen: showConfirmModal,
        open: openConfirmModal,
        close: closeConfirmModal,
    } = useConfirmModal();

    const [currentStep, setCurrentStep] = useState(0);

    const { isSubmitting: localIsSubmitting, execute: executeSubmit } =
        useAsyncSubmit({
            onError: (error) =>
                showAlert(
                    "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง (" +
                        error.message +
                        ")"
                ),
        });

    const isSubmitting = isSubmittingProp || localIsSubmitting;
    const isCentral = region === "central";

    const { getGroupAverage, processGroupRecommendations } = useRecommendations(
        {
            answers,
            additionalInfo,
            recommendations,
            onRecommendationsChange,
        }
    );

    // --- Handlers ---

    const handleAdditionalInfoChange = (
        key: string,
        value: boolean | string
    ): void => {
        if (onAdditionalInfoChange) {
            onAdditionalInfoChange({ ...additionalInfo, [key]: value });
        }
    };

    const validateCurrentStep = (): boolean => {
        if (!isCentral) return true;

        const currentUIStep = centralUISteps[currentStep];
        for (const qId of currentUIStep.questions) {
            if (!answers[qId]) return false;
        }

        // Group 2 validation
        if (currentUIStep.containedGroups.includes(2)) {
            const group2Avg = getGroupAverage([2, 3]);
            if (group2Avg > 0 && group2Avg <= 2) {
                if (!additionalInfo.movementLimit && !additionalInfo.tired)
                    return false;
            }
        }

        // Group 9 validation
        if (currentUIStep.containedGroups.includes(9)) {
            const group9Avg = getGroupAverage([24, 25, 26]);
            if (group9Avg > 0 && group9Avg <= 2) {
                const q9Topic = additionalInfo.q9Topic;
                if (
                    !q9Topic ||
                    (typeof q9Topic === "string" && q9Topic.trim() === "")
                )
                    return false;
            }
        }

        return true;
    };

    const validateNonCentral = (): boolean => {
        return data.every((section) =>
            section.questions.every((q) => answers[q.id])
        );
    };

    const handleNext = (): void => {
        if (isCentral) {
            const isLastQuestionStep =
                currentStep === centralUISteps.length - 1;

            if (!validateCurrentStep()) {
                showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }

            const currentUIStep = centralUISteps[currentStep];
            processGroupRecommendations(currentUIStep.containedGroups);

            if (isLastQuestionStep) {
                openConfirmModal();
                return;
            }

            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            if (!validateNonCentral()) {
                showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }
            onSubmit();
        }
    };

    const handleBack = (): void => {
        if (isCentral && currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onBack();
        }
    };

    const handleConfirmSubmit = async (): Promise<void> => {
        if (isSubmitting) return;
        await executeSubmit(() => onSubmit() as Promise<void>);
    };

    // --- Central View Helpers ---

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
        return (
            currentUIStep.containedGroups.includes(2) &&
            getGroupAverage([2, 3]) === 1
        );
    };

    const shouldShowGroup9Extra = (): boolean => {
        const currentUIStep = getCurrentUIStep();
        if (!currentUIStep) return false;
        return (
            currentUIStep.containedGroups.includes(9) &&
            getGroupAverage([24, 25, 26]) === 1
        );
    };

    return {
        // State
        currentStep,
        isSubmitting,
        isCentral,

        // Alert
        isAlertOpen,
        alertMessage,
        closeAlert,

        // Confirm Modal
        showConfirmModal,
        closeConfirmModal,

        // Handlers
        handleAdditionalInfoChange,
        handleNext,
        handleBack,
        handleConfirmSubmit,

        // Central View Helpers
        getCurrentUIStep,
        getDisplayQuestions,
        shouldShowGroup2Extra,
        shouldShowGroup9Extra,
        totalSteps: centralUISteps.length,
    };
}
