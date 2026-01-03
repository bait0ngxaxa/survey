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

interface SurveyFormProps {
    config: SurveyConfig;
    region: string;
}

export default function SurveyForm({ config, region }: SurveyFormProps) {
    const { step, goTo } = useMultiStep({
        totalSteps: 5,
        onStepChange: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    });

    // Part 1 State
    const [part1Data, setPart1Data] = useState<Part1Data>(initialPart1Data);

    // Section 2 State
    const [sectionTwoData, setSectionTwoData] = useState<SectionTwoData>(
        initialSectionTwoData
    );

    // Medical Record State
    const [medicalRecordData, setMedicalRecordData] =
        useState<MedicalRecordData>(initialMedicalRecordData);

    // Section 4 State
    const [sectionFourAnswers, setSectionFourAnswers] = useState<
        Record<number, number>
    >({});
    const [recommendations, setRecommendations] = useState<RecommendationsData>(
        {}
    );
    const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoData>(
        {}
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
    const [submitSuccess, setSubmitSuccess] = useState(false);

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

    const handlePart1Change = (field: keyof Part1Data, value: string) => {
        setPart1Data((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
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

    const handleSubmitSurvey = async () => {
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
            {isSubmitting && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-lg font-medium text-gray-700">
                            กำลังบันทึกข้อมูล...
                        </span>
                    </div>
                </div>
            )}
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                {step === 0 ? (
                    <Introduction onStart={() => goTo(1)} />
                ) : step === 1 ? (
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

                                {/* Pre-Survey Questions */}
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

                                {/* 1. Blood Sugar Knowledge */}
                                <div className="space-y-4">
                                    <label className="text-xl font-bold text-slate-800 block">
                                        1.
                                        ท่านทราบผลการตรวจระดับน้ำตาลในเลือดและค่าน้ำตาลสะสมของท่านในครั้งนี้หรือไม่
                                        อย่างไร
                                    </label>
                                    <div className="space-y-4 pt-2">
                                        {/* Option 1: Known */}
                                        <div
                                            className={`transition-all duration-300 rounded-xl border p-4 ${
                                                part1Data.bloodSugarKnown ===
                                                "ทราบ"
                                                    ? "bg-sky-50 border-sky-200 shadow-sm"
                                                    : "bg-white border-slate-200 hover:border-sky-200"
                                            }`}
                                        >
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="bloodSugarKnown"
                                                        value="ทราบ"
                                                        checked={
                                                            part1Data.bloodSugarKnown ===
                                                            "ทราบ"
                                                        }
                                                        onChange={(e) =>
                                                            handlePart1Change(
                                                                "bloodSugarKnown",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                                                    />
                                                    <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                                </div>
                                                <span className="text-slate-800 font-medium text-lg">
                                                    1. ทราบ
                                                </span>
                                            </label>

                                            {part1Data.bloodSugarKnown ===
                                                "ทราบ" && (
                                                <div className="mt-4 ml-8 space-y-4 animate-in fade-in slide-in-from-top-2">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                        <span className="text-slate-600 min-w-[220px]">
                                                            1.1
                                                            ระดับน้ำตาลในเลือด
                                                            (Fasting) =
                                                        </span>
                                                        <TextInput
                                                            value={
                                                                part1Data.fastingLevel
                                                            }
                                                            onChange={(v) =>
                                                                handlePart1Change(
                                                                    "fastingLevel",
                                                                    v
                                                                )
                                                            }
                                                            inline
                                                            placeholder="ระบุค่า"
                                                            inputClassName="w-32"
                                                        />
                                                        <span className="text-slate-500 text-sm">
                                                            mg/dl
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                        <span className="text-slate-600 min-w-[220px]">
                                                            1.2 ระดับน้ำตาลสะสม
                                                            (HbA1c) =
                                                        </span>
                                                        <TextInput
                                                            value={
                                                                part1Data.hba1cLevel
                                                            }
                                                            onChange={(v) =>
                                                                handlePart1Change(
                                                                    "hba1cLevel",
                                                                    v
                                                                )
                                                            }
                                                            inline
                                                            placeholder="ระบุค่า"
                                                            inputClassName="w-32"
                                                        />
                                                        <span className="text-slate-500 text-sm">
                                                            %
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Option 2: Unknown */}
                                        <div
                                            className={`transition-all duration-300 rounded-xl border p-4 ${
                                                part1Data.bloodSugarKnown ===
                                                "ไม่ทราบ"
                                                    ? "bg-sky-50 border-sky-200 shadow-sm"
                                                    : "bg-white border-slate-200 hover:border-sky-200"
                                            }`}
                                        >
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="bloodSugarKnown"
                                                        value="ไม่ทราบ"
                                                        checked={
                                                            part1Data.bloodSugarKnown ===
                                                            "ไม่ทราบ"
                                                        }
                                                        onChange={(e) =>
                                                            handlePart1Change(
                                                                "bloodSugarKnown",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                                                    />
                                                    <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                                </div>
                                                <span className="text-slate-800 font-medium text-lg">
                                                    2. ไม่ทราบ
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100" />

                                {/* 2. Doctor Visits */}
                                <div className="space-y-4">
                                    <label className="text-xl font-bold text-slate-800 block">
                                        2. ท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่
                                    </label>
                                    <div className="space-y-4 pt-2">
                                        <div
                                            className={`transition-all duration-300 rounded-xl border p-4 ${
                                                part1Data.visitDoctor ===
                                                "ทุกครั้ง"
                                                    ? "bg-sky-50 border-sky-200 shadow-sm"
                                                    : "bg-white border-slate-200 hover:border-sky-200"
                                            }`}
                                        >
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="visitDoctor"
                                                        value="ทุกครั้ง"
                                                        checked={
                                                            part1Data.visitDoctor ===
                                                            "ทุกครั้ง"
                                                        }
                                                        onChange={(e) =>
                                                            handlePart1Change(
                                                                "visitDoctor",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                                                    />
                                                    <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                                </div>
                                                <span className="text-slate-800 font-medium text-lg">
                                                    1. ทุกครั้ง
                                                </span>
                                            </label>
                                        </div>

                                        <div
                                            className={`transition-all duration-300 rounded-xl border p-4 ${
                                                part1Data.visitDoctor ===
                                                "ไม่ทุกครั้ง"
                                                    ? "bg-sky-50 border-sky-200 shadow-sm"
                                                    : "bg-white border-slate-200 hover:border-sky-200"
                                            }`}
                                        >
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="visitDoctor"
                                                        value="ไม่ทุกครั้ง"
                                                        checked={
                                                            part1Data.visitDoctor ===
                                                            "ไม่ทุกครั้ง"
                                                        }
                                                        onChange={(e) =>
                                                            handlePart1Change(
                                                                "visitDoctor",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                                                    />
                                                    <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                                </div>
                                                <span className="text-slate-800 font-medium text-lg">
                                                    2. ไม่ทุกครั้ง เพราะ
                                                </span>
                                            </label>

                                            {part1Data.visitDoctor ===
                                                "ไม่ทุกครั้ง" && (
                                                <div className="mt-4 ml-8 animate-in fade-in slide-in-from-top-2">
                                                    <TextInput
                                                        type="textarea"
                                                        value={
                                                            part1Data.notVisitReason
                                                        }
                                                        onChange={(v) =>
                                                            handlePart1Change(
                                                                "notVisitReason",
                                                                v
                                                            )
                                                        }
                                                        placeholder="ระบุสาเหตุ..."
                                                        rows={3}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
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
                ) : step === 2 ? (
                    <SectionTwoForm
                        formData={sectionTwoData}
                        onChange={setSectionTwoData}
                        onNext={() => goTo(4)}
                        onBack={() => goTo(1)}
                    />
                ) : step === 3 ? (
                    <MedicalRecordForm
                        formData={medicalRecordData}
                        onChange={setMedicalRecordData}
                        onNext={() => goTo(4)}
                        onBack={() => goTo(2)}
                    />
                ) : (
                    <SectionFourForm
                        data={config.part4Questions}
                        answers={sectionFourAnswers}
                        onAnswer={(id, score) =>
                            setSectionFourAnswers((prev) => ({
                                ...prev,
                                [id]: score,
                            }))
                        }
                        onBack={() => goTo(region === "central" ? 2 : 3)} // Central skips step 3
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
