import { useCallback } from "react";
import {
    generateReportData,
    type ReportGenerationOptions,
} from "@/lib/utils/reportGenerator";
import { type RecommendationsData, type AdditionalInfoData } from "@/lib/types";

interface UseActionPlanProps {
    answers: Record<number, number>;
    recommendations: RecommendationsData;
    onRecommendationsChange?: (recs: RecommendationsData) => void;
    additionalInfo: AdditionalInfoData;
}

interface UseActionPlanReturn {
    processGroupRecommendations: (groupIds: number[]) => void;
}

export function useActionPlan({
    answers,
    recommendations,
    onRecommendationsChange,
    additionalInfo,
}: UseActionPlanProps): UseActionPlanReturn {
    const processGroupRecommendations = useCallback(
        (groupIds: number[]): void => {
            if (!onRecommendationsChange) return;

            const options: ReportGenerationOptions = {
                groupIds,
                additionalInfo,
            };
            const generatedRecommendations = generateReportData(
                answers,
                options,
            );

            onRecommendationsChange({
                ...recommendations,
                ...generatedRecommendations,
            });
        },
        [
            answers,
            recommendations,
            onRecommendationsChange,
            additionalInfo,
        ],
    );

    return { processGroupRecommendations };
}
