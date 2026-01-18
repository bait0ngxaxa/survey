import { type UseSurveyFormProps, type UseSurveyFormReturn } from "./types";
import { useSurveyState } from "./useSurveyState";
import { useSurveyNavigation } from "./useSurveyNavigation";
import { useSurveySubmission } from "./useSurveySubmission";

export * from "./types";

export function useSurveyForm({
    region,
}: UseSurveyFormProps): UseSurveyFormReturn {
    // 1. Form Data State
    const {
        part1Data,
        handlePart1Change,
        sectionTwoData,
        setSectionTwoData,
        medicalRecordData,
        setMedicalRecordData,
        sectionFourAnswers,
        handleSectionFourAnswer,
        recommendations,
        setRecommendations,
        additionalInfo,
        setAdditionalInfo,
    } = useSurveyState();

    // 2. Submission Logic
    const {
        isSubmitting,
        submitSuccess,
        handleSubmitSurvey,
        isAlertOpen,
        alertMessage,
        showAlert,
        closeAlert,
    } = useSurveySubmission({
        region,
        part1Data,
        sectionTwoData,
        medicalRecordData,
        sectionFourAnswers,
        recommendations,
    });

    // 3. Navigation Logic
    const {
        step,
        goTo,
        handleNext,
        isExitModalOpen,
        closeExitModal,
        confirmExit,
    } = useSurveyNavigation({
        part1Data,
        respondentName: sectionTwoData.respondentName,
        submitSuccess,
        showAlert,
    });

    // 4. Return Combined Interface
    return {
        step,
        goTo,
        part1Data,
        sectionTwoData,
        medicalRecordData,
        sectionFourAnswers,
        recommendations,
        additionalInfo,
        setSectionTwoData,
        setMedicalRecordData,
        setRecommendations,
        setAdditionalInfo,
        handlePart1Change,
        handleNext,
        handleSubmitSurvey,
        handleSectionFourAnswer,
        isAlertOpen,
        alertMessage,
        closeAlert,
        isExitModalOpen,
        closeExitModal,
        confirmExit,
        isSubmitting,
        submitSuccess,
    };
}
