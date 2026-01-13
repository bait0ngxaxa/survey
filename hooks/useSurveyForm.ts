"use client";

import { useState, useEffect } from "react";
import { submitSurvey } from "@/lib/actions/survey";
import {
    Part1Data,
    SectionTwoData,
    MedicalRecordData,
    RecommendationsData,
    AdditionalInfoData,
} from "@/lib/types";
import {
    initialPart1Data,
    initialSectionTwoData,
    initialMedicalRecordData,
} from "@/lib/initialData";
import {
    useMultiStep,
    useExitConfirmation,
    useAlert,
    useAsyncSubmit,
} from "@/hooks";
import { validateSectionOne } from "@/lib/validation";

interface UseSurveyFormProps {
    region: string;
}

interface UseSurveyFormReturn {
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

export function useSurveyForm({
    region,
}: UseSurveyFormProps): UseSurveyFormReturn {
    const { step, goTo } = useMultiStep({
        totalSteps: 5,
        onStepChange: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    });

    // Form State
    const [part1Data, setPart1Data] = useState<Part1Data>(initialPart1Data);
    const [sectionTwoData, setSectionTwoData] = useState<SectionTwoData>(
        initialSectionTwoData
    );
    const [medicalRecordData, setMedicalRecordData] =
        useState<MedicalRecordData>(initialMedicalRecordData);
    const [sectionFourAnswers, setSectionFourAnswers] = useState<
        Record<number, number>
    >({});
    const [recommendations, setRecommendations] = useState<RecommendationsData>(
        {}
    );
    const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoData>(
        {}
    );
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        isOpen: isAlertOpen,
        message: alertMessage,
        showAlert,
        closeAlert,
    } = useAlert();

    const { isSubmitting, execute: executeSubmit } = useAsyncSubmit<{
        success: boolean;
        error?: string;
    }>({
        onError: (error) => showAlert("เกิดข้อผิดพลาด: " + error.message),
    });

    const {
        isModalOpen: isExitModalOpen,
        closeModal: closeExitModal,
        confirmExit,
    } = useExitConfirmation({
        enabled: step > 0,
        skipConfirmation: submitSuccess,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handlePart1Change = (field: keyof Part1Data, value: string): void => {
        setPart1Data((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = (): void => {
        const validation = validateSectionOne({
            part1Data,
            respondentName: sectionTwoData.respondentName,
        });
        if (!validation.isValid && validation.errorMessage) {
            showAlert(validation.errorMessage);
            return;
        }
        goTo(2);
    };

    const handleSubmitSurvey = async (): Promise<void> => {
        const result = await executeSubmit(() =>
            submitSurvey({
                region: region,
                hospital: "",
                part1: part1Data,
                sectionTwo: sectionTwoData,
                medicalRecord: medicalRecordData,
                sectionFour: {
                    answers: sectionFourAnswers,
                    reportData: recommendations,
                },
            })
        );

        if (result?.success) {
            setSubmitSuccess(true);
        } else if (result && !result.success) {
            showAlert(result.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    const handleSectionFourAnswer = (id: number, score: number): void => {
        setSectionFourAnswers((prev) => ({ ...prev, [id]: score }));
    };

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
