import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HealthConditionsSection from "@/components/survey/part2/HealthConditionsSection";
import { createValidSurveySubmission } from "@/tests/fixtures/surveySubmission";
import { type SectionTwoData } from "@/lib/types";

const NO_COMPLICATIONS = "ไม่มีภาวะแทรกซ้อน";
const KIDNEY_COMPLICATION = "มีอาการผิดปกติของไต/โรคไต";

function renderComplications(complications: string[]) {
    const handleChange = vi.fn();
    const formData: SectionTwoData = {
        ...createValidSurveySubmission().sectionTwo,
        complications,
    };

    render(
        <HealthConditionsSection
            formData={formData}
            handleChange={handleChange}
            handleScreeningChange={vi.fn()}
        />,
    );

    return handleChange;
}

describe("HealthConditionsSection complication options", () => {
    it("clears other complications when no complications is selected", () => {
        const handleChange = renderComplications([KIDNEY_COMPLICATION]);

        fireEvent.click(screen.getByText(NO_COMPLICATIONS));

        expect(handleChange).toHaveBeenCalledWith("complications", [
            NO_COMPLICATIONS,
        ]);
    });

    it("clears no complications when another complication is selected", () => {
        const handleChange = renderComplications([NO_COMPLICATIONS]);

        fireEvent.click(screen.getByText(KIDNEY_COMPLICATION));

        expect(handleChange).toHaveBeenCalledWith("complications", [
            KIDNEY_COMPLICATION,
        ]);
    });
});
