import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { useAsyncSubmit } from "@/hooks/useAsyncSubmit";
import { submitSurvey } from "@/lib/actions/survey/submit";
import {
    type Part1Data,
    type SectionTwoData,
    type MedicalRecordData,
    type RecommendationsData,
} from "@/lib/types";

interface UseSurveySubmissionProps {
    region: string;
    part1Data: Part1Data;
    sectionTwoData: SectionTwoData;
    medicalRecordData: MedicalRecordData;
    sectionFourAnswers: Record<number, number>;
    recommendations: RecommendationsData;
}

export function useSurveySubmission({
    region,
    part1Data,
    sectionTwoData,
    medicalRecordData,
    sectionFourAnswers,
    recommendations,
}: UseSurveySubmissionProps) {
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
            }),
        );

        if (result?.success) {
            setSubmitSuccess(true);
        } else if (result && !result.success) {
            showAlert(result.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    return {
        isSubmitting,
        submitSuccess,
        handleSubmitSurvey,
        isAlertOpen,
        alertMessage,
        showAlert,
        closeAlert,
    };
}
