"use client";

import { useState, useEffect, useCallback } from "react";
import { Suspense } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import SubmitSuccessModal from "@/components/SubmitSuccessModal";
import AlertModal from "@/components/AlertModal";
import ConfirmExitModal from "@/components/ConfirmExitModal";
import SectionTwoForm from "./SectionTwoForm";
import MedicalRecordForm from "./MedicalRecordForm";
import SectionFourForm from "./SectionFourForm";
import Introduction from "./Introduction";
import { SurveyConfig } from "@/config/surveyData";
import { submitSurvey } from "@/lib/actions/survey";
import { Part1Data, SectionTwoData, MedicalRecordData } from "@/lib/types";

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
    const [recommendations, setRecommendations] = useState<Record<string, any>>(
        {}
    ); // Changed to any to support structured object
    const [additionalInfo, setAdditionalInfo] = useState<Record<string, any>>(
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

        const handlePopState = (e: PopStateEvent) => {
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
        // Navigate to dashboard
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
                    reportData: recommendations, // Pass the report data
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
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-8 px-8">
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {config.title}
                                </h1>
                                <p className="text-blue-100 text-lg">
                                    ส่วนที่ 1: ข้อมูลทั่วไป
                                </p>
                            </div>

                            <form className="p-8 space-y-10">
                                <p className="text-slate-700 italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r-lg font-medium">
                                    ก่อนที่ท่านจะตอบแบบสอบถามชุดนี้
                                    ผู้วิจัยอยากทราบว่า
                                </p>

                                {/* Pre-Survey Questions */}
                                <div className="space-y-6 border-b border-slate-200 pb-8">
                                    <div className="space-y-2">
                                        <label className="font-semibold block text-slate-900">
                                            วิธีการเก็บข้อมูล
                                        </label>
                                        <div className="flex gap-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="surveyMethod"
                                                    value="ตอบด้วยตนเอง"
                                                    checked={
                                                        part1Data.surveyMethod ===
                                                        "ตอบด้วยตนเอง"
                                                    }
                                                    onChange={(e) =>
                                                        handlePart1Change(
                                                            "surveyMethod",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-slate-800">
                                                    ตอบด้วยตนเอง
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="surveyMethod"
                                                    value="สัมภาษณ์"
                                                    checked={
                                                        part1Data.surveyMethod ===
                                                        "สัมภาษณ์"
                                                    }
                                                    onChange={(e) =>
                                                        handlePart1Change(
                                                            "surveyMethod",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-slate-800">
                                                    สัมภาษณ์
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-semibold block text-slate-900">
                                            ชื่อผู้ให้ข้อมูล
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="ระบุชื่อ-นามสกุล"
                                            value={
                                                sectionTwoData.respondentName
                                            }
                                            onChange={(e) =>
                                                setSectionTwoData((prev) => ({
                                                    ...prev,
                                                    respondentName:
                                                        e.target.value,
                                                }))
                                            }
                                            className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                                        />
                                    </div>

                                    {part1Data.surveyMethod === "สัมภาษณ์" && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                            <label className="font-semibold block text-slate-900">
                                                ชื่อผู้สัมภาษณ์
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="ระบุชื่อ-นามสกุลผู้สัมภาษณ์"
                                                value={
                                                    part1Data.interviewerName
                                                }
                                                onChange={(e) =>
                                                    handlePart1Change(
                                                        "interviewerName",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* 1. Blood Sugar Knowledge */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-slate-900 block">
                                        1.
                                        ท่านทราบผลการตรวจระดับน้ำตาลในเลือดและค่าน้ำตาลสะสมของท่านในครั้งนี้หรือไม่
                                        อย่างไร
                                    </label>
                                    <div className="pl-4 space-y-4">
                                        {/* Option 1: Known */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 cursor-pointer">
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
                                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300"
                                                />
                                                <span className="text-slate-800">
                                                    1. ทราบ
                                                </span>
                                            </label>

                                            {part1Data.bloodSugarKnown ===
                                                "ทราบ" && (
                                                <div className="ml-8 space-y-3 animate-in fade-in slide-in-from-top-2">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                        <span className="text-slate-700 min-w-[200px]">
                                                            1.1
                                                            ระดับน้ำตาลในเลือด
                                                            (Fasting) =
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={
                                                                part1Data.fastingLevel
                                                            }
                                                            onChange={(e) =>
                                                                handlePart1Change(
                                                                    "fastingLevel",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="flex-1 w-full max-w-[200px] border-b border-slate-400 focus:border-blue-500 outline-none px-2 py-1 text-center font-medium bg-transparent text-slate-900 placeholder-slate-400"
                                                            placeholder="ระบุค่า"
                                                        />
                                                        <span className="text-slate-700">
                                                            มิลลิกรัม/เดซิลิตร
                                                            (mg/dl)
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                        <span className="text-slate-700 min-w-[200px]">
                                                            1.2 ระดับน้ำตาลสะสม
                                                            (HbA1c) =
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={
                                                                part1Data.hba1cLevel
                                                            }
                                                            onChange={(e) =>
                                                                handlePart1Change(
                                                                    "hba1cLevel",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="flex-1 w-full max-w-[200px] border-b border-slate-400 focus:border-blue-500 outline-none px-2 py-1 text-center font-medium bg-transparent text-slate-900 placeholder-slate-400"
                                                            placeholder="ระบุค่า"
                                                        />
                                                        <span className="text-slate-700">
                                                            เปอร์เซ็นต์ (%)
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Option 2: Unknown */}
                                        <label className="flex items-center gap-3 cursor-pointer">
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
                                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            />
                                            <span className="text-slate-800">
                                                2. ไม่ทราบ
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200" />

                                {/* 2. Doctor Visits */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-slate-900 block">
                                        2. ท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่
                                    </label>
                                    <div className="pl-4 space-y-4">
                                        <label className="flex items-center gap-3 cursor-pointer">
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
                                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            />
                                            <span className="text-slate-800">
                                                1. ทุกครั้ง
                                            </span>
                                        </label>

                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 cursor-pointer">
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
                                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300"
                                                />
                                                <span className="text-slate-800">
                                                    2. ไม่ทุกครั้ง เพราะ
                                                </span>
                                            </label>

                                            {part1Data.visitDoctor ===
                                                "ไม่ทุกครั้ง" && (
                                                <div className="ml-8 animate-in fade-in slide-in-from-top-2">
                                                    <textarea
                                                        value={
                                                            part1Data.notVisitReason
                                                        }
                                                        onChange={(e) =>
                                                            handlePart1Change(
                                                                "notVisitReason",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder-slate-400"
                                                        placeholder="ระบุสาเหตุ..."
                                                        rows={3}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="pt-8 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            (window.location.href =
                                                "/dashboard")
                                        }
                                        className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all shadow-sm"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                                    >
                                        ถัดไป
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : step === 2 ? (
                    <SectionTwoForm
                        formData={sectionTwoData}
                        onChange={setSectionTwoData}
                        onNext={() => setStep(4)}
                        onBack={() => setStep(1)}
                        region={region}
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
                        respondentName={sectionTwoData.respondentName}
                        interviewerName={part1Data.interviewerName}
                        isSubmitting={isSubmitting}
                    />
                )}
            </div>
        </>
    );
}
