import { describe, it, expect } from "vitest";
import { transformToGeneralData, transformToPromsData } from "./transformers";
import { type SubmissionData } from "./types";

// Mock Data
const mockDate = new Date("2024-01-01T10:00:00Z");
const mockSubmission: SubmissionData = {
    id: "sub_123",
    region: "central",
    createdAt: mockDate,
    patient: {
        id: "pat_123",
        firstName: "Somchai",
        lastName: "Dee",
        gender: "Male",
        region: "central",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    rawAnswers: {
        part1: {
            surveyMethod: "Interview",
            bloodSugarKnown: "Yes",
        },
        sectionTwo: {
            gender: "Male",
            age: "50",
            diabetesDuration: "5",
            education: "Bachelor",
            occupation: "อื่น ๆ",
            occupationOther: "Freelance",
            screenings: {
                foot: "Normal",
                eye: "อื่น ๆ",
                eyeOther: "Blurred",
            },
        },
        reportData: {
            step_1: { label: "Standing", action: "Good" },
            step_2: {
                label: "Walking",
                action: "Fair",
                additionalInfo: { movementLimit: true },
            },
        },
    },
};

const emptySubmission: SubmissionData = {
    id: "sub_empty",
    region: "central",
    createdAt: mockDate,
    patient: null,
    rawAnswers: {},
};

describe("Export Transformers", () => {
    describe("transformToGeneralData", () => {
        it("should transform full submission correctly", () => {
            const result = transformToGeneralData(mockSubmission);

            expect(result["ID"]).toBe("sub_123");
            expect(result["ผู้ให้ข้อมูล"]).toBe("Somchai Dee");
            expect(result["เขตสุขภาพ"]).toBe("ทีมกลาง"); // Translated
            expect(result["ทราบระดับน้ำตาล"]).toBe("Yes");
            expect(result["อาชีพ"]).toBe("อื่น ๆ: Freelance"); // Other handling
            expect(result["ตรวจตา"]).toBe("อื่น ๆ: Blurred"); // Screening Other
        });

        it("should handle empty submission gracefully", () => {
            const result = transformToGeneralData(emptySubmission);

            expect(result["ID"]).toBe("sub_empty");
            expect(result["ผู้ให้ข้อมูล"]).toBe("");
            expect(result["ทราบระดับน้ำตาล"]).toBe("");
            expect(result["อาชีพ"]).toBe("");
        });
    });

    describe("transformToPromsData", () => {
        it("should transform full submission correctly", () => {
            const result = transformToPromsData(mockSubmission);

            expect(result["ID"]).toBe("sub_123");
            expect(result["ข้อจำกัดการเคลื่อนไหว (มิติ 1)"]).toBe(
                "มีข้อจำกัดด้านการเคลื่อนไหว",
            );
            // Check formatted action text
            expect(result["มิติที่ 1 (การทำงานของร่างกาย)"]).toContain(
                "Standing: Good",
            );
            expect(result["มิติที่ 1 (การทำงานของร่างกาย)"]).toContain(
                "Walking: Fair",
            );
        });

        it("should handle empty submission gracefully", () => {
            const result = transformToPromsData(emptySubmission);

            expect(result["ID"]).toBe("sub_empty");
            expect(result["มิติที่ 1 (การทำงานของร่างกาย)"]).toBe("");
            expect(result["ข้อจำกัดการเคลื่อนไหว (มิติ 1)"]).toBe("");
        });
    });
});
