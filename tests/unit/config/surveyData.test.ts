import { describe, expect, it } from "vitest";
import {
    getSurveyNavigationSteps,
    surveyData,
    type SurveyConfig,
} from "@/config/surveyData";

describe("survey navigation configuration", () => {
    it("skips the inactive Medical Record step for Central", () => {
        expect(getSurveyNavigationSteps(surveyData.central)).toEqual({
            afterSectionTwo: 4,
            beforeSectionFour: 2,
        });
    });

    it("includes the Medical Record step when a survey enables it", () => {
        const config: SurveyConfig = {
            ...surveyData.central,
            enableMedicalRecord: true,
        };

        expect(getSurveyNavigationSteps(config)).toEqual({
            afterSectionTwo: 3,
            beforeSectionFour: 3,
        });
    });
});
