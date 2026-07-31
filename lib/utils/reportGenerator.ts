import { centralGroups, centralNegativeQuestions } from "@/config/part4";
import {
    type AdditionalInfoData,
    type ReportData,
    type ReportStepData,
} from "@/lib/types";

const RELATED_UNITS: Record<number, string> = {
    1: "พยาบาล / LTC",
    2: "นักกายภาพ/พยาบาล",
    3: "พยาบาล/แพทย์",
    4: "ทีม Mental Health",
    5: "ทีม HL",
    6: "พยาบาล / แพทย์",
    7: "แพทย์/ Mental Health",
    8: "แพทย์",
    9: "ทีมบริการ",
    10: "ทีม HL",
};

const CRITICAL_ACTIONS: Record<number, string> = {
    1: "ส่ง Manager เพื่อลงทะเบียน LTC",
    3: "ส่ง Manager",
    4: "Consult ทีม Mental Health",
    5: "ส่งเข้าร่วม Health Literacy Program",
    6: "ส่งพบ Manager",
    7: "ส่งพบ Manager หรือ ทีม Mental Health เพื่อประเมินภาวะเครียด",
    8: "พบ Manager",
    9: "ถามเพิ่ม: ต้องการรู้เรื่องใดเพิ่มเติม แล้วส่ง Manager",
    10: "ประเมินเพื่อส่งเข้า Health Literacy Program",
};

export type RecommendationCriteria = "1-2" | "3" | "4-6";

export interface ReportGenerationOptions {
    groupIds?: readonly number[];
    additionalInfo?: AdditionalInfoData;
}

export function calculateGroupAverage(
    answers: Record<number, number>,
    questionIds: readonly number[],
): number {
    if (questionIds.length === 0) return 0;

    const sum = questionIds.reduce((total, questionId) => {
        let score = answers[questionId] ?? 0;
        if (centralNegativeQuestions.includes(questionId) && score > 0) {
            score = 7 - score;
        }
        return total + score;
    }, 0);

    return Math.round(sum / questionIds.length);
}

export function getRecommendationCriteria(
    averageScore: number,
): RecommendationCriteria {
    if (averageScore <= 2) return "1-2";
    if (averageScore === 3) return "3";
    return "4-6";
}

function getAction(
    groupId: number,
    criteria: RecommendationCriteria,
    additionalInfo: AdditionalInfoData,
): string {
    if (criteria === "4-6") return "ติดตามตามรอบ";
    if (criteria === "3") return "เฝ้าระวัง";

    if (groupId === 2) {
        const actions: string[] = [];
        if (additionalInfo.movementLimit === true) {
            actions.push("ส่งต่อนักกายภาพ");
        }
        if (additionalInfo.tired === true) {
            actions.push("ส่งต่อ Manager หรือ แพทย์");
        }
        return actions.length > 0 ? actions.join(", ") : "ถามเพิ่ม";
    }

    return CRITICAL_ACTIONS[groupId] || "";
}

function getAdditionalInfo(
    groupId: number,
    averageScore: number,
    additionalInfo: AdditionalInfoData,
): AdditionalInfoData | undefined {
    if (averageScore > 2) return undefined;

    if (groupId === 2) {
        return {
            movementLimit: additionalInfo.movementLimit === true,
            tired: additionalInfo.tired === true,
        };
    }

    if (groupId === 9) {
        return {
            topic:
                typeof additionalInfo.q9Topic === "string"
                    ? additionalInfo.q9Topic
                    : "",
        };
    }

    return undefined;
}

export function generateReportData(
    answers: Record<number, number>,
    options: ReportGenerationOptions = {},
): ReportData {
    const additionalInfo = options.additionalInfo ?? {};
    const groupIds = options.groupIds ?? centralGroups.map((group) => group.id);
    const reportData: ReportData = {};

    for (const groupId of groupIds) {
        const group = centralGroups.find((candidate) => candidate.id === groupId);
        if (!group) continue;

        const averageScore = calculateGroupAverage(answers, group.questions);
        const criteria = getRecommendationCriteria(averageScore);
        const step: ReportStepData = {
            id: group.id,
            dimension: group.dimension,
            questionsLabel: group.questionsLabel,
            label: group.label,
            criteria,
            averageScore,
            action: getAction(group.id, criteria, additionalInfo),
            relatedUnit: RELATED_UNITS[group.id] || "",
        };
        const stepAdditionalInfo = getAdditionalInfo(
            group.id,
            averageScore,
            additionalInfo,
        );

        if (stepAdditionalInfo) {
            step.additionalInfo = stepAdditionalInfo;
        }

        reportData[`step_${group.id}`] = step;
    }

    return reportData;
}

function isReportStep(value: unknown): boolean {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }

    const step = value as Record<string, unknown>;
    return (
        typeof step.label === "string" &&
        typeof step.action === "string" &&
        typeof step.criteria === "string" &&
        typeof step.relatedUnit === "string"
    );
}

export function hasCompleteReportData(data: unknown): data is ReportData {
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
        return false;
    }

    const reportData = data as Record<string, unknown>;
    return centralGroups.every((group) =>
        isReportStep(reportData[`step_${group.id}`]),
    );
}
