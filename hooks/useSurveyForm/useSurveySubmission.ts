import { useCallback, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { useAsyncSubmit } from "@/hooks/useAsyncSubmit";
import { submitSurvey } from "@/lib/actions/survey/submit";
import {
    SubmissionTokenSchema,
    SurveySubmissionInputSchema,
} from "@/lib/schemas";
import {
    type Part1Data,
    type SectionTwoData,
    type MedicalRecordData,
    type AdditionalInfoData,
} from "@/lib/types";

const submissionTokenStoragePrefix = "survey-submission-token";

function getSubmissionTokenStorageKey(region: string): string {
    return `${submissionTokenStoragePrefix}:${encodeURIComponent(region)}`;
}

function getOrCreateSubmissionToken(region: string): string {
    const generatedToken = globalThis.crypto.randomUUID();

    if (typeof window === "undefined") {
        return generatedToken;
    }

    try {
        const storageKey = getSubmissionTokenStorageKey(region);
        const storedToken = window.sessionStorage.getItem(storageKey);

        if (storedToken && SubmissionTokenSchema.safeParse(storedToken).success) {
            return storedToken;
        }

        window.sessionStorage.setItem(storageKey, generatedToken);
    } catch {
        // Continue with the in-memory token when browser storage is unavailable.
    }

    return generatedToken;
}

function removeSubmissionToken(region: string): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.sessionStorage.removeItem(getSubmissionTokenStorageKey(region));
    } catch {
        // Ignore storage errors; the server-side idempotency key remains valid.
    }
}

interface UseSurveySubmissionProps {
    region: string;
    part1Data: Part1Data;
    sectionTwoData: SectionTwoData;
    medicalRecordData: MedicalRecordData;
    sectionFourAnswers: Record<number, number>;
    additionalInfo: AdditionalInfoData;
}

interface UseSurveySubmissionReturn {
    isSubmitting: boolean;
    submitSuccess: boolean;
    handleSubmitSurvey: () => Promise<void>;
    clearSubmissionToken: () => void;
    isAlertOpen: boolean;
    alertMessage: string;
    showAlert: (message: string) => void;
    closeAlert: () => void;
}

export function useSurveySubmission({
    region,
    part1Data,
    sectionTwoData,
    medicalRecordData,
    sectionFourAnswers,
    additionalInfo,
}: UseSurveySubmissionProps): UseSurveySubmissionReturn {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submissionToken] = useState(() =>
        getOrCreateSubmissionToken(region),
    );
    const clearSubmissionToken = useCallback(
        () => removeSubmissionToken(region),
        [region],
    );

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
            submissionToken,
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
            clearSubmissionToken();
            setSubmitSuccess(true);
        } else if (result && !result.success) {
            showAlert(result.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    return {
        isSubmitting,
        submitSuccess,
        handleSubmitSurvey,
        clearSubmissionToken,
        isAlertOpen,
        alertMessage,
        showAlert,
        closeAlert,
    };
}
