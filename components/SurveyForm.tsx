"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import {
    User,
    Calendar,
    GraduationCap,
    Heart,
    Briefcase,
    DollarSign,
    ChevronRight,
    ChevronLeft,
    Check,
} from "lucide-react";
import SuccessModal from "@/components/SuccessModal";
import { SurveyConfig } from "@/config/surveyData";

interface SurveyFormProps {
    config: SurveyConfig;
}

export default function SurveyForm({ config }: SurveyFormProps) {
    const [step, setStep] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    return (
        <>
            <Suspense fallback={null}>
                <SuccessModal />
            </Suspense>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                {step === 1 ? (
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
                                {/* 1. Informant */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                            1
                                        </div>
                                        <User
                                            className="text-blue-500"
                                            size={20}
                                        />
                                        ผู้ให้ข้อมูล
                                    </label>
                                    <div className="pl-10">
                                        <input
                                            type="text"
                                            name="informantName"
                                            className="w-full md:w-1/2 p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-400"
                                            placeholder="ระบุชื่อ-นามสกุล"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* 2. Gender */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                            2
                                        </div>
                                        <User
                                            className="text-blue-500"
                                            size={20}
                                        />
                                        เพศ
                                    </label>
                                    <div className="pl-10 flex gap-4">
                                        {["ชาย", "หญิง"].map((gender) => (
                                            <label
                                                key={gender}
                                                className="relative flex cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-blue-400 hover:ring-1 hover:ring-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={gender}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 relative flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                                    </div>
                                                    <span className="font-medium text-gray-700 peer-checked:text-blue-600">
                                                        {gender}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 rounded-xl ring-2 ring-transparent peer-checked:ring-blue-500 peer-checked:border-blue-500 transition-all pointer-events-none" />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* 3. Age */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                            3
                                        </div>
                                        <Calendar
                                            className="text-blue-500"
                                            size={20}
                                        />
                                        อายุ
                                    </label>
                                    <div className="pl-10 flex flex-wrap gap-6 items-center">
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    className="w-20 bg-transparent outline-none text-center font-medium text-gray-900 placeholder-gray-400"
                                                    placeholder="--"
                                                />
                                                <span className="text-gray-500 font-medium">
                                                    ปี
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-gray-400 font-medium">
                                            หรือ
                                        </span>
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500 text-sm">
                                                    วันเกิด:
                                                </span>
                                                <input
                                                    type="text"
                                                    className="w-32 bg-transparent outline-none text-center font-medium text-gray-900 placeholder-gray-400"
                                                    placeholder="DD/MM/YYYY"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* 4. Education */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                            4
                                        </div>
                                        <GraduationCap
                                            className="text-blue-500"
                                            size={20}
                                        />
                                        ระดับการศึกษา
                                    </label>
                                    <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            "ต่ำกว่าประถมศึกษา",
                                            "ประถมศึกษา",
                                            "มัธยมศึกษาตอนต้น",
                                            "มัธยมศึกษาตอนปลาย/ ปวช.",
                                            "ปวส./อนุปริญญา",
                                            "ปริญญาตรี",
                                            "สูงกว่าปริญญาตรีโปรดระบุ",
                                            "อื่น ๆ โปรดระบุ",
                                        ].map((option, idx) => (
                                            <label
                                                key={idx}
                                                className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center w-full">
                                                    <input
                                                        type="radio"
                                                        name="education"
                                                        value={option}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 mr-3 flex-shrink-0 relative flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                                    </div>
                                                    <span className="text-gray-700 peer-checked:text-gray-900 peer-checked:font-medium">
                                                        {
                                                            option.split(
                                                                "โปรดระบุ"
                                                            )[0]
                                                        }
                                                    </span>
                                                    {option.includes(
                                                        "โปรดระบุ"
                                                    ) && (
                                                        <input
                                                            type="text"
                                                            className="ml-2 flex-1 border-b border-gray-300 focus:border-blue-500 outline-none text-sm bg-transparent py-0.5"
                                                            placeholder="ระบุ..."
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <div className="absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-blue-500 peer-checked:border-blue-500 pointer-events-none transition-all opacity-50" />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* 5. Marital Status */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                            5
                                        </div>
                                        <Heart
                                            className="text-blue-500"
                                            size={20}
                                        />
                                        สถานภาพสมรส
                                    </label>
                                    <div className="pl-10 flex flex-wrap gap-4">
                                        {[
                                            "โสด",
                                            "สมรส/อยู่ด้วยกัน",
                                            "หย่า/หม้าย",
                                        ].map((status, idx) => (
                                            <label
                                                key={idx}
                                                className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 px-6 hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="maritalStatus"
                                                        value={status}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-pink-500 peer-checked:bg-pink-500 mr-2 relative flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                                    </div>
                                                    <span className="text-gray-700 peer-checked:text-gray-900 peer-checked:font-medium">
                                                        {status}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-pink-500 peer-checked:border-pink-500 pointer-events-none transition-all opacity-50" />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* 6. Occupation */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                            6
                                        </div>
                                        <Briefcase
                                            className="text-blue-500"
                                            size={20}
                                        />
                                        อาชีพ
                                    </label>
                                    <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            "ไม่ได้ประกอบอาชีพ",
                                            "ข้าราชการ/พนักงานรัฐวิสาหกิจ",
                                            "พนักงานบริษัทเอกชน",
                                            "ประกอบธุรกิจส่วนตัว เช่น ค้าขาย",
                                            "ข้าราชการบำนาญ",
                                            "เกษตรกรรม",
                                            "รับจ้างทั่วไป",
                                            "อื่น ๆ โปรดระบุ",
                                        ].map((job, idx) => (
                                            <label
                                                key={idx}
                                                className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center w-full">
                                                    <input
                                                        type="radio"
                                                        name="occupation"
                                                        value={job}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 mr-3 flex-shrink-0 relative flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                                    </div>
                                                    <span className="text-gray-700 peer-checked:text-gray-900 peer-checked:font-medium">
                                                        {
                                                            job.split(
                                                                "โปรดระบุ"
                                                            )[0]
                                                        }
                                                    </span>
                                                    {job.includes(
                                                        "โปรดระบุ"
                                                    ) && (
                                                        <input
                                                            type="text"
                                                            className="ml-2 flex-1 border-b border-gray-300 focus:border-blue-500 outline-none text-sm bg-transparent py-0.5"
                                                            placeholder="ระบุ..."
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <div className="absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-blue-500 peer-checked:border-blue-500 pointer-events-none transition-all opacity-50" />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* 7. Income */}
                                <div className="space-y-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                            7
                                        </div>
                                        <DollarSign
                                            className="text-blue-500"
                                            size={20}
                                        />
                                        รายได้เฉลี่ยต่อเดือน
                                    </label>
                                    <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            "ไม่มีรายได้",
                                            "น้อยกว่า 5,000 บาท",
                                            "ตั้งแต่ 5,001 – 10,000 บาท",
                                            "ตั้งแต่ 10,001 – 20,000 บาท",
                                            "ตั้งแต่ 20,001 – 30,000 บาท",
                                            "มากกว่า 30,001 บาท",
                                        ].map((income, idx) => (
                                            <label
                                                key={idx}
                                                className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center w-full">
                                                    <input
                                                        type="radio"
                                                        name="income"
                                                        value={income}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500 mr-3 flex-shrink-0 relative flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                                    </div>
                                                    <span className="text-gray-700 peer-checked:text-gray-900 peer-checked:font-medium">
                                                        {income}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-green-500 peer-checked:border-green-500 pointer-events-none transition-all opacity-50" />
                                            </label>
                                        ))}
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
                                        onClick={() => setStep(2)}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                                    >
                                        ถัดไป
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Header Part 2 */}
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-8 px-8 text-white">
                                <h1 className="text-2xl font-bold mb-4">
                                    แบบประเมินความถี่อาการ (ส่วนที่ 2)
                                </h1>
                                <p className="text-gray-300">
                                    ใน 1
                                    เดือนที่ผ่านมาท่านมีกี่ครั้งที่มีอาการต่างๆ
                                    ต่อไปนี้ (โปรดเลือกคะแนน 1-6)
                                </p>
                            </div>

                            <div className="p-8">
                                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    <div className="col-span-1 text-center">
                                        ข้อที่
                                    </div>
                                    <div className="col-span-6">อาการ</div>
                                    <div className="col-span-5 text-center">
                                        ระดับความถี่ (1=น้อยที่สุด, 6=มากที่สุด)
                                    </div>
                                </div>

                                <form className="space-y-2 mt-4">
                                    {config.part2Questions.map(
                                        (symptom, index) => (
                                            <div
                                                key={symptom.id}
                                                className={`group rounded-xl p-4 transition-all hover:bg-blue-50 ${
                                                    index % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-gray-50"
                                                }`}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                    <div className="col-span-1 flex justify-center">
                                                        <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm group-hover:bg-white group-hover:text-blue-600 transition-colors">
                                                            {symptom.id}
                                                        </span>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <p className="text-gray-800 font-medium group-hover:text-gray-900">
                                                            {symptom.text}
                                                        </p>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-5">
                                                        <div className="flex justify-between items-center gap-2 px-2">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                                6,
                                                            ].map((score) => (
                                                                <label
                                                                    key={score}
                                                                    className="relative cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={`symptom_${symptom.id}`}
                                                                        value={
                                                                            score
                                                                        }
                                                                        className="peer sr-only"
                                                                    />
                                                                    <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 font-semibold transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white peer-hover:border-blue-300 peer-hover:text-blue-500">
                                                                        {score}
                                                                    </div>
                                                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity font-medium whitespace-nowrap">
                                                                        {score ===
                                                                        1
                                                                            ? "น้อย"
                                                                            : score ===
                                                                              6
                                                                            ? "มาก"
                                                                            : ""}
                                                                    </div>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}

                                    {/* Footer Buttons */}
                                    <div className="pt-10 flex justify-between gap-4 border-t border-gray-100 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-all flex items-center gap-2"
                                        >
                                            <ChevronLeft size={20} />
                                            ย้อนกลับ
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                                        >
                                            <Check size={20} />
                                            บันทึกข้อมูล
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
