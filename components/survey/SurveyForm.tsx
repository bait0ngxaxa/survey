"use client";

import dynamic from "next/dynamic";

const SubmitSuccessModal = dynamic(
    () => import("@/components/SubmitSuccessModal"),
    { ssr: false },
);
const AlertModal = dynamic(() => import("@/components/AlertModal"), {
    ssr: false,
});
const ConfirmExitModal = dynamic(
    () => import("@/components/ConfirmExitModal"),
    { ssr: false },
);
import { useSurveyForm } from "@/hooks/useSurveyForm";
import {
    getSurveyNavigationSteps,
    type SurveyConfig,
} from "@/config/surveyData";
import {
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
    const navigationSteps = getSurveyNavigationSteps(config);

    if (survey.submitSuccess) {
        return <SubmitSuccessModal isOpen={true} redirectTo="/dashboard" />;
    }

    return (
        <>
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
            <div className="min-h-screen proms-page-bg relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 font-sans">
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
                            onBack={survey.requestExit}
                        />
                    )}

                    {survey.step === 2 && (
                        <SectionTwoForm
                            formData={survey.sectionTwoData}
                            onChange={survey.setSectionTwoData}
                            onNext={() =>
                                survey.goTo(navigationSteps.afterSectionTwo)
                            }
                            onBack={() => survey.goTo(1)}
                        />
                    )}

                    {config.enableMedicalRecord && survey.step === 3 && (
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
                                survey.goTo(navigationSteps.beforeSectionFour)
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
