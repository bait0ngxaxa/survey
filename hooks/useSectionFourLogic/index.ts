import { useAlert } from "@/hooks/useAlert";
import { useAsyncSubmit } from "@/hooks/useAsyncSubmit";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { centralUISteps } from "@/config/part4";
import { type UseSectionFourLogicProps } from "./types";
import { useSectionFourState } from "./useSectionFourState";
import { useSectionFourValidation } from "./useSectionFourValidation";
import { useSectionFourViewHelpers } from "./useSectionFourViewHelpers";
import { useSectionFourHandlers } from "./useSectionFourHandlers";
import { REGION_ID } from "@/lib/constants/submissionsConstants";
import { useScoring } from "./useScoring";
import { useActionPlan } from "./useActionPlan";

export * from "./types";

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
    // --- 1. Global/Util Hooks ---
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

    const { isSubmitting: localIsSubmitting, execute: executeSubmit } =
        useAsyncSubmit<void>({
            onError: (error) =>
                showAlert(
                    "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง (" +
                        error.message +
                        ")",
                ),
        });

    const isSubmitting = isSubmittingProp || localIsSubmitting;
    const isCentral = region === REGION_ID.CENTRAL;

    // --- 2. Logic Sub-Hooks ---
    const { currentStep, setCurrentStep } = useSectionFourState();

    const { getGroupAverage } = useScoring(answers);

    const { processGroupRecommendations } = useActionPlan({
        answers,
        recommendations,
        onRecommendationsChange,
        additionalInfo,
    });

    const { validateCurrentStep, validateNonCentral } =
        useSectionFourValidation({
            isCentral,
            currentStep,
            answers,
            additionalInfo,
            data,
            getGroupAverage,
        });

    const {
        getCurrentUIStep,
        getDisplayQuestions,
        shouldShowGroup2Extra,
        shouldShowGroup9Extra,
    } = useSectionFourViewHelpers({
        isCentral,
        currentStep,
        data,
        getGroupAverage,
    });

    // --- 3. Handlers ---
    const {
        handleAdditionalInfoChange,
        handleNext,
        handleBack,
        handleConfirmSubmit,
    } = useSectionFourHandlers({
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
    });

    // --- 4. Return Interface ---
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
