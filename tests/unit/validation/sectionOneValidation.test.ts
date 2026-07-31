import { describe, expect, it } from "vitest";
import { initialPart1Data } from "@/lib/initialData";
import { validateSectionOne } from "@/lib/validation/sectionOneValidation";
import { type Part1Data } from "@/lib/types";

const createValidPart1Data = (): Part1Data => ({
    ...initialPart1Data,
    bloodSugarKnown: "ไม่ทราบ",
    visitDoctor: "ทุกครั้ง",
    surveyMethod: "ตอบด้วยตนเอง",
});

describe("Section One Validation", () => {
    it("requires blood sugar levels when the respondent knows the result", () => {
        const result = validateSectionOne({
            part1Data: {
                ...createValidPart1Data(),
                bloodSugarKnown: "ทราบ",
                fastingLevel: "",
                hba1cLevel: "",
            },
            respondentName: "ผู้ทดสอบ",
        });

        expect(result).toEqual({
            isValid: false,
            errorMessage: "กรุณาระบุระดับน้ำตาลในเลือดและค่าน้ำตาลสะสม",
        });
    });

    it("requires an interviewer name for interview submissions", () => {
        const result = validateSectionOne({
            part1Data: {
                ...createValidPart1Data(),
                surveyMethod: "สัมภาษณ์",
                interviewerName: "   ",
            },
            respondentName: "ผู้ทดสอบ",
        });

        expect(result).toEqual({
            isValid: false,
            errorMessage: "กรุณาระบุชื่อผู้สัมภาษณ์",
        });
    });

    it("requires a reason when the respondent does not visit every time", () => {
        const result = validateSectionOne({
            part1Data: {
                ...createValidPart1Data(),
                visitDoctor: "ไม่ทุกครั้ง",
                notVisitReason: "",
            },
            respondentName: "ผู้ทดสอบ",
        });

        expect(result).toEqual({
            isValid: false,
            errorMessage: "กรุณาระบุสาเหตุที่ไม่ได้มาพบแพทย์ทุกครั้ง",
        });
    });
});
