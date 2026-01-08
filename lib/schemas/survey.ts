import { z } from "zod";

// Part 1 Schema
export const Part1DataSchema = z.object({
    bloodSugarKnown: z.string(),
    fastingLevel: z.string(),
    hba1cLevel: z.string(),
    visitDoctor: z.string(),
    notVisitReason: z.string(),
    surveyMethod: z.string().optional(),
    interviewerName: z.string().optional(),
});

// Screenings Schema
export const ScreeningsSchema = z.object({
    physical: z.string(),
    physicalOther: z.string(),
    foot: z.string(),
    footOther: z.string(),
    eye: z.string(),
    eyeOther: z.string(),
    urine: z.string(),
    urineOther: z.string(),
    lipid: z.string(),
    lipidOther: z.string(),
    dental: z.string(),
    dentalOther: z.string(),
    hba1c: z.string(),
    hba1cOther: z.string(),
    other: z.string(),
    otherText: z.string(),
});

// Section Two Schema
export const SectionTwoDataSchema = z.object({
    respondentName: z.string(),
    gender: z.string(),
    age: z.string(),
    birthDate: z.string(),
    education: z.string(),
    educationOther: z.string(),
    maritalStatus: z.string(),
    occupation: z.string(),
    occupationOther: z.string(),
    income: z.string(),
    supportSource: z.string(),
    supportSourceOther: z.string(),
    financialStatus: z.string(),
    diabetesDuration: z.string(),
    diabetesAge: z.string(),
    treatmentType: z.string(),
    treatmentOther: z.string(),
    medicationCount: z.string(),
    paymentMethod: z.string(),
    paymentMethodOther: z.string(),
    livingArrangement: z.string(),
    livingMembers: z.string(),
    livingArrangementOther: z.string(),
    familySupport: z.string(),
    workSupport: z.string(),
    dietFood: z.string(),
    dietSnack: z.string(),
    dietDrink: z.string(),
    alcohol: z.string(),
    alcoholYears: z.string(),
    alcoholDays: z.string(),
    smoking: z.string(),
    smokingYears: z.string(),
    smokingAmount: z.string(),
    otherDiseases: z.string(),
    otherDiseasesList: z.string(),
    complications: z.array(z.string()),
    complicationsOther: z.string(),
    screenings: ScreeningsSchema,
    adviceReceived: z.string(),
    adviceCount: z.string(),
    adviceCountUnknown: z.boolean(),
    adviceTopics: z.string(),
    adviceSources: z.record(z.string(), z.string()),
    peerDiscussion: z.string(),
    peerDiscussionTopic: z.string(),
    activities: z.string(),
    activitiesTopic: z.string(),
    admissions: z.string(),
    admissionCount: z.string(),
    admissionReason: z.string(),
});

// Medical Record Schema
export const MedicalRecordDataSchema = z.object({
    bloodSugar: z.string(),
    hba1c: z.string(),
    bloodPressure: z.string(),
    microAlbumin: z.string(),
    microAlbuminRatio: z.string(),
    microAlbuminOther: z.string(),
    creatinine: z.string(),
    weight: z.string(),
    lipid_tchol: z.string(),
    lipid_tg: z.string(),
    lipid_ldl: z.string(),
    lipid_hdl: z.string(),
    otherDiseases: z.string(),
    diabetesDurationYears: z.string(),
    diabetesDurationMonths: z.string(),
});

// Report Step Schema
export const ReportStepDataSchema = z.object({
    id: z.number().optional(),
    dimension: z.string().optional(),
    questionsLabel: z.string().optional(),
    label: z.string(),
    action: z.string(),
    criteria: z.string(),
    relatedUnit: z.string(),
    avgScore: z.number().optional(),
    averageScore: z.number().optional(),
    additionalInfo: z
        .record(z.string(), z.union([z.boolean(), z.string()]))
        .optional(),
});

// Section Four Schema - JSON keys are always strings, so we validate string keys and transform
export const SectionFourDataSchema = z.object({
    answers: z.record(z.string(), z.number()).transform((obj) => {
        const result: Record<number, number> = {};
        for (const [key, value] of Object.entries(obj)) {
            const numKey = parseInt(key, 10);
            if (!isNaN(numKey)) {
                result[numKey] = value;
            }
        }
        return result;
    }),
    reportData: z.record(z.string(), ReportStepDataSchema).optional(),
});

// Main Survey Submission Schema
export const SurveySubmissionInputSchema = z.object({
    region: z.string().min(1, "Region is required").max(100),
    hospital: z.string().max(200).optional(),
    nationalId: z.string().max(20).optional(),
    part1: Part1DataSchema,
    sectionTwo: SectionTwoDataSchema,
    medicalRecord: MedicalRecordDataSchema,
    sectionFour: SectionFourDataSchema,
});

// Submission ID Schema (for get operations)
export const SubmissionIdSchema = z.string().uuid("Invalid submission ID");

// Get Submissions Options Schema
export const GetSubmissionsOptionsSchema = z.object({
    region: z.string().max(100).optional(),
    hospital: z.string().max(200).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    limit: z.number().min(1).max(100).optional(),
    offset: z.number().min(0).optional(),
});

// Export inferred types
export type SurveySubmissionInputValidated = z.infer<
    typeof SurveySubmissionInputSchema
>;
export type GetSubmissionsOptionsValidated = z.infer<
    typeof GetSubmissionsOptionsSchema
>;
