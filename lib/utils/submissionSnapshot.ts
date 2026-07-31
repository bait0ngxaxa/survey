import { asRawAnswers } from "@/lib/types";

export interface SubmissionPatientFallback {
    firstName?: string | null;
    lastName?: string | null;
    gender?: string | null;
    birthDate?: Date | null;
    nationalId?: string | null;
}

export interface SubmissionSnapshotSource {
    respondentNameSnapshot?: string | null;
    genderSnapshot?: string | null;
    birthDateSnapshot?: Date | null;
    rawAnswers: unknown;
    patient?: SubmissionPatientFallback | null;
}

export interface SubmissionSnapshot {
    respondentName: string | null;
    gender: string | null;
    birthDate: Date | null;
}

function firstNonEmptyString(...values: unknown[]): string | null {
    for (const value of values) {
        if (typeof value !== "string") continue;
        const normalized = value.trim();
        if (normalized) return normalized;
    }

    return null;
}

function parseDateSafely(value: unknown): Date | null {
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : new Date(value);
    }

    if (typeof value !== "string" || !value.trim()) return null;

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getPatientFallbackName(
    patient: SubmissionPatientFallback | null | undefined,
): string | null {
    return firstNonEmptyString(
        [patient?.firstName, patient?.lastName]
            .filter((value): value is string => Boolean(value?.trim()))
            .join(" "),
    );
}

export function getSubmissionSnapshot(
    submission: SubmissionSnapshotSource,
): SubmissionSnapshot {
    const rawAnswers = asRawAnswers(submission.rawAnswers);
    const rawSectionTwo = rawAnswers.sectionTwo;

    return {
        respondentName:
            firstNonEmptyString(
                submission.respondentNameSnapshot,
                rawSectionTwo?.respondentName,
                getPatientFallbackName(submission.patient),
            ),
        gender: firstNonEmptyString(
            submission.genderSnapshot,
            rawSectionTwo?.gender,
            submission.patient?.gender,
        ),
        birthDate:
            parseDateSafely(submission.birthDateSnapshot) ??
            parseDateSafely(rawSectionTwo?.birthDate) ??
            parseDateSafely(submission.patient?.birthDate),
    };
}

export function getSubmissionNationalId(
    submission: Pick<SubmissionSnapshotSource, "patient">,
): string | null {
    return firstNonEmptyString(submission.patient?.nationalId);
}
