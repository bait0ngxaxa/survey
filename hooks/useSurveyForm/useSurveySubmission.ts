import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { useAsyncSubmit } from "@/hooks/useAsyncSubmit";
import { submitSurvey } from "@/lib/actions/survey/submit";
import { SurveySubmissionInputSchema } from "@/lib/schemas";
import {
    type Part1Data,
    type SectionTwoData,
    type MedicalRecordData,
    type AdditionalInfoData,
} from "@/lib/types";

interface UseSurveySubmissionProps {
    region: string;
    part1Data: Part1Data;
    sectionTwoData: SectionTwoData;
    medicalRecordData: MedicalRecordData;
    sectionFourAnswers: Record<number, number>;
    additionalInfo: AdditionalInfoData;
}

export function useSurveySubmission({
    region,
    part1Data,
    sectionTwoData,
    medicalRecordData,
    sectionFourAnswers,
    additionalInfo,
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
        const input = {
            region,
            hospital: "",
            part1: part1Data,
            sectionTwo: sectionTwoData,
            medicalRecord: medicalRecordData,
            sectionFour: {
                answers: sectionFourAnswers,
                additionalInfo,
            },
        };
        const parsed = SurveySubmissionInputSchema.safeParse(input);

        if (!parsed.success) {
            showAlert("ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบคำตอบทุกข้อ");
            return;
        }

        const result = await executeSubmit(() =>
            submitSurvey(parsed.data),
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
