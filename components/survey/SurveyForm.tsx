"use client";

import { Suspense } from "react";
import SubmitSuccessModal from "@/components/SubmitSuccessModal";
import AlertModal from "@/components/AlertModal";
import ConfirmExitModal from "@/components/ConfirmExitModal";
import { useSurveyForm } from "@/hooks";
import { type SurveyConfig } from "@/config/surveyData";
import {
    LoadingOverlay,
    SurveyBackground,
    SectionOneForm,
    Introduction,
    SectionTwoForm,
    MedicalRecordForm,
    SectionFourForm,
} from "@/components/survey";

interface SurveyFormProps {
    config: SurveyConfig;
    region: string;
}

export default function SurveyForm({ config, region }: SurveyFormProps) {
    const survey = useSurveyForm({ region });

    if (survey.submitSuccess) {
        return <SubmitSuccessModal isOpen={true} redirectTo="/dashboard" />;
    }

    return (
        <>
            <Suspense fallback={null} />
            <AlertModal
                isOpen={survey.isAlertOpen}
                onClose={survey.closeAlert}
                message={survey.alertMessage}
            />
            <ConfirmExitModal
                isOpen={survey.isExitModalOpen}
                onClose={survey.closeExitModal}
                onConfirm={() => survey.confirmExit("/dashboard")}
            />
            {survey.isSubmitting && <LoadingOverlay />}

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <SurveyBackground />

                <div className="relative z-10">
                    {survey.step === 0 && (
                        <Introduction onStart={() => survey.goTo(1)} />
                    )}

                    {survey.step === 1 && (
                        <SectionOneForm
                            title={config.title}
                            part1Data={survey.part1Data}
                            respondentName={
                                survey.sectionTwoData.respondentName
                            }
                            onPart1Change={survey.handlePart1Change}
                            onRespondentNameChange={(v) =>
                                survey.setSectionTwoData((prev) => ({
                                    ...prev,
                                    respondentName: v,
                                }))
                            }
                            onNext={survey.handleNext}
                            onBack={() => (window.location.href = "/dashboard")}
                        />
                    )}

                    {survey.step === 2 && (
                        <SectionTwoForm
                            formData={survey.sectionTwoData}
                            onChange={survey.setSectionTwoData}
                            onNext={() => survey.goTo(4)}
                            onBack={() => survey.goTo(1)}
                        />
                    )}

                    {survey.step === 3 && (
                        <MedicalRecordForm
                            formData={survey.medicalRecordData}
                            onChange={survey.setMedicalRecordData}
                            onNext={() => survey.goTo(4)}
                            onBack={() => survey.goTo(2)}
                        />
                    )}

                    {survey.step === 4 && (
                        <SectionFourForm
                            data={config.part4Questions}
                            answers={survey.sectionFourAnswers}
                            onAnswer={survey.handleSectionFourAnswer}
                            onBack={() =>
                                survey.goTo(region === "central" ? 2 : 3)
                            }
                            onSubmit={survey.handleSubmitSurvey}
                            region={region}
                            recommendations={survey.recommendations}
                            onRecommendationsChange={survey.setRecommendations}
                            additionalInfo={survey.additionalInfo}
                            onAdditionalInfoChange={survey.setAdditionalInfo}
                            isSubmitting={survey.isSubmitting}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
