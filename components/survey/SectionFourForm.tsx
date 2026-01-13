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
import { Part4Section, centralUISteps } from "@/config/part4";
import { RecommendationsData, AdditionalInfoData } from "@/lib/types";
import {
    AdditionalInfoGroup2,
    AdditionalInfoGroup9,
    SurveyStepHeader,
    SurveySection,
} from "@/components/survey";

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

    const { getGroupAverage, processGroupRecommendations } = useRecommendations(
        {
            answers,
            additionalInfo,
            recommendations,
            onRecommendationsChange,
        }
    );

    const handleAdditionalInfoChange = (
        key: string,
        value: boolean | string
    ): void => {
        if (onAdditionalInfoChange) {
            onAdditionalInfoChange({ ...additionalInfo, [key]: value });
        }
    };

    const validateCurrentStep = (): boolean => {
        if (!isCentral) return true;

        const currentUIStep = centralUISteps[currentStep];
        for (const qId of currentUIStep.questions) {
            if (!answers[qId]) return false;
        }

        if (currentUIStep.containedGroups.includes(2)) {
            const group2Avg = getGroupAverage([2, 3]);
            if (group2Avg > 0 && group2Avg <= 2) {
                if (!additionalInfo.movementLimit && !additionalInfo.tired)
                    return false;
            }
        }

        if (currentUIStep.containedGroups.includes(9)) {
            const group9Avg = getGroupAverage([24, 25, 26]);
            if (group9Avg > 0 && group9Avg <= 2) {
                const q9Topic = additionalInfo.q9Topic;
                if (
                    !q9Topic ||
                    (typeof q9Topic === "string" && q9Topic.trim() === "")
                )
                    return false;
            }
        }

        return true;
    };

    const handleNext = (): void => {
        if (isCentral) {
            const isLastQuestionStep =
                currentStep === centralUISteps.length - 1;

            if (!validateCurrentStep()) {
                showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }

            const currentUIStep = centralUISteps[currentStep];
            processGroupRecommendations(currentUIStep.containedGroups);

            if (isLastQuestionStep) {
                openConfirmModal();
                return;
            }

            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const allAnswered = data.every((section) =>
                section.questions.every((q) => answers[q.id])
            );
            if (!allAnswered) {
                showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }
            onSubmit();
        }
    };

    const handleBack = (): void => {
        if (isCentral && currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onBack();
        }
    };

    const handleConfirmSubmit = async (): Promise<void> => {
        if (isSubmitting) return;
        await executeSubmit(() => onSubmit() as Promise<void>);
    };

    // Central region multi-step view
    if (isCentral) {
        const currentUIStep = centralUISteps[currentStep];
        const displayQuestions = data
            .flatMap((s) => s.questions)
            .filter((q) => currentUIStep.questions.includes(q.id));

        const showGroup2Extra =
            currentUIStep.containedGroups.includes(2) &&
            getGroupAverage([2, 3]) === 1;
        const showGroup9Extra =
            currentUIStep.containedGroups.includes(9) &&
            getGroupAverage([24, 25, 26]) === 1;

        return (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8 relative z-10">
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

                <SurveyStepHeader
                    title={currentUIStep.title}
                    description={currentUIStep.description}
                    currentStep={currentStep}
                    totalSteps={centralUISteps.length}
                />

                <div className="space-y-6">
                    {displayQuestions.map((q) => (
                        <QuestionSlider
                            key={q.id}
                            id={q.id}
                            text={q.text}
                            value={answers[q.id]}
                            onChange={(score) => onAnswer(q.id, score)}
                        />
                    ))}
                </div>

                {showGroup2Extra && (
                    <AdditionalInfoGroup2
                        additionalInfo={additionalInfo}
                        onAdditionalInfoChange={handleAdditionalInfoChange}
                    />
                )}
                {showGroup9Extra && (
                    <AdditionalInfoGroup9
                        additionalInfo={additionalInfo}
                        onAdditionalInfoChange={handleAdditionalInfoChange}
                    />
                )}

                <FormNavigation
                    onBack={handleBack}
                    onNext={handleNext}
                    showBack={true}
                />
            </div>
        );
    }

    // Non-Central standard view
    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8 relative z-10">
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

            {/* Enhanced Header Card with Glassmorphism */}
            <div className="relative group">
                <div className="absolute inset-[-2px] bg-gradient-to-br from-sky-200/30 via-blue-200/20 to-cyan-200/30 rounded-[1.625rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-sky-100/50 border border-white/80 overflow-hidden">
                    <div className="relative py-10 px-8 text-center bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-100/80 overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-[-50%] left-[-20%] w-80 h-80 bg-sky-100/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-[-50%] right-[-20%] w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />

                        <h1 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                            <span className="text-slate-800">
                                แบบสอบถามการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่
                                2
                            </span>
                            <br />
                            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500">
                                &ldquo;โดยผู้ป่วยเป้นคนรายงาน&rdquo;
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {data.map((section) => (
                    <SurveySection
                        key={section.id}
                        section={section}
                        answers={answers}
                        onAnswer={onAnswer}
                    />
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
