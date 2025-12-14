"use client";

import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import AlertModal from "@/components/AlertModal";
import { QuestionSlider } from "@/components/ui/form";
import {
    Part4Section,
    centralGroups,
    centralUISteps,
    centralNegativeQuestions,
    getRegionConfig,
} from "@/config/part4Data";

interface SectionFourFormProps {
    data: Part4Section[];
    answers: Record<number, number>;
    onAnswer: (questionId: number, score: number) => void;
    onBack: () => void;
    onSubmit: () => void | Promise<void>;
    isSubmitting?: boolean;
    region?: string;
    recommendations?: Record<string, any>;
    onRecommendationsChange?: (recs: Record<string, any>) => void;
    additionalInfo?: Record<string, any>;
    onAdditionalInfoChange?: (info: Record<string, any>) => void;
    respondentName?: string;
    interviewerName?: string;
}

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
    respondentName,
    interviewerName,
    isSubmitting: isSubmittingProp = false,
}: SectionFourFormProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [localIsSubmitting, setLocalIsSubmitting] = useState(false);

    const isSubmitting = isSubmittingProp || localIsSubmitting;

    const isCentral = region === "central";

    const handleAnswer = (questionId: number, score: number) => {
        onAnswer(questionId, score);
    };

    const handleAdditionalInfoChange = (key: string, value: any) => {
        if (onAdditionalInfoChange) {
            onAdditionalInfoChange({ ...additionalInfo, [key]: value });
        }
    };

    const getGroupAverage = (questionIds: number[]) => {
        if (questionIds.length === 0) return 0;
        const sum = questionIds.reduce((acc, id) => {
            let score = answers[id] || 0;
            if (centralNegativeQuestions.includes(id) && score > 0) {
                score = 7 - score;
            }
            return acc + score;
        }, 0);
        return Math.round(sum / questionIds.length);
    };

    const validateCurrentStep = () => {
        if (!isCentral) return true;

        const currentUIStep = centralUISteps[currentStep];
        for (const qId of currentUIStep.questions) {
            if (!answers[qId]) {
                return false;
            }
        }

        // Conditional Check for Group 2 (Questions 2-3) if in this step
        if (currentUIStep.containedGroups.includes(2)) {
            const group2Avg = getGroupAverage([2, 3]);
            if (group2Avg > 0 && group2Avg <= 2) {
                if (!additionalInfo.movementLimit && !additionalInfo.tired) {
                    return false;
                }
            }
        }

        // Conditional Check for Group 9 (Questions 24-26) if in this step
        if (currentUIStep.containedGroups.includes(9)) {
            const group9Avg = getGroupAverage([24, 25, 26]);
            if (group9Avg > 0 && group9Avg <= 2) {
                if (
                    !additionalInfo.q9Topic ||
                    additionalInfo.q9Topic.trim() === ""
                ) {
                    return false;
                }
            }
        }

        return true;
    };

    const processStepLogic = () => {
        if (!isCentral || !onRecommendationsChange) return;

        const currentUIStep = centralUISteps[currentStep];
        let newRecs = { ...recommendations };

        // Process all analytic groups contained in this UI step
        currentUIStep.containedGroups.forEach((groupId: number) => {
            const analyticGroup = centralGroups.find((g) => g.id === groupId);
            if (!analyticGroup) return;

            let action = "";
            let relatedUnit = "";
            const avgScore = getGroupAverage(analyticGroup.questions);

            let criteria = "";
            if (avgScore <= 2) criteria = "1-2";
            else if (avgScore === 3) criteria = "3";
            else criteria = "4-6";

            // Reuse existing logic for actions/units
            if (criteria === "4-6") {
                action = "ติดตามตามรอบ";
                switch (analyticGroup.id) {
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
                switch (analyticGroup.id) {
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
                switch (analyticGroup.id) {
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
                        action =
                            "ถามเพิ่ม: ต้องการรู้เรื่องใดเพิ่มเติม แล้วส่ง Manager";
                        relatedUnit = "ทีมบริการ";
                        break;
                    case 10:
                        action = "ประเมินเพื่อส่งเข้า Health Literacy Program";
                        relatedUnit = "ทีม HL";
                        break;
                }
            }

            newRecs[`step_${analyticGroup.id}`] = {
                id: analyticGroup.id,
                dimension: analyticGroup.dimension,
                questionsLabel: analyticGroup.questionsLabel,
                label: analyticGroup.label,
                criteria: criteria,
                averageScore: avgScore,
                action: action,
                relatedUnit: relatedUnit,
                additionalInfo:
                    avgScore <= 2
                        ? analyticGroup.id === 2
                            ? {
                                  movementLimit: additionalInfo.movementLimit,
                                  tired: additionalInfo.tired,
                              }
                            : analyticGroup.id === 9
                            ? { topic: additionalInfo.q9Topic }
                            : null
                        : null,
            };
        });

        onRecommendationsChange(newRecs);
    };

    const handleNext = () => {
        if (isCentral) {
            // Check if we are on the last question step
            const isLastQuestionStep =
                currentStep === centralUISteps.length - 1;

            if (isLastQuestionStep) {
                if (!validateCurrentStep()) {
                    setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
                    setIsAlertOpen(true);
                    return;
                }

                // Process logic for the last step
                processStepLogic();

                // Show confirmation modal
                setShowConfirmModal(true);
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
        <QuestionSlider
            key={q.id}
            id={q.id}
            text={q.text}
            value={answers[q.id]}
            onChange={(score) => handleAnswer(q.id, score)}
        />
    );

    const handleConfirmSubmit = async () => {
        if (isSubmitting) return;

        // Optimistically set local loading
        setLocalIsSubmitting(true);

        try {
            await onSubmit();
        } catch (error) {
            console.error("Error submitting:", error);
            // Reset local
            setLocalIsSubmitting(false);

            setAlertMessage(
                "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง (" +
                    (error as Error).message +
                    ")"
            );
            setIsAlertOpen(true);
        }
    };

    if (isCentral) {
        const currentUIStep = centralUISteps[currentStep];
        const displayQuestions = data
            .flatMap((s) => s.questions)
            .filter((q) => currentUIStep.questions.includes(q.id));

        // Calculate conditional checks for display
        // Show extra questions ONLY when ALL questions in group have score = 1 (average = 1)
        let showGroup2Extra = false;
        let showGroup9Extra = false;

        if (currentUIStep.containedGroups.includes(2)) {
            const avg = getGroupAverage([2, 3]);
            showGroup2Extra = avg === 1;
        }
        if (currentUIStep.containedGroups.includes(9)) {
            const avg = getGroupAverage([24, 25, 26]);
            showGroup9Extra = avg === 1;
        }

        return (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
                <AlertModal
                    isOpen={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    message={alertMessage}
                />

                {/* Confirmation Modal */}
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {isSubmitting ? (
                                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Check size={32} />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {isSubmitting
                                        ? "กำลังส่งข้อมูล..."
                                        : "ยืนยันการส่งแบบสอบถาม?"}
                                </h3>
                                <p className="text-gray-500">
                                    {isSubmitting
                                        ? "กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูลของท่าน"
                                        : "ท่านได้ทำแบบสอบถามครบถ้วนแล้ว ต้องการส่งข้อมูลเลยหรือไม่"}
                                </p>
                                {!isSubmitting && (
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() =>
                                                setShowConfirmModal(false)
                                            }
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors"
                                            disabled={isSubmitting}
                                        >
                                            กลับไปแก้ไข
                                        </button>
                                        <button
                                            onClick={handleConfirmSubmit}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-blue-200 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? "กำลังส่ง..."
                                                : "ยืนยันส่งข้อมูล"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div className="flex-1 w-full md:mr-4">
                            <span className="text-xl font-bold text-blue-600 tracking-wide uppercase whitespace-pre-line block">
                                {currentUIStep.title}
                            </span>
                            <div className="text-gray-600 mt-2 text-lg whitespace-pre-line bg-gray-50 p-4 rounded-lg w-full">
                                {currentUIStep.description}
                            </div>
                        </div>
                        <span className="self-end md:self-start text-sm font-medium text-gray-500 whitespace-nowrap bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                            ขั้นตอนที่ {currentStep + 1} /{" "}
                            {centralUISteps.length}
                        </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{
                                width: `${
                                    ((currentStep + 1) /
                                        centralUISteps.length) *
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
                            ข้อมูลเพิ่มเติม (เนื่องจากผลลัพธ์ต่ำ)
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
                            ต้องการทราบเรื่องใดเพิ่มเติม:
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

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                {isSubmitting ? (
                                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Check size={32} />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {isSubmitting
                                    ? "กำลังส่งข้อมูล..."
                                    : "ยืนยันการส่งแบบสอบถาม?"}
                            </h3>
                            <p className="text-gray-500">
                                {isSubmitting
                                    ? "กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูลของท่าน"
                                    : "ท่านได้ทำแบบสอบถามครบถ้วนแล้ว ต้องการส่งข้อมูลเลยหรือไม่"}
                            </p>
                            {!isSubmitting && (
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() =>
                                            setShowConfirmModal(false)
                                        }
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        กลับไปแก้ไข
                                    </button>
                                    <button
                                        onClick={handleConfirmSubmit}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-blue-200 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "กำลังส่ง..."
                                            : "ยืนยันส่งข้อมูล"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

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
