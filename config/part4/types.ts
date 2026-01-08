export interface Part4Section {
    id: string;
    title: string;
    description: string;
    scoringCriteria?: string[];
    questions: {
        id: number;
        text: string;
    }[];
}

export interface RegionGroupConfig {
    id: number;
    questions: number[];
    label: string;
    questionsLabel: string;
    dimension: string;
}

export interface RegionUIStep {
    questions: number[];
    containedGroups: number[];
    title: string;
    description: string;
}

export interface RegionConfig {
    groups: RegionGroupConfig[];
    uiSteps: RegionUIStep[];
    negativeQuestions: number[];
}
