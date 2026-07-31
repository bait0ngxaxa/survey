import { type Part1Data } from "../types";
import { getPart1ValidationIssues } from "./surveyCrossFieldRules";

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

    const [firstIssue] = getPart1ValidationIssues(part1Data);
    if (firstIssue) {
        return {
            isValid: false,
            errorMessage: firstIssue.message,
        };
    }

    return {
        isValid: true,
        errorMessage: null,
    };
}
