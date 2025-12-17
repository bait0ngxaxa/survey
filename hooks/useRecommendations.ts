"use client";

import { useCallback } from "react";
import { centralGroups, centralNegativeQuestions } from "@/config/part4Data";
import { RecommendationsData, AdditionalInfoData } from "@/lib/types";

interface UseRecommendationsOptions {
    answers: Record<number, number>;
    additionalInfo: AdditionalInfoData;
    recommendations: RecommendationsData;
    onRecommendationsChange?: (recs: RecommendationsData) => void;
}

interface UseRecommendationsReturn {
    getGroupAverage: (questionIds: number[]) => number;
    processGroupRecommendations: (groupIds: number[]) => void;
}

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

export function useRecommendations({
    answers,
    additionalInfo,
    recommendations,
    onRecommendationsChange,
}: UseRecommendationsOptions): UseRecommendationsReturn {
    const getGroupAverage = useCallback(
        (questionIds: number[]): number => {
            if (questionIds.length === 0) return 0;
            const sum = questionIds.reduce((acc, id) => {
                let score = answers[id] || 0;
                if (centralNegativeQuestions.includes(id) && score > 0) {
                    score = 7 - score;
                }
                return acc + score;
            }, 0);
            return Math.round(sum / questionIds.length);
        },
        [answers]
    );

    const getCriteria = (avgScore: number): string => {
        if (avgScore <= 2) return "1-2";
        if (avgScore === 3) return "3";
        return "4-6";
    };

    const processGroupRecommendations = useCallback(
        (groupIds: number[]) => {
            if (!onRecommendationsChange) return;

            const getAction = (groupId: number, criteria: string): string => {
                if (criteria === "4-6") return "ติดตามตามรอบ";
                if (criteria === "3") return "เฝ้าระวัง";

                if (groupId === 2) {
                    const actions = [];
                    if (additionalInfo.movementLimit)
                        actions.push("ส่งต่อนักกายภาพ");
                    if (additionalInfo.tired)
                        actions.push("ส่งต่อ Manager หรือ แพทย์");
                    if (actions.length === 0) actions.push("ถามเพิ่ม");
                    return actions.join(", ");
                }

                return CRITICAL_ACTIONS[groupId] || "";
            };

            const getAdditionalInfoForGroup = (
                groupId: number,
                avgScore: number
            ) => {
                if (avgScore > 2) return undefined;

                if (groupId === 2) {
                    return {
                        movementLimit: additionalInfo.movementLimit,
                        tired: additionalInfo.tired,
                    };
                }
                if (groupId === 9) {
                    return { topic: String(additionalInfo.q9Topic || "") };
                }
                return undefined;
            };

            const newRecs = { ...recommendations };

            groupIds.forEach((groupId) => {
                const analyticGroup = centralGroups.find(
                    (g) => g.id === groupId
                );
                if (!analyticGroup) return;

                const avgScore = getGroupAverage(analyticGroup.questions);
                const criteria = getCriteria(avgScore);
                const action = getAction(groupId, criteria);
                const relatedUnit = RELATED_UNITS[groupId] || "";

                newRecs[`step_${groupId}`] = {
                    id: groupId,
                    dimension: analyticGroup.dimension,
                    questionsLabel: analyticGroup.questionsLabel,
                    label: analyticGroup.label,
                    criteria,
                    averageScore: avgScore,
                    action,
                    relatedUnit,
                    additionalInfo: getAdditionalInfoForGroup(
                        groupId,
                        avgScore
                    ),
                };
            });

            onRecommendationsChange(newRecs);
        },
        [
            recommendations,
            onRecommendationsChange,
            getGroupAverage,
            additionalInfo,
        ]
    );

    return {
        getGroupAverage,
        processGroupRecommendations,
    };
}

export default useRecommendations;
