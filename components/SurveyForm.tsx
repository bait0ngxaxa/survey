"use client";

import { useState, useEffect, useCallback } from "react";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import SubmitSuccessModal from "@/components/SubmitSuccessModal";
import AlertModal from "@/components/AlertModal";
import ConfirmExitModal from "@/components/ConfirmExitModal";
import SectionTwoForm from "./SectionTwoForm";
import MedicalRecordForm from "./MedicalRecordForm";
import SectionFourForm from "./SectionFourForm";
import Introduction from "./Introduction";
import { FormSection, TextInput, RadioGroup } from "@/components/ui/form";
import { SurveyConfig } from "@/config/surveyData";
import { submitSurvey } from "@/lib/actions/survey";
import {
    Part1Data,
    SectionTwoData,
    MedicalRecordData,
    RecommendationsData,
    AdditionalInfoData,
} from "@/lib/types";

interface SurveyFormProps {
    config: SurveyConfig;
    region: string;
}

const initialPart1Data: Part1Data = {
    bloodSugarKnown: "",
    fastingLevel: "",
    hba1cLevel: "",
    visitDoctor: "",
    notVisitReason: "",
    surveyMethod: "ตอบด้วยตนเอง",
    interviewerName: "",
};

const initialSectionTwoData: SectionTwoData = {
    respondentName: "",
    gender: "",
    age: "",
    birthDate: "",
    education: "",
    educationOther: "",
    maritalStatus: "",
    occupation: "",
    occupationOther: "",
    income: "",
    supportSource: "",
    supportSourceOther: "",
    financialStatus: "",
    diabetesDuration: "",
    diabetesAge: "",
    treatmentType: "",
    treatmentOther: "",
    medicationCount: "",
    paymentMethod: "",
    paymentMethodOther: "",
    livingArrangement: "",
    livingMembers: "",
    livingArrangementOther: "",
    familySupport: "",
    workSupport: "",
    dietFood: "",
    dietSnack: "",
    dietDrink: "",
    alcohol: "",
    alcoholYears: "",
    alcoholDays: "",
    smoking: "",
    smokingYears: "",
    smokingAmount: "",
    otherDiseases: "no",
    otherDiseasesList: "",
    complications: [],
    complicationsOther: "",
    screenings: {
        physical: "",
        physicalOther: "",
        foot: "",
        footOther: "",
        eye: "",
        eyeOther: "",
        urine: "",
        urineOther: "",
        lipid: "",
        lipidOther: "",
        dental: "",
        dentalOther: "",
        hba1c: "",
        hba1cOther: "",
        other: "",
        otherText: "",
    },
    adviceReceived: "",
    adviceCount: "",
    adviceCountUnknown: false,
    adviceTopics: "",
    adviceSources: {
        doctor_pcc: "",
        doctor_other: "",
        doctor2_pcc: "",
        doctor2_other: "",
        nurse_pcc: "",
        nurse_other: "",
        patient_pcc: "",
        patient_other: "",
        camp_pcc: "",
        camp_other: "",
        teaching_pcc: "",
        teaching_other: "",
        pamphlet_pcc: "",
        pamphlet_other: "",
        tv_radio: "",
        internet: "",
        newspaper: "",
        other_source: "",
        other_source_count: "",
        other_source_name: "",
    },
    peerDiscussion: "",
    peerDiscussionTopic: "",
    activities: "",
    activitiesTopic: "",
    admissions: "",
    admissionCount: "",
    admissionReason: "",
};

const initialMedicalRecordData: MedicalRecordData = {
    bloodSugar: "",
    hba1c: "",
    bloodPressure: "",
    microAlbumin: "",
    microAlbuminRatio: "",
    microAlbuminOther: "",
    creatinine: "",
    weight: "",
    lipid_tchol: "",
    lipid_tg: "",
    lipid_ldl: "",
    lipid_hdl: "",
    otherDiseases: "",
    diabetesDurationYears: "",
    diabetesDurationMonths: "",
};

