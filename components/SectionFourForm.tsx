"use client";

import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import AlertModal from "@/components/AlertModal";
import { Part4Section } from "@/config/part4Data";

interface SectionFourFormProps {
    data: Part4Section[];
    answers: Record<number, number>;
    onAnswer: (questionId: number, score: number) => void;
    onBack: () => void;
    onSubmit: () => void;
    region?: string;
    recommendations?: Record<string, any>;
    onRecommendationsChange?: (recs: Record<string, any>) => void;
    additionalInfo?: Record<string, any>;
    onAdditionalInfoChange?: (info: Record<string, any>) => void;
}

// Group definitions for Central region logic
const CENTRAL_GROUPS = [
    {
        id: 1,
        questions: [1],
        label: "ข้อที่ 1\nความสามารถทำกิจวัตรประจำวัน", // Adjusted label for display
        questionsLabel: "1",
        dimension: "การทำงาน\nของร่างกาย",
    },
    {
        id: 2,
        questions: [2, 3],
        label: "ข้อที่ 2-3\nการเคลื่อนไหว / ความทนทาน",
        questionsLabel: "2-3",
        dimension: "การทำงาน\nของร่างกาย",
    },
    {
        id: 3,
        questions: [4, 5, 6, 7],
        label: "ข้อที่ 4-7\nความรุนแรงของอาการ",
        questionsLabel: "4-7",
        dimension: "อาการของโรค",
    },
    {
        id: 4,
        questions: [8, 9, 10],
        label: "ข้อที่ 8-10\nความกังวล/ผลกระทบทางใจ",
        questionsLabel: "8-10",
        dimension: "สุขภาพจิตใจ",
    },
    {
        id: 5,
        questions: [11, 12, 14, 16],
        label: "ข้อที่ 11, 12, 14, 16\nการจัดการโรค/พฤติกรรมสุขภาพ",
        questionsLabel: "11,12,14,16",
        dimension: "การดูแลตนเอง",
    },
    {
        id: 6,
        questions: [13, 15],
        label: "ข้อที่ 13, 15\nการตัดสินใจ/การรับมือ",
        questionsLabel: "13,15",
        dimension: "การดูแลตนเอง",
    },
    {
        id: 7,
        questions: [17, 18, 19, 20],
        label: "ข้อที่ 17-20\nบทบาททางสังคม/ความเครียด",
        questionsLabel: "17-20",
        dimension: "สังคม",
    },
    {
        id: 8,
        questions: [21, 22, 23],
        label: "ข้อที่ 21-23\nการประเมินสุขภาพตนเอง",
        questionsLabel: "21-23",
        dimension: "สุขภาพโดยรวม",
    },
    {
        id: 9,
        questions: [24, 25, 26],
        label: "ข้อที่ 24-26\nความเข้าใจ/ข้อมูลการรักษา",
        questionsLabel: "24-26",
        dimension: "ความพึงพอใจ",
    },
    {
        id: 10,
        questions: [27, 28, 29],
        label: "ข้อที่ 27-29\nการตัดสินใจ/ความยืดหยุ่น",
        questionsLabel: "27-29",
        dimension: "ความพึงพอใจ",
    },
];

