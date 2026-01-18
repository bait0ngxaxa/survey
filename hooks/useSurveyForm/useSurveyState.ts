import { useState } from "react";
import {
    type Part1Data,
    type SectionTwoData,
    type MedicalRecordData,
    type RecommendationsData,
    type AdditionalInfoData,
} from "@/lib/types";
import {
    initialPart1Data,
    initialSectionTwoData,
    initialMedicalRecordData,
} from "@/lib/initialData";

export function useSurveyState() {
    const [part1Data, setPart1Data] = useState<Part1Data>(initialPart1Data);
    const [sectionTwoData, setSectionTwoData] = useState<SectionTwoData>(
        initialSectionTwoData,
    );
    const [medicalRecordData, setMedicalRecordData] =
        useState<MedicalRecordData>(initialMedicalRecordData);
    const [sectionFourAnswers, setSectionFourAnswers] = useState<
        Record<number, number>
    >({});
    const [recommendations, setRecommendations] = useState<RecommendationsData>(
        {},
    );
    const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoData>(
        {},
    );

    const handlePart1Change = (field: keyof Part1Data, value: string): void => {
        setPart1Data((prev) => ({ ...prev, [field]: value }));
    };

    const handleSectionFourAnswer = (id: number, score: number): void => {
        setSectionFourAnswers((prev) => ({ ...prev, [id]: score }));
    };

    return {
        part1Data,
        setPart1Data,
        handlePart1Change,
        sectionTwoData,
        setSectionTwoData,
        medicalRecordData,
        setMedicalRecordData,
        sectionFourAnswers,
        setSectionFourAnswers,
        handleSectionFourAnswer,
        recommendations,
        setRecommendations,
        additionalInfo,
        setAdditionalInfo,
    };
}
