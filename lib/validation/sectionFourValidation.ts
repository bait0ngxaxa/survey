import { SectionFourData } from "../types";
import { RegionConfig, RegionUIStep } from "@/config/part4Data";

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * Validates that all questions in the current UI step have been answered
 */
export function validateCurrentStep(
    answers: Record<number, number>,
    currentStep: RegionUIStep
): ValidationResult {
    const errors: string[] = [];

    for (const questionId of currentStep.questions) {
        if (!answers[questionId]) {
            errors.push(`กรุณาตอบข้อ ${questionId}`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Validates all questions in Section Four
 */
export function validateSectionFour(
    formData: SectionFourData,
    regionConfig: RegionConfig
): ValidationResult {
    const errors: string[] = [];

    // Get all question IDs from all UI steps
    const allQuestionIds = regionConfig.uiSteps.flatMap(
        (step) => step.questions
    );

    for (const questionId of allQuestionIds) {
        if (!formData.answers[questionId]) {
            errors.push(`กรุณาตอบข้อ ${questionId}`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Calculates groups average score with reverse scoring for negative questions
 */
export function getGroupAverage(
    questionIds: number[],
    answers: Record<number, number>,
    negativeQuestions: number[]
): number {
    let sum = 0;
    let count = 0;

    for (const id of questionIds) {
        if (answers[id]) {
            // Reverse score for negative questions (7 - score)
            const score = negativeQuestions.includes(id)
                ? 7 - answers[id]
                : answers[id];
            sum += score;
            count++;
        }
    }

    return count > 0 ? sum / count : 0;
}

/**
 * Calculates all dimension scores based on the region config
 */
export function calculateDimensionScores(
    answers: Record<number, number>,
    regionConfig: RegionConfig
): Record<string, number> {
    const scores: Record<string, number> = {};

    // Group questions by dimension
    const dimensionQuestions: Record<string, number[]> = {};

    for (const group of regionConfig.groups) {
        const dimension = group.dimension.replace("\n", " ");
        if (!dimensionQuestions[dimension]) {
            dimensionQuestions[dimension] = [];
        }
        dimensionQuestions[dimension].push(...group.questions);
    }

    // Calculate average for each dimension
    for (const [dimension, questions] of Object.entries(dimensionQuestions)) {
        scores[dimension] = getGroupAverage(
            questions,
            answers,
            regionConfig.negativeQuestions
        );
    }

    return scores;
}