export default function SurveyForm({ config, region }: SurveyFormProps) {
    const [step, setStep] = useState(0);

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

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Exit confirmation state
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);

    // Check if user has started filling the survey
    const hasStartedSurvey = step > 0;

    // Handle browser back button and beforeunload
    useEffect(() => {
        if (!hasStartedSurvey || submitSuccess) return;

        // Prevent accidental page close/refresh
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
            return "";
        };

        // Push a dummy state to history to intercept back button
        window.history.pushState({ surveyInProgress: true }, "");

        const handlePopState = () => {
            // User pressed back button, show confirmation modal
            setIsExitModalOpen(true);
            // Push state again to prevent immediate navigation
            window.history.pushState({ surveyInProgress: true }, "");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [hasStartedSurvey, submitSuccess]);

    const handleConfirmExit = useCallback(() => {
        setIsExitModalOpen(false);

        window.location.href = "/dashboard";
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    const handlePart1Change = (field: keyof Part1Data, value: string) => {
        setPart1Data((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        // Validation for Pre-Survey Questions
        if (!sectionTwoData.respondentName.trim()) {
            setAlertMessage("กรุณาระบุชื่อผู้ให้ข้อมูล (ตัวผู้ป่วย)");
            setIsAlertOpen(true);
            return;
        }

        if (
            part1Data.surveyMethod === "สัมภาษณ์" &&
            !part1Data.interviewerName?.trim()
        ) {
            setAlertMessage("กรุณาระบุชื่อผู้สัมภาษณ์");
            setIsAlertOpen(true);
            return;
        }

        // Validation for Part 1
        if (!part1Data.bloodSugarKnown) {
            setAlertMessage("กรุณาระบุว่าท่านทราบผลการตรวจระดับน้ำตาลหรือไม่");
            setIsAlertOpen(true);
            return;
        }
        if (part1Data.bloodSugarKnown === "ทราบ") {
            if (!part1Data.fastingLevel || !part1Data.hba1cLevel) {
                setAlertMessage("กรุณาระบุระดับน้ำตาลในเลือดและค่าน้ำตาลสะสม");
                setIsAlertOpen(true);
                return;
            }
        }
        if (!part1Data.visitDoctor) {
            setAlertMessage("กรุณาระบุว่าท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่");
            setIsAlertOpen(true);
            return;
        }
        if (
            part1Data.visitDoctor === "ไม่ทุกครั้ง" &&
            !part1Data.notVisitReason
        ) {
            setAlertMessage("กรุณาระบุสาเหตุที่ไม่ได้มาพบแพทย์ทุกครั้ง");
            setIsAlertOpen(true);
            return;
        }

        setStep(2);
    };

    const handleSubmitSurvey = async () => {
        setIsSubmitting(true);
        try {
            const result = await submitSurvey({
                region: region,
                hospital: "", // Optional
                part1: part1Data,
                sectionTwo: sectionTwoData,
                medicalRecord: medicalRecordData,
                sectionFour: {
                    answers: sectionFourAnswers,
                    reportData: recommendations,
                },
            });

            if (result.success) {
                setSubmitSuccess(true);
            } else {
                setAlertMessage(
                    result.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล"
                );
                setIsAlertOpen(true);
            }
        } catch (error) {
            console.error("Submit error:", error);
            setAlertMessage("เกิดข้อผิดพลาด: " + (error as Error).message);
            setIsAlertOpen(true);
        } finally {
            setIsSubmitting(false);
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
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />
            <ConfirmExitModal
                isOpen={isExitModalOpen}
                onClose={() => setIsExitModalOpen(false)}
                onConfirm={handleConfirmExit}
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
                    <Introduction onStart={() => setStep(1)} />
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

                            {/* Footer */}
                            <div className="pt-8 flex justify-end gap-4 border-t border-slate-100 mt-8">
                                <button
                                    type="button"
                                    onClick={() =>
                                        (window.location.href = "/dashboard")
                                    }
                                    className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all shadow-sm"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 font-semibold shadow-lg hover:shadow-sky-200/50 transition-all flex items-center gap-2"
                                >
                                    ถัดไป
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </FormSection>
                    </div>
                ) : step === 2 ? (
                    <SectionTwoForm
                        formData={sectionTwoData}
                        onChange={setSectionTwoData}
                        onNext={() => setStep(4)}
                        onBack={() => setStep(1)}
                    />
                ) : step === 3 ? (
                    <MedicalRecordForm
                        formData={medicalRecordData}
                        onChange={setMedicalRecordData}
                        onNext={() => setStep(4)}
                        onBack={() => setStep(2)}
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
                        onBack={() => setStep(region === "central" ? 2 : 3)} // Central skips step 3
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
