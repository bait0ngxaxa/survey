import {
    type Part1Data,
    type SectionTwoData,
    type MedicalRecordData,
    type RecommendationsData,
    type AdditionalInfoData,
} from "@/lib/types";

export interface UseSurveyFormProps {
    region: string;
}

export interface UseSurveyFormReturn {
    // Step navigation
    step: number;
    goTo: (step: number) => void;
    // Form data
    part1Data: Part1Data;
    sectionTwoData: SectionTwoData;
    medicalRecordData: MedicalRecordData;
    sectionFourAnswers: Record<number, number>;
    recommendations: RecommendationsData;
    additionalInfo: AdditionalInfoData;
    // Setters
    setSectionTwoData: React.Dispatch<React.SetStateAction<SectionTwoData>>;
    setMedicalRecordData: React.Dispatch<
        React.SetStateAction<MedicalRecordData>
    >;
    setRecommendations: React.Dispatch<
        React.SetStateAction<RecommendationsData>
    >;
    setAdditionalInfo: React.Dispatch<React.SetStateAction<AdditionalInfoData>>;
    // Handlers
    handlePart1Change: (field: keyof Part1Data, value: string) => void;
    handleNext: () => void;
    handleSubmitSurvey: () => Promise<void>;
    handleSectionFourAnswer: (id: number, score: number) => void;
    // Modal states
    isAlertOpen: boolean;
    alertMessage: string;
    closeAlert: () => void;
    isExitModalOpen: boolean;
    closeExitModal: () => void;
    confirmExit: (targetUrl: string) => void;
    // Submit state
    isSubmitting: boolean;
    submitSuccess: boolean;
}
