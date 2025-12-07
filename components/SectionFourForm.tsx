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
                                        className={`group p-4 sm:p-6 rounded-xl transition-all hover:bg-indigo-50/50 ${
                                            Object.keys(answers).length > 0 &&
                                            !answers[q.id]
                                                ? "bg-red-50 border border-red-100"
                                                : index % 2 === 0
                                                ? "bg-white border border-gray-100"
                                                : "bg-gray-50/50 border border-transparent"
                                        }`}
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                            {/* ID and Text */}
                                            <div className="lg:col-span-7 flex gap-4">
                                                <div className="flex-none">
                                                    <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm group-hover:bg-white group-hover:text-indigo-600 transition-colors shadow-xs">
                                                        {q.id}
                                                    </span>
                                                </div>
                                                <p className="text-gray-800 font-medium pt-1 leading-relaxed">
                                                    {q.text}
                                                </p>
                                            </div>

                                            {/* Radio Options */}
                                            <div className="lg:col-span-5">
                                                <div className="flex justify-between items-center gap-1 sm:gap-2 px-1">
                                                    {[1, 2, 3, 4, 5, 6].map(
                                                        (score) => (
                                                            <label
                                                                key={score}
                                                                className="relative cursor-pointer flex flex-col items-center gap-1 group/radio"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`q_${q.id}`}
                                                                    value={
                                                                        score
                                                                    }
                                                                    checked={
                                                                        answers[
                                                                            q.id
                                                                        ] ===
                                                                        score
                                                                    }
                                                                    onChange={() =>
                                                                        handleAnswer(
                                                                            q.id,
                                                                            score
                                                                        )
                                                                    }
                                                                    className="peer sr-only"
                                                                />
                                                                <div
                                                                    className={`
                                                                w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-200
                                                                ${
                                                                    answers[
                                                                        q.id
                                                                    ] === score
                                                                        ? "border-indigo-600 bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-indigo-200"
                                                                        : "border-gray-200 text-gray-400 bg-white hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50"
                                                                }
                                                            `}
                                                                >
                                                                    {score}
                                                                </div>
                                                                <div
                                                                    className={`
                                                                text-[10px] font-medium transition-opacity duration-200 absolute -bottom-5
                                                                ${
                                                                    answers[
                                                                        q.id
                                                                    ] === score
                                                                        ? "text-indigo-600 opacity-100"
                                                                        : "text-gray-400 opacity-0 group-hover/radio:opacity-100"
                                                                }
                                                            `}
                                                                >
                                                                    {score === 1
                                                                        ? "น้อยที่สุด"
                                                                        : score ===
                                                                          6
                                                                        ? "มากที่สุด"
                                                                        : ""}
                                                                </div>
                                                            </label>
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
