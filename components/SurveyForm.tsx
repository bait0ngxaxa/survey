"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import SuccessModal from "@/components/SuccessModal";
import AlertModal from "@/components/AlertModal";
import SectionTwoForm from "./SectionTwoForm";
import MedicalRecordForm from "./MedicalRecordForm";
import SectionFourForm from "./SectionFourForm";
import Introduction from "./Introduction"; // Import
import { SurveyConfig } from "@/config/surveyData";

interface SurveyFormProps {
    config: SurveyConfig;
}

export default function SurveyForm({ config }: SurveyFormProps) {
    const [step, setStep] = useState(0); // Start at 0
    const [bloodSugarKnown, setBloodSugarKnown] = useState<string>("");
    const [fastingLevel, setFastingLevel] = useState<string>("");
    const [hba1cLevel, setHba1cLevel] = useState<string>("");
    const [visitDoctor, setVisitDoctor] = useState<string>("");
    const [notVisitReason, setNotVisitReason] = useState<string>("");

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    const handleNext = () => {
        // Validation for Part 1 (now effectively step 1)
        if (!bloodSugarKnown) {
            setAlertMessage("กรุณาระบุว่าท่านทราบผลการตรวจระดับน้ำตาลหรือไม่");
            setIsAlertOpen(true);
            return;
        }
        if (bloodSugarKnown === "known") {
            if (!fastingLevel || !hba1cLevel) {
                setAlertMessage("กรุณาระบุระดับน้ำตาลในเลือดและค่าน้ำตาลสะสม");
                setIsAlertOpen(true);
                return;
            }
        }
        if (!visitDoctor) {
            setAlertMessage("กรุณาระบุว่าท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่");
            setIsAlertOpen(true);
            return;
        }
        if (visitDoctor === "sometimes" && !notVisitReason) {
            setAlertMessage("กรุณาระบุสาเหตุที่ไม่ได้มาพบแพทย์ทุกครั้ง");
            setIsAlertOpen(true);
            return;
        }

        setStep(2);
    };

    return (
        <>
            <Suspense fallback={null}>
                <SuccessModal />
            </Suspense>
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                {step === 0 ? (
                    <Introduction onStart={() => setStep(1)} />
                ) : step === 1 ? (
                    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-8">
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {config.title}
                                </h1>
                                <p className="text-blue-100 text-lg">
                                    ส่วนที่ 1: ข้อมูลทั่วไป
                                </p>
                            </div>

                            <form className="p-8 space-y-10">
                                <p className="text-gray-600 italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
                                    ก่อนที่ท่านจะตอบแบบสอบถามชุดนี้
                                    ผู้วิจัยอยากทราบว่า
                                </p>

                                {/* 1. Blood Sugar Knowledge */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 block">
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
                                                    value="known"
                                                    checked={
                                                        bloodSugarKnown ===
                                                        "known"
                                                    }
                                                    onChange={(e) =>
                                                        setBloodSugarKnown(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <span className="text-gray-700">
                                                    1. ทราบ
                                                </span>
                                            </label>

                                            {bloodSugarKnown === "known" && (
                                                <div className="ml-8 space-y-3 animate-in fade-in slide-in-from-top-2">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                        <span className="text-gray-600 min-w-[200px]">
                                                            1.1
                                                            ระดับน้ำตาลในเลือด
                                                            (Fasting) =
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={fastingLevel}
                                                            onChange={(e) =>
                                                                setFastingLevel(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="flex-1 w-full max-w-[200px] border-b border-gray-300 focus:border-blue-500 outline-none px-2 py-1 text-center font-medium bg-transparent"
                                                            placeholder="ระบุค่า"
                                                        />
                                                        <span className="text-gray-600">
                                                            มิลลิกรัม/เดซิลิตร
                                                            (mg/dl)
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                        <span className="text-gray-600 min-w-[200px]">
                                                            1.2 ระดับน้ำตาลสะสม
                                                            (HbA1c) =
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={hba1cLevel}
                                                            onChange={(e) =>
                                                                setHba1cLevel(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="flex-1 w-full max-w-[200px] border-b border-gray-300 focus:border-blue-500 outline-none px-2 py-1 text-center font-medium bg-transparent"
                                                            placeholder="ระบุค่า"
                                                        />
                                                        <span className="text-gray-600">
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
                                                value="unknown"
                                                checked={
                                                    bloodSugarKnown ===
                                                    "unknown"
                                                }
                                                onChange={(e) =>
                                                    setBloodSugarKnown(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="text-gray-700">
                                                2. ไม่ทราบ
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* 2. Doctor Visits */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 block">
                                        2. ท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่
                                    </label>
                                    <div className="pl-4 space-y-4">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="visitDoctor"
                                                value="always"
                                                checked={
                                                    visitDoctor === "always"
                                                }
                                                onChange={(e) =>
                                                    setVisitDoctor(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="text-gray-700">
                                                1. ทุกครั้ง
                                            </span>
                                        </label>

                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="visitDoctor"
                                                    value="sometimes"
                                                    checked={
                                                        visitDoctor ===
                                                        "sometimes"
                                                    }
                                                    onChange={(e) =>
                                                        setVisitDoctor(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <span className="text-gray-700">
                                                    2. ไม่ทุกครั้ง เพราะ
                                                </span>
                                            </label>

                                            {visitDoctor === "sometimes" && (
                                                <div className="ml-8 animate-in fade-in slide-in-from-top-2">
                                                    <textarea
                                                        value={notVisitReason}
                                                        onChange={(e) =>
                                                            setNotVisitReason(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-400"
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
                                        className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold transition-all shadow-sm"
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
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                ) : step === 3 ? (
                    <MedicalRecordForm
                        onNext={() => setStep(4)}
                        onBack={() => setStep(2)}
                    />
                ) : (
                    <SectionFourForm
                        data={config.part4Questions}
                        onBack={() => setStep(3)}
                        onSubmit={() => alert("บันทึกข้อมูลสำเร็จ!")}
                    />
                )}
            </div>
        </>
    );
}
