"use client";

import { useState } from "react";
import AlertModal from "@/components/AlertModal";
import ConfirmSubmitModal from "@/components/ConfirmSubmitModal";
import { QuestionSlider, FormNavigation } from "@/components/ui/form";
import {
    useAlert,
    useRecommendations,
    useAsyncSubmit,
    useConfirmModal,
} from "@/hooks";
import { Part4Section, centralUISteps } from "@/config/part4Data";
import { RecommendationsData, AdditionalInfoData } from "@/lib/types";

interface SectionFourFormProps {
    data: Part4Section[];
    answers: Record<number, number>;
    onAnswer: (questionId: number, score: number) => void;
    onBack: () => void;
    onSubmit: () => void | Promise<void>;
    isSubmitting?: boolean;
    region?: string;
    recommendations?: RecommendationsData;
    onRecommendationsChange?: (recs: RecommendationsData) => void;
    additionalInfo?: AdditionalInfoData;
    onAdditionalInfoChange?: (info: AdditionalInfoData) => void;
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
    isSubmitting: isSubmittingProp = false,
}: SectionFourFormProps) {
    const {
        isOpen: isAlertOpen,
        message: alertMessage,
        showAlert,
        closeAlert,
    } = useAlert();
    const {
        isOpen: showConfirmModal,
        open: openConfirmModal,
        close: closeConfirmModal,
    } = useConfirmModal();
    const [currentStep, setCurrentStep] = useState(0);

    const { isSubmitting: localIsSubmitting, execute: executeSubmit } =
        useAsyncSubmit({
            onError: (error) =>
                showAlert(
                    "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง (" +
                        error.message +
                        ")"
                ),
        });

    const isSubmitting = isSubmittingProp || localIsSubmitting;

    const isCentral = region === "central";

    const handleAnswer = (questionId: number, score: number) => {
        onAnswer(questionId, score);
    };

    const handleAdditionalInfoChange = (
        key: string,
        value: boolean | string
    ) => {
        if (onAdditionalInfoChange) {
            onAdditionalInfoChange({ ...additionalInfo, [key]: value });
        }
    };

    const { getGroupAverage, processGroupRecommendations } = useRecommendations(
        {
            answers,
            additionalInfo,
            recommendations,
            onRecommendationsChange,
        }
    );

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
                const q9Topic = additionalInfo.q9Topic;
                if (
                    !q9Topic ||
                    (typeof q9Topic === "string" && q9Topic.trim() === "")
                ) {
                    return false;
                }
            }
        }

        return true;
    };

    const handleNext = () => {
        if (isCentral) {
            // Check if we are on the last question step
            const isLastQuestionStep =
                currentStep === centralUISteps.length - 1;

            if (isLastQuestionStep) {
                if (!validateCurrentStep()) {
                    showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
                    return;
                }

                const currentUIStep = centralUISteps[currentStep];
                processGroupRecommendations(currentUIStep.containedGroups);

                // Show confirmation modal
                openConfirmModal();
                return;
            }

            if (!validateCurrentStep()) {
                showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }

            const currentUIStep = centralUISteps[currentStep];
            processGroupRecommendations(currentUIStep.containedGroups);

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
                showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
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
        await executeSubmit(() => onSubmit() as Promise<void>);
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
                    onClose={closeAlert}
                    message={alertMessage}
                />

                <ConfirmSubmitModal
                    isOpen={showConfirmModal}
                    isSubmitting={isSubmitting}
                    onClose={closeConfirmModal}
                    onConfirm={handleConfirmSubmit}
                />

                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-sky-100/50 border border-slate-100">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <div className="flex-1 w-full md:mr-4">
                            <span className="text-xl font-bold text-sky-600 tracking-wide uppercase whitespace-pre-line block">
                                {currentUIStep.title}
                            </span>
                            <div className="text-slate-600 mt-3 text-lg whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                                {currentUIStep.description}
                            </div>
                        </div>
                        <span className="self-end md:self-start text-sm font-medium text-slate-500 whitespace-nowrap bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                            ขั้นตอนที่ {currentStep + 1} /{" "}
                            {centralUISteps.length}
                        </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-sky-500 transition-all duration-500 ease-out"
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
                    <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 animate-in fade-in">
                        <h3 className="text-lg font-bold text-sky-800 mb-4">
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
                                    className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500"
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
                                    className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500"
                                />
                                <span className="text-gray-800">
                                    ออกแรงแล้วเหนื่อย
                                </span>
                            </label>
                        </div>
                    </div>
                )}

                {showGroup9Extra && (
                    <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 animate-in fade-in">
                        <h3 className="text-lg font-bold text-sky-800 mb-2">
                            ข้อมูลเพิ่มเติม
                        </h3>
                        <label className="block text-gray-700 mb-2">
                            ต้องการทราบเรื่องใดเพิ่มเติม:
                        </label>
                        <textarea
                            value={String(additionalInfo?.q9Topic || "")}
                            onChange={(e) =>
                                handleAdditionalInfoChange(
                                    "q9Topic",
                                    e.target.value
                                )
                            }
                            className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 placeholder:text-slate-400"
                            rows={3}
                            placeholder="ระบุเรื่องที่ต้องการทราบ..."
                        />
                    </div>
                )}

                <FormNavigation
                    onBack={handleBack}
                    onNext={handleNext}
                    showBack={true}
                />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
            <AlertModal
                isOpen={isAlertOpen}
                onClose={closeAlert}
                message={alertMessage}
            />

            <ConfirmSubmitModal
                isOpen={showConfirmModal}
                isSubmitting={isSubmitting}
                onClose={closeConfirmModal}
                onConfirm={handleConfirmSubmit}
            />

            <div className="bg-white rounded-3xl shadow-xl shadow-sky-100/50 border border-slate-100 overflow-hidden">
                <div className="py-10 px-8 text-center bg-white border-b border-slate-100">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                        แบบสอบถามการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2{" "}
                        <br />
                        <span className="text-sky-600 block mt-2">
                            “โดยผู้ป่วยเป้นคนรายงาน”
                        </span>
                    </h1>
                </div>
            </div>

            <div className="space-y-8">
                {data.map((section) => (
                    <div
                        key={section.id}
                        className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                        <div className="p-8 space-y-8">
                            <div className="border-b border-gray-100 pb-6">
                                <h2 className="text-2xl font-bold text-indigo-900 mb-3">
                                    {section.title}
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
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

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <FormNavigation
                    onBack={onBack}
                    onNext={handleNext}
                    nextLabel="บันทึกข้อมูล"
                    isSubmit={true}
                    isLoading={isSubmitting}
                />
            </div>
        </div>
    );
}
