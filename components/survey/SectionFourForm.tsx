"use client";

import dynamic from "next/dynamic";

const AlertModal = dynamic(() => import("@/components/AlertModal"), {
    ssr: false,
});
const ConfirmSubmitModal = dynamic(
    () => import("@/components/ConfirmSubmitModal"),
    { ssr: false },
);
import { QuestionSlider, FormNavigation } from "@/components/ui/form";
import { useSectionFourLogic } from "@/hooks/useSectionFourLogic";
import { type Part4Section } from "@/config/part4";
import { type RecommendationsData, type AdditionalInfoData } from "@/lib/types";
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
        // State
        currentStep,
        isSubmitting,
        isCentral,
        // Alert
        isAlertOpen,
        alertMessage,
        closeAlert,
        // Confirm Modal
        showConfirmModal,
        closeConfirmModal,
        // Handlers
        handleAdditionalInfoChange,
        handleNext,
        handleBack,
        handleConfirmSubmit,
        // Central View Helpers
        getCurrentUIStep,
        getDisplayQuestions,
        shouldShowGroup2Extra,
        shouldShowGroup9Extra,
        totalSteps,
    } = useSectionFourLogic({
        data,
        answers,
        region,
        recommendations,
        onRecommendationsChange,
        additionalInfo,
        onAdditionalInfoChange,
        onBack,
        onSubmit,
        isSubmittingProp,
    });

    // Central region multi-step view
    if (isCentral) {
        const currentUIStep = getCurrentUIStep();
        const displayQuestions = getDisplayQuestions();

        if (!currentUIStep) return null;

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
                    totalSteps={totalSteps}
                />

                <div className="space-y-6">
                    {displayQuestions.map((q) => (
                        <QuestionSlider
                            key={q.id}
                            id={q.id}
                            text={q.text}
                            value={answers[q.id]}
                            onChange={(score) => onAnswer(q.id, score)}
                            minLabel={currentUIStep.sliderLabels?.min}
                            maxLabel={currentUIStep.sliderLabels?.max}
                        />
                    ))}
                </div>

                {shouldShowGroup2Extra() && (
                    <AdditionalInfoGroup2
                        additionalInfo={additionalInfo}
                        onAdditionalInfoChange={handleAdditionalInfoChange}
                    />
                )}
                {shouldShowGroup9Extra() && (
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

            <NonCentralHeader />

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
                    onBack={handleBack}
                    onNext={handleNext}
                    nextLabel="บันทึกข้อมูล"
                    isSubmit={true}
                    isLoading={isSubmitting}
                />
            </div>
        </div>
    );
}

/**
 * Header component for Non-Central region survey
 */
function NonCentralHeader() {
    return (
        <div className="relative group">
            <div className="absolute inset-[-2px] bg-linear-to-br from-sky-200/30 via-blue-200/20 to-cyan-200/30 rounded-[1.625rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-sky-100/50 border border-white/80 overflow-hidden">
                <div className="relative py-10 px-8 text-center bg-linear-to-b from-white to-slate-50/50 border-b border-slate-100/80 overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-[-50%] left-[-20%] w-80 h-80 bg-sky-100/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-50%] right-[-20%] w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />

                    <h1 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 thai-text">
                        <span className="text-slate-800">
                            แบบสอบถามการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่
                            2
                        </span>
                        <span className="block mt-3 text-transparent bg-clip-text bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500">
                            &ldquo;โดยผู้ป่วยเป็นคนรายงาน&rdquo;
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
}
