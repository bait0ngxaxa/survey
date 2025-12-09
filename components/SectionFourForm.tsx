"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import Image from "next/image";
import AlertModal from "@/components/AlertModal";
import { Part4Section } from "@/config/part4Data";

interface SectionFourFormProps {
    data: Part4Section[];
    answers: Record<number, number>;
    onAnswer: (questionId: number, score: number) => void;
    onBack: () => void;
    onSubmit: () => void;
}

export default function SectionFourForm({
    data,
    answers,
    onAnswer,
    onBack,
    onSubmit,
}: SectionFourFormProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleAnswer = (questionId: number, score: number) => {
        onAnswer(questionId, score);
    };

    const handleSubmit = () => {
        // Validate that all questions have been answered
        let allAnswered = true;
        let firstUnanswered: string | null = null;

        for (const section of data) {
            for (const q of section.questions) {
                if (!answers[q.id]) {
                    allAnswered = false;
                    if (!firstUnanswered) firstUnanswered = `ข้อ ${q.id}`;
                }
            }
        }

        if (!allAnswered) {
            setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
            setIsAlertOpen(true);
            return;
        }

        onSubmit();
    };

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />

            {/* Header Card */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="py-8 px-8 text-white">
                    <h1 className="text-3xl font-bold mb-4">
                        แบบสอบถามการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2{" "}
                        <br />
                        โดยผู้ป่วยเป็นคนรายงาน
                    </h1>
                    <p className="text-blue-100 text-lg leading-relaxed max-w-4xl opacity-90">
                        คำชี้แจง
                        ข้อคำถามในแต่ละข้อต่อไปนี้เป็นข้อความเกี่ยวกับประสบการณ์อย่างใดอย่างหนึ่งของ
                        ท่านในช่วง 1 เดือน ที่ผ่านมา
                        ให้ท่านพิจารณาข้อความในแต่ละข้อ โดยประเมินว่าข้อความนั้น
                        ตรงกับตัว ท่านเองหรือไม่
                        แล้วโปรดเลือกคะแนนที่ตรงกับตัวเลขที่ท่านเลือก ที่
                        ท่านมีความคิดเห็นว่าเหมาะสมและเป็นจริงตรงตามความคิดเห็นของท่านมากที่สุด
                        โดย เลือกตอบเพียงตัวเลือกเดียว คำตอบที่ได้จะไม่ถือว่าถูก
                        หรือผิด กรุณาตอบข้อคำถามทุกข้อ
                        ตามความเป็นจริงเพื่อประโยชน์ของตัวท่านเอง
                    </p>
                </div>
            </div>

            {/* Sections Loop */}
            <div className="space-y-8">
                {data.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                        <div className="p-8 space-y-8">
                            <div className="border-b border-gray-100 pb-6">
                                <h2 className="text-2xl font-bold text-indigo-900 mb-3">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed bg-gray-50/80 p-4 rounded-xl border border-gray-100/50">
                                    {section.description}
                                </p>

                                {/* Info Block (Scoring Guide & Image) */}
                                <div className="mt-8 space-y-6">
                                    <ul className="space-y-3 bg-indigo-50/30 p-6 rounded-2xl text-gray-700 border border-indigo-50/50">
                                        {section.scoringCriteria?.map(
                                            (criteria, index) => (
                                                <li
                                                    key={index}
                                                    className="flex gap-2"
                                                >
                                                    <span className="font-semibold text-indigo-600 min-w-20">
                                                        คะแนน {index + 1}
                                                    </span>
                                                    <span>
                                                        =
                                                        {criteria
                                                            .split("=")
                                                            .slice(1)
                                                            .join("=")}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-4xl mx-auto border border-gray-100 shadow-inner">
                                        <Image
                                            src={`/sec${sectionIndex + 1}.png`}
                                            alt={`Section ${
                                                sectionIndex + 1
                                            } Graph`}
                                            width={700}
                                            height={300}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {section.questions.map((q) => (
                                    <div
                                        key={q.id}
                                        className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                                            Object.keys(answers).length > 0 &&
                                            !answers[q.id]
                                                ? "bg-red-50 border border-red-200"
                                                : "bg-white border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/10"
                                        }`}
                                    >
                                        <div className="flex flex-col gap-8">
                                            <div className="flex gap-5 items-start">
                                                <div className="flex-none pt-1">
                                                    <span className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                        {q.id}
                                                    </span>
                                                </div>
                                                <p className="text-gray-800 font-medium text-xl leading-relaxed">
                                                    {q.text}
                                                </p>
                                            </div>

                                            <div className="px-2 sm:px-8 pb-4">
                                                <div className="relative py-4">
                                                    <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-100 rounded-full -translate-y-1/2 shadow-inner"></div>

                                                    <style jsx>{`
                                                        input[type="range"] {
                                                            -webkit-appearance: none;
                                                            width: 100%;
                                                            background: transparent;
                                                        }
                                                        input[type="range"]::-webkit-slider-thumb {
                                                            -webkit-appearance: none;
                                                            height: 32px;
                                                            width: 32px;
                                                            border-radius: 50%;
                                                            background: #ffffff;
                                                            border: 4px solid
                                                                #4f46e5;
                                                            cursor: pointer;
                                                            margin-top: -12px;
                                                            box-shadow: 0 4px
                                                                    6px -1px rgba(0, 0, 0, 0.1),
                                                                0 2px 4px -1px rgba(0, 0, 0, 0.06);
                                                            transition: all 0.2s;
                                                        }
                                                        input[type="range"]::-webkit-slider-thumb:hover {
                                                            transform: scale(
                                                                1.1
                                                            );
                                                            box-shadow: 0 10px
                                                                15px -3px rgba(79, 70, 229, 0.3);
                                                        }
                                                        input[type="range"]::-webkit-slider-runnable-track {
                                                            width: 100%;
                                                            height: 8px;
                                                            cursor: pointer;
                                                            background: transparent;
                                                        }
                                                        input[type="range"]:focus {
                                                            outline: none;
                                                        }
                                                    `}</style>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="6"
                                                        step="1"
                                                        value={
                                                            answers[q.id] || 0
                                                        }
                                                        onChange={(e) =>
                                                            handleAnswer(
                                                                q.id,
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className="w-full relative z-10 opacity-0 hover:opacity-100 transition-opacity" // Trick to let custom thumb show but track be visible? No, opacity 0 hides thumb too.
                                                        // Actually, keeping standard implementation from before but tweaked CSS slightly
                                                        style={{ opacity: 1 }}
                                                    />
                                                    {/* Reverting opacity input to visible because the style tag handles appearance */}

                                                    {/* Tick Marks */}
                                                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1 pointer-events-none w-full">
                                                        {[1, 2, 3, 4, 5, 6].map(
                                                            (tick) => (
                                                                <div
                                                                    key={tick}
                                                                    className={`w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${
                                                                        answers[
                                                                            q.id
                                                                        ] >=
                                                                        tick
                                                                            ? "bg-indigo-500 scale-110"
                                                                            : "bg-gray-200"
                                                                    } z-0`}
                                                                ></div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between mt-6 text-sm font-medium">
                                                    <span className="text-gray-400">
                                                        1 (น้อยที่สุด)
                                                    </span>
                                                    <div
                                                        className={`flex flex-col items-center transition-all duration-300 ${
                                                            answers[q.id]
                                                                ? "opacity-100 -translate-y-1"
                                                                : "opacity-0"
                                                        }`}
                                                    >
                                                        <span className="text-3xl font-black text-indigo-600">
                                                            {answers[q.id]}
                                                        </span>
                                                        <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                                                            คะแนนที่เลือก
                                                        </span>
                                                    </div>
                                                    <span className="text-gray-400">
                                                        6 (มากที่สุด)
                                                    </span>
                                                </div>

                                                <div className="flex justify-between px-0.5 mt-2">
                                                    {[1, 2, 3, 4, 5, 6].map(
                                                        (num) => (
                                                            <button
                                                                key={num}
                                                                type="button"
                                                                onClick={() =>
                                                                    handleAnswer(
                                                                        q.id,
                                                                        num
                                                                    )
                                                                }
                                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                                                                    answers[
                                                                        q.id
                                                                    ] === num
                                                                        ? "bg-indigo-100 text-indigo-700 font-bold shadow-inner ring-2 ring-indigo-500 ring-offset-2"
                                                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                                                }`}
                                                            >
                                                                {num}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 font-bold transition-all flex items-center gap-3 shadow-sm hover:shadow-md active:scale-95"
                >
                    <ChevronLeft size={24} />
                    <span className="text-lg">ย้อนกลับ</span>
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-10 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all flex items-center gap-3 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                >
                    <span className="text-lg">บันทึกข้อมูล</span>
                    <Check size={24} />
                </button>
            </div>
        </div>
    );
}
