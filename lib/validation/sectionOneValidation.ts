import { Part1Data } from "../types";

export interface SectionOneValidationResult {
    isValid: boolean;
    errorMessage: string | null;
}

interface SectionOneValidationInput {
    part1Data: Part1Data;
    respondentName: string;
}

export function validateSectionOne({
    part1Data,
    respondentName,
}: SectionOneValidationInput): SectionOneValidationResult {
    // 1. Respondent name is required
    if (!respondentName.trim()) {
        return {
            isValid: false,
            errorMessage: "กรุณาระบุชื่อผู้ให้ข้อมูล (ตัวผู้ป่วย)",
        };
    }

    // 2. If interview method, interviewer name is required
    if (
        part1Data.surveyMethod === "สัมภาษณ์" &&
        !part1Data.interviewerName?.trim()
    ) {
        return {
            isValid: false,
            errorMessage: "กรุณาระบุชื่อผู้สัมภาษณ์",
        };
    }

    // 3. Blood sugar knowledge is required
    if (!part1Data.bloodSugarKnown) {
        return {
            isValid: false,
            errorMessage: "กรุณาระบุว่าท่านทราบผลการตรวจระดับน้ำตาลหรือไม่",
        };
    }

    // 4. If blood sugar is known, levels are required
    if (part1Data.bloodSugarKnown === "ทราบ") {
        if (!part1Data.fastingLevel || !part1Data.hba1cLevel) {
            return {
                isValid: false,
                errorMessage: "กรุณาระบุระดับน้ำตาลในเลือดและค่าน้ำตาลสะสม",
            };
        }
    }

    // 5. Doctor visit frequency is required
    if (!part1Data.visitDoctor) {
        return {
            isValid: false,
            errorMessage: "กรุณาระบุว่าท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่",
        };
    }

    // 6. If not visiting every time, reason is required
    if (part1Data.visitDoctor === "ไม่ทุกครั้ง" && !part1Data.notVisitReason) {
        return {
            isValid: false,
            errorMessage: "กรุณาระบุสาเหตุที่ไม่ได้มาพบแพทย์ทุกครั้ง",
        };
    }

    return {
        isValid: true,
        errorMessage: null,
    };
}
