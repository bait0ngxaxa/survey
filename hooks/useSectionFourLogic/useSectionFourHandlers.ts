import { centralUISteps } from "@/config/part4";
import { type AdditionalInfoData } from "@/lib/types";

interface UseSectionFourHandlersProps {
    isCentral: boolean;
    currentStep: number;
    setCurrentStep: (step: number | ((prev: number) => number)) => void;
    validateCurrentStep: () => boolean;
    validateNonCentral: () => boolean;
    processGroupRecommendations: (groupIds: number[]) => void;
    onBack: () => void;
    onSubmit: () => void;
    openConfirmModal: () => void;
    showAlert: (message: string) => void;
    additionalInfo: AdditionalInfoData;
    onAdditionalInfoChange?: (info: AdditionalInfoData) => void;
    executeSubmit: (fn: () => Promise<void>) => Promise<void | undefined>;
    isSubmitting: boolean;
}

export function useSectionFourHandlers({
    isCentral,
    currentStep,
    setCurrentStep,
    validateCurrentStep,
    validateNonCentral,
    processGroupRecommendations,
    onBack,
    onSubmit,
    openConfirmModal,
    showAlert,
    additionalInfo,
    onAdditionalInfoChange,
    executeSubmit,
    isSubmitting,
}: UseSectionFourHandlersProps) {
    const handleAdditionalInfoChange = (
        key: string,
        value: boolean | string,
    ): void => {
        if (onAdditionalInfoChange) {
            onAdditionalInfoChange({ ...additionalInfo, [key]: value });
        }
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
        await executeSubmit(() => onSubmit() as unknown as Promise<void>);
    };

    return {
        handleAdditionalInfoChange,
        handleNext,
        handleBack,
        handleConfirmSubmit,
    };
}
