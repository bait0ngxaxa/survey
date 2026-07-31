import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SurveyForm from "@/components/survey/SurveyForm";
import { surveyData } from "@/config/surveyData";
import {
    initialMedicalRecordData,
    initialPart1Data,
    initialSectionTwoData,
} from "@/lib/initialData";
import { type UseSurveyFormReturn } from "@/hooks/useSurveyForm";

const { mockedUseSurveyForm } = vi.hoisted(() => ({
    mockedUseSurveyForm: vi.fn(),
}));

vi.mock("next/dynamic", () => ({
    default: () => () => null,
}));

vi.mock("@/hooks/useSurveyForm", () => ({
    useSurveyForm: mockedUseSurveyForm,
}));

vi.mock("@/components/survey", () => ({
    LoadingOverlay: () => (
        <div role="status" aria-label="page submission loading" />
    ),
    SurveyBackground: () => null,
    SectionOneForm: () => null,
    Introduction: () => null,
    SectionTwoForm: () => null,
    MedicalRecordForm: () => null,
    SectionFourForm: ({ isSubmitting }: { isSubmitting?: boolean }) =>
        isSubmitting ? (
            <div role="status" aria-label="section submission loading" />
        ) : null,
}));

function createSubmittingSurvey(): UseSurveyFormReturn {
    return {
        step: 4,
        goTo: vi.fn(),
        part1Data: initialPart1Data,
        sectionTwoData: initialSectionTwoData,
        medicalRecordData: initialMedicalRecordData,
        sectionFourAnswers: {},
        recommendations: {},
        additionalInfo: {},
        setSectionTwoData: vi.fn(),
        setMedicalRecordData: vi.fn(),
        setRecommendations: vi.fn(),
        setAdditionalInfo: vi.fn(),
        handlePart1Change: vi.fn(),
        handleNext: vi.fn(),
        handleSubmitSurvey: vi.fn(),
        handleSectionFourAnswer: vi.fn(),
        isAlertOpen: false,
        alertMessage: "",
        closeAlert: vi.fn(),
        isExitModalOpen: false,
        requestExit: vi.fn(),
        closeExitModal: vi.fn(),
        confirmExit: vi.fn(),
        isSubmitting: true,
        submitSuccess: false,
    };
}

describe("SurveyForm submission loading state", () => {
    it("shows only the loading status owned by the active submit flow", () => {
        mockedUseSurveyForm.mockReturnValue(createSubmittingSurvey());

        render(
            <SurveyForm config={surveyData.central} region="central" />,
        );

        expect(screen.getAllByRole("status")).toHaveLength(1);
        expect(
            screen.getByRole("status", {
                name: "section submission loading",
            }),
        ).toBeDefined();
    });
});
