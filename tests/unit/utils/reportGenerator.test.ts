import { describe, expect, it } from "vitest";
import {
    calculateGroupAverage,
    generateReportData,
    hasCompleteReportData,
} from "@/lib/utils/reportGenerator";
import { centralGroups } from "@/config/part4";
import { createCompleteCentralAnswers } from "@/tests/fixtures/surveySubmission";

describe("Report generator", () => {
    it("calculates reverse-scored group averages from answers", () => {
        const answers = { 4: 6, 5: 6, 6: 6, 7: 6 };

        expect(calculateGroupAverage(answers, [4, 5, 6, 7])).toBe(1);
    });

    it("generates all report steps from the answer set", () => {
        const reportData = generateReportData(
            createCompleteCentralAnswers(5),
        );

        expect(Object.keys(reportData)).toEqual(
            centralGroups.map((group) => `step_${group.id}`),
        );
        expect(reportData.step_1).toMatchObject({
            averageScore: 5,
            criteria: "4-6",
            action: "ติดตามตามรอบ",
        });
        expect(reportData.step_3).toMatchObject({
            averageScore: 2,
            criteria: "1-2",
            action: "ส่ง Manager",
        });
    });

    it("uses additional answers only for supplementary report details", () => {
        const answers = createCompleteCentralAnswers(1);
        const reportData = generateReportData(answers, {
            additionalInfo: {
                movementLimit: true,
                tired: true,
                q9Topic: "การใช้ยา",
            },
        });

        expect(reportData.step_2.action).toBe(
            "ส่งต่อนักกายภาพ, ส่งต่อ Manager หรือ แพทย์",
        );
        expect(reportData.step_2.additionalInfo).toEqual({
            movementLimit: true,
            tired: true,
        });
        expect(reportData.step_9.additionalInfo).toEqual({
            topic: "การใช้ยา",
        });
    });

    it("recognizes only complete report data", () => {
        const reportData = generateReportData(
            createCompleteCentralAnswers(4),
        );

        expect(hasCompleteReportData({})).toBe(false);
        expect(
            hasCompleteReportData({ step_1: reportData.step_1 }),
        ).toBe(false);
        expect(hasCompleteReportData(reportData)).toBe(true);
    });
});
