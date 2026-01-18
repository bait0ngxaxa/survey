import { type RecommendationsData, type AdditionalInfoData } from "@/lib/types";
import { type Part4Section } from "@/config/part4";

export interface UseSectionFourLogicProps {
    data: Part4Section[];
    answers: Record<number, number>;
    region?: string;
    recommendations?: RecommendationsData;
    onRecommendationsChange?: (recs: RecommendationsData) => void;
    additionalInfo?: AdditionalInfoData;
    onAdditionalInfoChange?: (info: AdditionalInfoData) => void;
    onBack: () => void;
    onSubmit: () => void | Promise<void>;
    isSubmittingProp?: boolean;
}
