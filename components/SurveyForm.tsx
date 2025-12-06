"use client";

import { useState } from "react";
import { Suspense } from "react";
import {
    User,
    Calendar,
    GraduationCap,
    Heart,
    Briefcase,
    DollarSign,
} from "lucide-react";
import SuccessModal from "@/components/SuccessModal";
import { SurveyConfig } from "@/config/surveyData";

interface SurveyFormProps {
    config: SurveyConfig;
}

export default function SurveyForm({ config }: SurveyFormProps) {
    const [step, setStep] = useState(1);

    return (
        <>
            <Suspense fallback={null}>
                <SuccessModal />
            </Suspense>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                {step === 1 ? (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-black py-4 px-6">
                                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                    {config.title} (ส่วนที่ 1)
                                </h1>
                            </div>

                            <form className="divide-y divide-gray-200">
                                {/* 1. Informant */}
                                <div className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500 font-mono mt-1">
                                            1.
                                        </span>
                                        <div className="flex-1">
                                            <label className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                                                <User size={18} /> ผู้ให้ข้อมูล
                                            </label>
                                            <input
                                                type="text"
                                                name="informantName"
                                                className="w-full md:w-1/2 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors"
                                                placeholder="ระบุชื่อ-นามสกุล"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Gender */}
                                <div className="p-6 hover:bg-gray-50 transition-colors bg-gray-50/50">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500 font-mono mt-1">
                                            2.
                                        </span>
                                        <div className="flex-1">
                                            <label className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                                                <User size={18} /> เพศ
                                            </label>
                                            <div className="flex gap-8">
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="male"
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                    />
                                                    <span className="text-gray-700 group-hover:text-gray-900">
                                                        ชาย
                                                    </span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="female"
                                                        className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                                                    />
                                                    <span className="text-gray-700 group-hover:text-gray-900">
                                                        หญิง
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Age */}
                                <div className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500 font-mono mt-1">
                                            3.
                                        </span>
                                        <div className="flex-1">
                                            <label className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                                                <Calendar size={18} /> อายุ
                                            </label>
                                            <div className="flex flex-wrap gap-4 items-center text-gray-700">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        className="w-20 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none py-1 text-center"
                                                        placeholder="--"
                                                    />
                                                    <span>ปี</span>
                                                </div>
                                                <span>หรือ</span>
                                                <div className="flex items-center gap-2">
                                                    <span>
                                                        วัน/เดือน/ปี พ.ศ. เกิด
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="w-40 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none py-1 text-center"
                                                        placeholder="DD/MM/YYYY"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Education */}
                                <div className="p-6 hover:bg-gray-50 transition-colors bg-gray-50/50">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500 font-mono mt-1">
                                            4.
                                        </span>
                                        <div className="flex-1">
                                            <label className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                                                <GraduationCap size={18} />{" "}
                                                ระดับการศึกษา
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                                        className="flex items-start gap-2 cursor-pointer group"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="education"
                                                            value={option}
                                                            className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <span className="text-gray-700 group-hover:text-gray-900">
                                                            {option.includes(
                                                                "โปรดระบุ"
                                                            ) ? (
                                                                <>
                                                                    {
                                                                        option.split(
                                                                            "โปรดระบุ"
                                                                        )[0]
                                                                    }
                                                                    <input
                                                                        type="text"
                                                                        className="ml-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm w-32"
                                                                        placeholder="ระบุ..."
                                                                    />
                                                                </>
                                                            ) : (
                                                                option
                                                            )}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Marital Status */}
                                <div className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500 font-mono mt-1">
                                            5.
                                        </span>
                                        <div className="flex-1">
                                            <label className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                                                <Heart size={18} /> สถานภาพสมรส
                                            </label>
                                            <div className="flex flex-wrap gap-6">
                                                {[
                                                    "โสด",
                                                    "สมรส/อยู่ด้วยกัน",
                                                    "หย่า/หม้าย",
                                                ].map((status, idx) => (
                                                    <label
                                                        key={idx}
                                                        className="flex items-center gap-2 cursor-pointer group"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="maritalStatus"
                                                            value={status}
                                                            className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                                                        />
                                                        <span className="text-gray-700 group-hover:text-gray-900">
                                                            {status}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 6. Occupation */}
                                <div className="p-6 hover:bg-gray-50 transition-colors bg-gray-50/50">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500 font-mono mt-1">
                                            6.
                                        </span>
                                        <div className="flex-1">
                                            <label className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                                                <Briefcase size={18} /> อาชีพ
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                                        className="flex items-start gap-2 cursor-pointer group"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="occupation"
                                                            value={job}
                                                            className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <span className="text-gray-700 group-hover:text-gray-900">
                                                            {job.includes(
                                                                "โปรดระบุ"
                                                            ) ? (
                                                                <>
                                                                    {
                                                                        job.split(
                                                                            "โปรดระบุ"
                                                                        )[0]
                                                                    }
                                                                    <input
                                                                        type="text"
                                                                        className="ml-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm w-32"
                                                                        placeholder="ระบุ..."
                                                                    />
                                                                </>
                                                            ) : (
                                                                job
                                                            )}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 7. Income */}
                                <div className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500 font-mono mt-1">
                                            7.
                                        </span>
                                        <div className="flex-1">
                                            <label className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                                                <DollarSign size={18} />{" "}
                                                รายได้เฉลี่ยต่อเดือน
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                                        className="flex items-center gap-2 cursor-pointer group"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="income"
                                                            value={income}
                                                            className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                                                        />
                                                        <span className="text-gray-700 group-hover:text-gray-900">
                                                            {income}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Buttons */}
                                <div className="bg-gray-100 p-6 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm transition"
                                    >
                                        ถัดไป
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-black py-4 px-6 text-white grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-1 text-center font-bold">
                                    ข้อ
                                </div>
                                <div className="col-span-7 text-center font-bold">
                                    ใน 1 เดือนที่ผ่านมาท่านมีอาการต่างๆ
                                    ต่อไปนี้บ่อยแค่ไหน
                                </div>
                                <div className="col-span-4 text-center font-bold border-l border-gray-700 pl-2">
                                    <div>ระดับความถี่ในการเกิดอาการ</div>
                                    <div className="grid grid-cols-6 mt-2 text-sm">
                                        <div>1</div>
                                        <div>2</div>
                                        <div>3</div>
                                        <div>4</div>
                                        <div>5</div>
                                        <div>6</div>
                                    </div>
                                </div>
                            </div>

                            <form className="divide-y divide-gray-200">
                                {config.part2Questions.map((symptom, index) => (
                                    <div
                                        key={symptom.id}
                                        className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors items-stretch ${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50/50"
                                        }`}
                                    >
                                        <div className="col-span-1 flex items-center justify-center font-mono text-gray-500">
                                            {symptom.id}
                                        </div>
                                        <div className="col-span-7 text-gray-700 flex items-center">
                                            {symptom.text}
                                        </div>
                                        <div className="col-span-4 flex items-center border-l border-gray-200 pl-2">
                                            <div className="grid grid-cols-6 w-full place-items-center">
                                                {[1, 2, 3, 4, 5, 6].map(
                                                    (score) => (
                                                        <label
                                                            key={score}
                                                            className="cursor-pointer group flex flex-col items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all w-8 h-8"
                                                            title={`Score ${score}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`symptom_${symptom.id}`}
                                                                value={score}
                                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                            />
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Footer Buttons */}
                                <div className="bg-gray-100 p-6 flex justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition"
                                    >
                                        ย้อนกลับ
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm transition"
                                    >
                                        ถัดไป
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
