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
        <div className="relative z-10 mx-auto max-w-4xl space-y-8 pb-12">
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
        <div className="relative z-10 mx-auto max-w-6xl space-y-8 pb-12">
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

            <div className="proms-panel rounded-2xl p-6 sm:p-8">
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
        <div className="relative">
            <div className="relative proms-panel rounded-2xl overflow-hidden">
                <div className="relative py-8 px-5 sm:px-8 text-center proms-header-gradient border-b border-sky-100 overflow-hidden">
                    <h1 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 thai-text break-words">
                        <span className="text-slate-800">
                            แบบสอบถามการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่
                            2
                        </span>
                        <span className="mt-3 block text-sky-900">
                            &ldquo;โดยผู้ป่วยเป็นคนรายงาน&rdquo;
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
}
