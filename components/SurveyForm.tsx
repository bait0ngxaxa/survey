"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import SubmitSuccessModal from "@/components/SubmitSuccessModal";
import AlertModal from "@/components/AlertModal";
import ConfirmExitModal from "@/components/ConfirmExitModal";
import SectionTwoForm from "./SectionTwoForm";
import MedicalRecordForm from "./MedicalRecordForm";
import SectionFourForm from "./SectionFourForm";
import Introduction from "./Introduction";
import {
    FormSection,
    TextInput,
    RadioGroup,
    FormNavigation,
} from "@/components/ui/form";
import { SurveyConfig } from "@/config/surveyData";
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
import {
    BloodSugarQuestion,
    DoctorVisitQuestion,
    LoadingOverlay,
} from "@/components/survey-form";

interface SurveyFormProps {
    config: SurveyConfig;
    region: string;
}

export default function SurveyForm({ config, region }: SurveyFormProps) {
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

    if (submitSuccess) {
        return <SubmitSuccessModal isOpen={true} redirectTo="/dashboard" />;
    }

    return (
        <>
            <Suspense fallback={null}>
                {/* SuccessModal is shown by condition above */}
            </Suspense>
            <AlertModal
                isOpen={isAlertOpen}
                onClose={closeAlert}
                message={alertMessage}
            />
            <ConfirmExitModal
                isOpen={isExitModalOpen}
                onClose={closeExitModal}
                onConfirm={() => confirmExit("/dashboard")}
            />
            {isSubmitting && <LoadingOverlay />}

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                {step === 0 && <Introduction onStart={() => goTo(1)} />}

                {step === 1 && (
                    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                        <FormSection
                            title={config.title}
                            description="ส่วนที่ 1: ข้อมูลทั่วไป"
                        >
                            <div className="space-y-10">
                                <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100 flex items-start gap-4">
                                    <div className="p-2 bg-sky-100 rounded-full text-sky-600 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sky-900 font-semibold text-lg mb-1">
                                            คำชี้แจง
                                        </h3>
                                        <p className="text-sky-700 leading-relaxed">
                                            ก่อนที่ท่านจะตอบแบบสอบถามชุดนี้
                                            ผู้วิจัยอยากทราบข้อมูลเบื้องต้นเกี่ยวกับวิธีการเก็บข้อมูล
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-8 pb-8 border-b border-slate-100">
                                    <RadioGroup
                                        name="surveyMethod"
                                        label="วิธีการเก็บข้อมูล"
                                        value={part1Data.surveyMethod || ""}
                                        options={["ตอบด้วยตนเอง", "สัมภาษณ์"]}
                                        onChange={(v) =>
                                            handlePart1Change("surveyMethod", v)
                                        }
                                        layout="horizontal"
                                    />
                                    <TextInput
                                        label="ชื่อผู้ให้ข้อมูล"
                                        placeholder="ระบุชื่อ-นามสกุล"
                                        value={sectionTwoData.respondentName}
                                        onChange={(v) =>
                                            setSectionTwoData((prev) => ({
                                                ...prev,
                                                respondentName: v,
                                            }))
                                        }
                                    />
                                    {part1Data.surveyMethod === "สัมภาษณ์" && (
                                        <div className="animate-in fade-in slide-in-from-top-2">
                                            <TextInput
                                                label="ชื่อผู้สัมภาษณ์"
                                                placeholder="ระบุชื่อ-นามสกุลผู้สัมภาษณ์"
                                                value={
                                                    part1Data.interviewerName ||
                                                    ""
                                                }
                                                onChange={(v) =>
                                                    handlePart1Change(
                                                        "interviewerName",
                                                        v
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </div>

                                <BloodSugarQuestion
                                    part1Data={part1Data}
                                    onPart1Change={handlePart1Change}
                                />
                                <div className="border-t border-slate-100" />
                                <DoctorVisitQuestion
                                    part1Data={part1Data}
                                    onPart1Change={handlePart1Change}
                                />
                            </div>

                            <FormNavigation
                                onBack={() =>
                                    (window.location.href = "/dashboard")
                                }
                                onNext={handleNext}
                                showBack={true}
                                backLabel="ยกเลิก"
                                nextLabel="ถัดไป"
                            />
                        </FormSection>
                    </div>
                )}

                {step === 2 && (
                    <SectionTwoForm
                        formData={sectionTwoData}
                        onChange={setSectionTwoData}
                        onNext={() => goTo(4)}
                        onBack={() => goTo(1)}
                    />
                )}

                {step === 3 && (
                    <MedicalRecordForm
                        formData={medicalRecordData}
                        onChange={setMedicalRecordData}
                        onNext={() => goTo(4)}
                        onBack={() => goTo(2)}
                    />
                )}

                {step === 4 && (
                    <SectionFourForm
                        data={config.part4Questions}
                        answers={sectionFourAnswers}
                        onAnswer={handleSectionFourAnswer}
                        onBack={() => goTo(region === "central" ? 2 : 3)}
                        onSubmit={handleSubmitSurvey}
                        region={region}
                        recommendations={recommendations}
                        onRecommendationsChange={setRecommendations}
                        additionalInfo={additionalInfo}
                        onAdditionalInfoChange={setAdditionalInfo}
                        isSubmitting={isSubmitting}
                    />
                )}
            </div>
        </>
    );
}