export default function SectionFourForm({
    data,
    answers,
    onAnswer,
    onBack,
    onSubmit,
    region,
    recommendations = {},
    onRecommendationsChange,
    additionalInfo = {},
    onAdditionalInfoChange,
}: SectionFourFormProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [currentStep, setCurrentStep] = useState(0);

    const isCentral = region === "central";
    const isSummaryStep = isCentral && currentStep === CENTRAL_GROUPS.length;

    const handleAnswer = (questionId: number, score: number) => {
        onAnswer(questionId, score);
    };

    const handleAdditionalInfoChange = (key: string, value: any) => {
        if (onAdditionalInfoChange) {
            onAdditionalInfoChange({ ...additionalInfo, [key]: value });
        }
    };

    const NEGATIVE_QUESTIONS = [4, 5, 6, 7, 11, 12, 13, 14, 15, 16];

    const getGroupAverage = (questionIds: number[]) => {
        if (questionIds.length === 0) return 0;
        const sum = questionIds.reduce((acc, id) => {
            let score = answers[id] || 0;
            if (NEGATIVE_QUESTIONS.includes(id) && score > 0) {
                score = 7 - score;
            }
            return acc + score;
        }, 0);
        return Math.round(sum / questionIds.length);
    };

    const validateCurrentStep = () => {
        if (!isCentral) return true;
        if (isSummaryStep) return true;

        const currentGroup = CENTRAL_GROUPS[currentStep];
        for (const qId of currentGroup.questions) {
            if (!answers[qId]) {
                return false;
            }
        }

        const avgScore = getGroupAverage(currentGroup.questions);

        // Validation for extra inputs (Scores 1-2)
        if (avgScore <= 2) {
            if (currentGroup.id === 9) {
                // Group 9 (Q24-26)
                if (
                    !additionalInfo.q9Topic ||
                    additionalInfo.q9Topic.trim() === ""
                ) {
                    return false; // Require topic input
                }
            }
        }

        return true;
    };

    const processStepLogic = () => {
        if (!isCentral || !onRecommendationsChange || isSummaryStep) return;

        const currentGroup = CENTRAL_GROUPS[currentStep];
        let newRecs = { ...recommendations };
        let action = "";
        let relatedUnit = "";

        const avgScore = getGroupAverage(currentGroup.questions);

        let criteria = "";
        if (avgScore <= 2) criteria = "1-2";
        else if (avgScore === 3) criteria = "3";
        else criteria = "4-6";

        if (criteria === "4-6") {
            action = "ติดตามตามรอบ";
            switch (currentGroup.id) {
                case 1:
                    relatedUnit = "พยาบาล / LTC";
                    break;
                case 2:
                    relatedUnit = "นักกายภาพ/พยาบาล";
                    break;
                case 3:
                    relatedUnit = "พยาบาล/แพทย์";
                    break;
                case 4:
                    relatedUnit = "ทีม Mental Health";
                    break;
                case 5:
                    relatedUnit = "ทีม HL";
                    break;
                case 6:
                    relatedUnit = "พยาบาล / แพทย์";
                    break;
                case 7:
                    relatedUnit = "แพทย์/ Mental Health";
                    break;
                case 8:
                    relatedUnit = "แพทย์";
                    break;
                case 9:
                    relatedUnit = "ทีมบริการ";
                    break;
                case 10:
                    relatedUnit = "ทีม HL";
                    break;
            }
        } else if (criteria === "3") {
            action = "เฝ้าระวัง";
            switch (currentGroup.id) {
                case 1:
                    relatedUnit = "พยาบาล / LTC";
                    break;
                case 2:
                    relatedUnit = "นักกายภาพ/พยาบาล";
                    break;
                case 3:
                    relatedUnit = "พยาบาล/แพทย์";
                    break;
                case 4:
                    relatedUnit = "ทีม Mental Health";
                    break;
                case 5:
                    relatedUnit = "ทีม HL";
                    break;
                case 6:
                    relatedUnit = "พยาบาล / แพทย์";
                    break;
                case 7:
                    relatedUnit = "แพทย์/ Mental Health";
                    break;
                case 8:
                    relatedUnit = "แพทย์";
                    break;
                case 9:
                    relatedUnit = "ทีมบริการ";
                    break;
                case 10:
                    relatedUnit = "ทีม HL";
                    break;
            }
        } else {
            // Criteria 1-2
            switch (currentGroup.id) {
                case 1:
                    action = "ส่ง Manager เพื่อลงทะเบียน LTC";
                    relatedUnit = "พยาบาล / LTC";
                    break;
                case 2:
                    let actions = [];
                    if (additionalInfo.movementLimit)
                        actions.push("ส่งต่อนักกายภาพ");
                    if (additionalInfo.tired)
                        actions.push("ส่งต่อ Manager หรือ แพทย์");
                    if (actions.length === 0) actions.push("ถามเพิ่ม");
                    action = actions.join(", ");
                    relatedUnit = "นักกายภาพ/พยาบาล";
                    break;
                case 3:
                    action = "ส่ง Manager";
                    relatedUnit = "พยาบาล/แพทย์";
                    break;
                case 4:
                    action = "Consult ทีม Mental Health";
                    relatedUnit = "ทีม Mental Health";
                    break;
                case 5:
                    action = "ส่งเข้าร่วม Health Literacy Program";
                    relatedUnit = "ทีม HL";
                    break;
                case 6:
                    action = "ส่งพบ Manager";
                    relatedUnit = "พยาบาล / แพทย์";
                    break;
                case 7:
                    action =
                        "ส่งพบ Manager หรือ ทีม Mental Health เพื่อประเมินภาวะเครียด";
                    relatedUnit = "แพทย์/ Mental Health";
                    break;
                case 8:
                    action = "พบ Manager";
                    relatedUnit = "แพทย์";
                    break;
                case 9:
                    action = `ถามเพิ่ม: ต้องการรู้เรื่องใดเพิ่มเติม (${
                        additionalInfo.q9Topic || "-"
                    }) แล้วส่ง Manager`;
                    relatedUnit = "ทีมบริการ";
                    break;
                case 10:
                    action = "ประเมินเพื่อส่งเข้า Health Literacy Program";
                    relatedUnit = "ทีม HL";
                    break;
            }
        }

        newRecs[`step_${currentGroup.id}`] = {
            id: currentGroup.id,
            dimension: currentGroup.dimension,
            questionsLabel: currentGroup.questionsLabel,
            label: currentGroup.label,
            criteria: criteria,
            averageScore: avgScore,
            action: action,
            relatedUnit: relatedUnit,
            additionalInfo:
                avgScore <= 2
                    ? currentGroup.id === 2
                        ? {
                              movementLimit: additionalInfo.movementLimit,
                              tired: additionalInfo.tired,
                          }
                        : currentGroup.id === 9
                        ? {
                              topic: additionalInfo.q9Topic,
                          }
                        : null
                    : null,
        };

        onRecommendationsChange(newRecs);
    };

    const handleNext = () => {
        if (isCentral) {
            if (isSummaryStep) {
                onSubmit();
                return;
            }

            if (!validateCurrentStep()) {
                setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
                setIsAlertOpen(true);
                return;
            }

            processStepLogic();

            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Standard validation
            let allAnswered = true;
            for (const section of data) {
                for (const q of section.questions) {
                    if (!answers[q.id]) {
                        allAnswered = false;
                    }
                }
            }
            if (!allAnswered) {
                setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
                setIsAlertOpen(true);
                return;
            }
            onSubmit();
        }
    };

    const handleBack = () => {
        if (isCentral && currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onBack();
        }
    };

    const renderQuestion = (q: { id: number; text: string }) => (
        <div
            key={q.id}
            className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                Object.keys(answers).length > 0 && !answers[q.id]
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
                                border: 4px solid #4f46e5;
                                cursor: pointer;
                                margin-top: -12px;
                                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
                                transition: all 0.2s;
                            }
                            input[type="range"]::-webkit-slider-thumb:hover {
                                transform: scale(1.1);
                                box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
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
                            value={answers[q.id] || 0}
                            onChange={(e) =>
                                handleAnswer(q.id, parseInt(e.target.value))
                            }
                            className="w-full relative z-10 opacity-0 hover:opacity-100 transition-opacity"
                            style={{ opacity: 1 }}
                        />
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1 pointer-events-none w-full">
                            {[1, 2, 3, 4, 5, 6].map((tick) => (
                                <div
                                    key={tick}
                                    className={`w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${
                                        answers[q.id] >= tick
                                            ? "bg-indigo-500 scale-110"
                                            : "bg-gray-200"
                                    } z-0`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 text-sm font-medium">
                        <span className="text-gray-400">1 (น้อยที่สุด)</span>
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
                        <span className="text-gray-400">6 (มากที่สุด)</span>
                    </div>

                    <div className="flex justify-between px-0.5 mt-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => handleAnswer(q.id, num)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                                    answers[q.id] === num
                                        ? "bg-indigo-100 text-indigo-700 font-bold shadow-inner ring-2 ring-indigo-500 ring-offset-2"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (isSummaryStep && recommendations) {
        // Calculate rowspans
        const dimensionCounts: Record<string, number> = {};
        CENTRAL_GROUPS.forEach((g) => {
            dimensionCounts[g.dimension] =
                (dimensionCounts[g.dimension] || 0) + 1;
        });

        // Helper to track which dimension has been rendered
        const renderedDimensions: Record<string, boolean> = {};

        return (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                            <Check size={28} />
                        </span>
                        สรุปผลการประเมิน
                    </h2>

                    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-xs">
                        <table className="w-full text-left text-sm text-gray-600 border-collapse">
                            <thead className="bg-gray-50 text-gray-900 font-semibold text-center">
                                <tr>
                                    <th className="p-4 border-b border-gray-200 w-1/5">
                                        มิติ
                                    </th>
                                    <th className="p-4 border-b border-gray-200 w-[10%]">
                                        ข้อที่
                                    </th>
                                    <th className="p-4 border-b border-gray-200 w-2/5">
                                        ผลการประเมิน
                                    </th>
                                    <th className="p-4 border-b border-gray-200 w-1/5">
                                        หน่วยงานที่เกี่ยวข้อง
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {CENTRAL_GROUPS.map((group, index) => {
                                    const rec =
                                        recommendations[`step_${group.id}`];
                                    if (!rec) return null;

                                    const isActionNeeded =
                                        rec.criteria === "1-2";
                                    const isWatch = rec.criteria === "3";
                                    const count =
                                        dimensionCounts[group.dimension];
                                    const isFirstOfDimension =
                                        !renderedDimensions[group.dimension];

                                    if (isFirstOfDimension) {
                                        renderedDimensions[group.dimension] =
                                            true;
                                    }

                                    return (
                                        <tr
                                            key={group.id}
                                            className="hover:bg-gray-50/30"
                                        >
                                            {isFirstOfDimension && (
                                                <td
                                                    className="p-4 align-top font-bold text-gray-900 bg-gray-50/50 border-r border-gray-100"
                                                    rowSpan={count}
                                                >
                                                    <div className="whitespace-pre-line">
                                                        {group.dimension}
                                                    </div>
                                                </td>
                                            )}
                                            <td className="p-4 align-top text-center font-medium border-r border-gray-100 text-indigo-600">
                                                {group.questionsLabel}
                                            </td>
                                            <td className="p-4 align-top border-r border-gray-100">
                                                <div
                                                    className={`text-base ${
                                                        isActionNeeded
                                                            ? "text-red-600 font-bold"
                                                            : isWatch
                                                            ? "text-orange-600 font-semibold"
                                                            : "text-green-700 font-medium"
                                                    }`}
                                                >
                                                    {rec.action}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top text-gray-800">
                                                {rec.relatedUnit}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6">
                    <button
                        onClick={handleBack}
                        className="px-8 py-3 bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold"
                    >
                        แก้ไขข้อมูล
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-10 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 active:scale-95"
                    >
                        <span>ยืนยันและส่งแบบสอบถาม</span>
                        <Check size={24} />
                    </button>
                </div>
            </div>
        );
    }

    if (isCentral) {
        const currentGroup = CENTRAL_GROUPS[currentStep];
        const displayQuestions = data
            .flatMap((s) => s.questions)
            .filter((q) => currentGroup.questions.includes(q.id));
        const avgScore = getGroupAverage(currentGroup.questions);

        const showGroup2Extra = currentGroup.id === 2 && avgScore <= 2;
        const showGroup9Extra = currentGroup.id === 9 && avgScore <= 2;

        return (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
                <AlertModal
                    isOpen={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    message={alertMessage}
                />

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <span className="text-sm font-bold text-blue-600 tracking-wide uppercase whitespace-pre-line">
                                {currentGroup.dimension}
                            </span>
                            <h2 className="text-xl font-bold text-gray-800 mt-1">
                                {currentGroup.label.split("\n")[1] ||
                                    currentGroup.label}
                            </h2>
                        </div>
                        <span className="text-sm font-medium text-gray-500">
                            ขั้นตอนที่ {currentStep + 1} /{" "}
                            {CENTRAL_GROUPS.length}
                        </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{
                                width: `${
                                    ((currentStep + 1) /
                                        CENTRAL_GROUPS.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {displayQuestions.map((q) => renderQuestion(q))}
                </div>

                {showGroup2Extra && (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 animate-in fade-in">
                        <h3 className="text-lg font-bold text-orange-800 mb-4">
                            ข้อมูลเพิ่มเติม (เนื่องจากคะแนนน้อย)
                        </h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={
                                        additionalInfo?.movementLimit || false
                                    }
                                    onChange={(e) =>
                                        handleAdditionalInfoChange(
                                            "movementLimit",
                                            e.target.checked
                                        )
                                    }
                                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                                />
                                <span className="text-gray-800">
                                    มีข้อจำกัดด้านการเคลื่อนไหว
                                </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={additionalInfo?.tired || false}
                                    onChange={(e) =>
                                        handleAdditionalInfoChange(
                                            "tired",
                                            e.target.checked
                                        )
                                    }
                                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                                />
                                <span className="text-gray-800">
                                    ออกแรงแล้วเหนื่อย
                                </span>
                            </label>
                        </div>
                    </div>
                )}

                {showGroup9Extra && (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 animate-in fade-in">
                        <h3 className="text-lg font-bold text-orange-800 mb-2">
                            ข้อมูลเพิ่มเติม
                        </h3>
                        <label className="block text-gray-700 mb-2">
                            ต้องการรู้เรื่องใดเพิ่มเติม:
                        </label>
                        <textarea
                            value={additionalInfo?.q9Topic || ""}
                            onChange={(e) =>
                                handleAdditionalInfoChange(
                                    "q9Topic",
                                    e.target.value
                                )
                            }
                            className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            rows={3}
                            placeholder="ระบุเรื่องที่ต้องการทราบ..."
                        />
                    </div>
                )}

                <div className="flex justify-between items-center pt-6">
                    <button
                        onClick={handleBack}
                        className="px-8 py-3 bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold"
                    >
                        ย้อนกลับ
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        ถัดไป
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />

            <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="py-8 px-8 text-white">
                    <h1 className="text-3xl font-bold mb-4">
                        แบบสอบถามการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2{" "}
                        <br />
                        โดยผู้ป่วยเป็นคนรายงาน
                    </h1>
                </div>
            </div>

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
                            </div>
                            <div className="space-y-4">
                                {section.questions.map((q) =>
                                    renderQuestion(q)
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 font-bold transition-all flex items-center gap-3 shadow-sm hover:shadow-md active:scale-95"
                >
                    <ChevronLeft size={24} />
                    <span className="text-lg">ย้อนกลับ</span>
                </button>
                <button
                    onClick={handleNext}
                    className="px-10 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all flex items-center gap-3 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                >
                    <span className="text-lg">บันทึกข้อมูล</span>
                    <Check size={24} />
                </button>
            </div>
        </div>
    );
}
