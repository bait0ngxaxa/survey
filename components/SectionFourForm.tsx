"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import AlertModal from "@/components/AlertModal";
import { Part4Section } from "@/config/part4Data";

interface SectionFourFormProps {
    data: Part4Section[];
    onBack: () => void;
    onSubmit: () => void;
}

export default function SectionFourForm({
    data,
    onBack,
    onSubmit,
}: SectionFourFormProps) {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleAnswer = (questionId: number, score: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: score,
        }));
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
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-indigo-900 to-purple-800 py-10 px-8 text-white">
                    <h1 className="text-3xl font-bold mb-4">
                        แบบประเมินความถี่อาการ (ส่วนที่ 4)
                    </h1>
                    <p className="text-purple-100 text-lg leading-relaxed max-w-4xl opacity-90">
                        คำชี้แจง:
                        โปรดทำเครื่องหมายที่ตรงกับตัวเลขที่ท่านเลือกที่ท่านมีความคิดเห็นว่าเหมาะสม
                        และเป็นจริงตรงตามความคิดเห็นของท่านมากที่สุด (1-6)
                    </p>
                </div>

                <div className="p-8 space-y-12">
                    {data.map((section) => (
                        <div key={section.id} className="space-y-6">
                            <div className="border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    {section.description}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {section.questions.map((q, index) => (
                                    <div
                                        key={q.id}
                                        className={`group p-6 rounded-xl transition-all hover:bg-indigo-50/50 ${
                                            Object.keys(answers).length > 0 &&
                                            !answers[q.id]
                                                ? "bg-red-50 border border-red-100"
                                                : "bg-white border border-gray-100"
                                        }`}
                                    >
                                        <div className="flex flex-col gap-6">
                                            {/* ID and Text */}
                                            <div className="flex gap-4 items-start">
                                                <div className="flex-none">
                                                    <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                        {q.id}
                                                    </span>
                                                </div>
                                                <p className="text-gray-800 font-medium pt-1 text-lg">
                                                    {q.text}
                                                </p>
                                            </div>

                                            {/* Slider Input */}
                                            <div className="px-2 sm:px-6 pt-2 pb-6">
                                                <div className="relative">
                                                    {/* Custom Track Background */}
                                                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"></div>

                                                    {/* Active Track (Visual only - tricky with just CSS, 
                                                        but we can use a gradient or just rely on the thumb position) 
                                                        For simplicity and robustness, we'll stick to a clean native slider 
                                                        with standard accent color in modern browsers or custom styling. 
                                                    */}
                                                    <style jsx>{`
                                                        input[type="range"] {
                                                            -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
                                                            width: 100%; /* Specific width is required for Firefox. */
                                                            background: transparent; /* Otherwise white in Chrome */
                                                        }

                                                        input[type="range"]::-webkit-slider-thumb {
                                                            -webkit-appearance: none;
                                                            height: 24px;
                                                            width: 24px;
                                                            border-radius: 50%;
                                                            background: #4f46e5; /* Indigo-600 */
                                                            cursor: pointer;
                                                            margin-top: -8px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
                                                            box-shadow: 0 0 0
                                                                4px
                                                                rgba(
                                                                    79,
                                                                    70,
                                                                    229,
                                                                    0.2
                                                                );
                                                            transition: all 0.2s;
                                                        }

                                                        input[type="range"]::-webkit-slider-thumb:hover {
                                                            transform: scale(
                                                                1.1
                                                            );
                                                            box-shadow: 0 0 0
                                                                6px
                                                                rgba(
                                                                    79,
                                                                    70,
                                                                    229,
                                                                    0.3
                                                                );
                                                        }

                                                        input[type="range"]::-moz-range-thumb {
                                                            height: 24px;
                                                            width: 24px;
                                                            border: none;
                                                            border-radius: 50%;
                                                            background: #4f46e5;
                                                            cursor: pointer;
                                                            box-shadow: 0 0 0
                                                                4px
                                                                rgba(
                                                                    79,
                                                                    70,
                                                                    229,
                                                                    0.2
                                                                );
                                                        }

                                                        input[type="range"]::-webkit-slider-runnable-track {
                                                            width: 100%;
                                                            height: 8px;
                                                            cursor: pointer;
                                                            background: #e5e7eb;
                                                            border-radius: 9999px;
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
                                                        } // Default to 0 or undefined to show no selection visually if possible, but range usually defaults to middle.
                                                        // Better to control it. If undefined, maybe show 1 but with a different style?
                                                        // Actually, uncontrolled 1-6 is easier, but we need to know if they answered.
                                                        // Let's set value to answers[q.id] || 1, but we need to track "touched" or verify "answers[q.id]" exists.
                                                        // If answers[q.id] is undefined, the slider will be at specific position (usually min).
                                                        // Users might skip it if it looks "filled".
                                                        // Strategy: Initialize with 0 or something off-range?
                                                        // Range input must be a number.
                                                        // Let's rely on the user moving it. Or provide a "No answer" state?
                                                        // Requirement says slider 6 levels.
                                                        // To ensure they actively select, we might want to start at "0" (hidden) or "3.5" (middle).
                                                        // Let's use 0 as "unselected" and make the slider track gray until selected.

                                                        onChange={(e) =>
                                                            handleAnswer(
                                                                q.id,
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className="w-full relative z-10"
                                                    />

                                                    {/* Tick Marks and Labels */}
                                                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1 pointer-events-none w-full">
                                                        {[1, 2, 3, 4, 5, 6].map(
                                                            (tick) => (
                                                                <div
                                                                    key={tick}
                                                                    className={`w-2 h-2 rounded-full ${
                                                                        answers[
                                                                            q.id
                                                                        ] >=
                                                                        tick
                                                                            ? "bg-indigo-400"
                                                                            : "bg-gray-300"
                                                                    } z-0`}
                                                                ></div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between mt-4 text-sm text-gray-500 font-medium">
                                                    <span className="text-gray-400">
                                                        1 (น้อยที่สุด)
                                                    </span>
                                                    <span
                                                        className={`text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 transition-all ${
                                                            answers[q.id]
                                                                ? "opacity-100 transform scale-100"
                                                                : "opacity-0 transform scale-90"
                                                        }`}
                                                    >
                                                        {answers[q.id]}
                                                    </span>
                                                    <span className="text-gray-400">
                                                        6 (มากที่สุด)
                                                    </span>
                                                </div>

                                                {/* Visual Helper for Labels above ticks */}
                                                <div className="flex justify-between px-0.5 mt-1">
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
                                                                className={`w-8 text-center text-xs transition-colors ${
                                                                    answers[
                                                                        q.id
                                                                    ] === num
                                                                        ? "text-indigo-600 font-bold"
                                                                        : "text-gray-400 hover:text-gray-600"
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
                    ))}
                </div>

                {/* Footer Buttons */}
                <div className="p-8 border-t border-gray-100 flex justify-between bg-gray-50">
                    <button
                        onClick={onBack}
                        className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-all flex items-center gap-2"
                    >
                        <ChevronLeft size={20} />
                        ย้อนกลับ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        <Check size={20} />
                        บันทึกข้อมูล
                    </button>
                </div>
            </div>
        </div>
    );
}
