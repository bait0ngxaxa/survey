import { z } from "zod";
import {
    ALCOHOL_OPTIONS,
    COMPLICATION_OPTIONS,
    EDUCATION_OPTIONS,
    FAMILY_SUPPORT_OPTIONS,
    FINANCIAL_STATUS_OPTIONS,
    GENDER_OPTIONS,
    INCOME_OPTIONS,
    LIVING_ARRANGEMENT_OPTIONS,
    MARITAL_STATUS_OPTIONS,
    MEDICATION_COUNT_OPTIONS,
    OCCUPATION_OPTIONS,
    OTHER_DISEASES_OPTIONS,
    PAYMENT_METHOD_OPTIONS,
    SCREENING_FREQUENCY_OPTIONS,
    SMOKING_OPTIONS,
    TREATMENT_TYPE_OPTIONS,
    WORK_SUPPORT_OPTIONS,
} from "@/config/sectionTwoData";
import { centralPart4Data } from "@/config/part4";

const requiredText = z.string().trim().min(1, "จำเป็นต้องระบุข้อมูล");
const optionalText = z.string();
const surveyMethodSchema = z.enum(["ตอบด้วยตนเอง", "สัมภาษณ์"]);
const bloodSugarKnownSchema = z.enum(["ทราบ", "ไม่ทราบ"]);
const visitDoctorSchema = z.enum(["ทุกครั้ง", "ไม่ทุกครั้ง"]);

const centralQuestionIds = centralPart4Data.flatMap((section) =>
    section.questions.map((question) => String(question.id)),
);
const centralQuestionIdSet = new Set(centralQuestionIds);

// Part 1 Schema
export const Part1DataSchema = z.object({
    bloodSugarKnown: bloodSugarKnownSchema,
    fastingLevel: optionalText,
    hba1cLevel: optionalText,
    visitDoctor: visitDoctorSchema,
    notVisitReason: optionalText,
    surveyMethod: surveyMethodSchema.optional(),
    interviewerName: optionalText.optional(),
});

// Screenings Schema
export const ScreeningsSchema = z.object({
    physical: z.enum(SCREENING_FREQUENCY_OPTIONS),
    physicalOther: z.string(),
    foot: z.enum(SCREENING_FREQUENCY_OPTIONS),
    footOther: z.string(),
    eye: z.enum(SCREENING_FREQUENCY_OPTIONS),
    eyeOther: z.string(),
    urine: z.enum(SCREENING_FREQUENCY_OPTIONS),
    urineOther: z.string(),
    lipid: z.enum(SCREENING_FREQUENCY_OPTIONS),
    lipidOther: z.string(),
    dental: z.enum(SCREENING_FREQUENCY_OPTIONS),
    dentalOther: z.string(),
    hba1c: z.enum(SCREENING_FREQUENCY_OPTIONS),
    hba1cOther: z.string(),
    other: z.string(),
    otherText: z.string(),
});

// Section Two Schema
export const SectionTwoDataSchema = z.object({
    respondentName: requiredText,
    gender: z.enum(GENDER_OPTIONS),
    age: z.string().refine(
        (val) => {
            if (!val) return true;
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 1 && num <= 120;
        },
        { message: "อายุต้องอยู่ระหว่าง 1-120 ปี" },
    ),
    birthDate: z.string(),
    education: z.enum(EDUCATION_OPTIONS),
    educationOther: z.string(),
    maritalStatus: z.enum(MARITAL_STATUS_OPTIONS),
    occupation: z.enum(OCCUPATION_OPTIONS),
    occupationOther: z.string(),
    income: z.enum(INCOME_OPTIONS),
    supportSource: z.string(),
    supportSourceOther: z.string(),
    financialStatus: z.enum(FINANCIAL_STATUS_OPTIONS),
    diabetesDuration: z.string().refine(
        (val) => {
            if (!val) return true;
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 1 && num <= 100;
        },
        { message: "ระยะเวลาต่องเป็นตัวเลขระหว่าง 1 ปีขึ้นไป" },
    ),
    diabetesAge: z.string().refine(
        (val) => {
            if (!val) return true;
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 1 && num <= 100;
        },
        { message: "อายุที่เริ่มเป็นต้องเป็นตัวเลขระหว่าง 1-120 ปี" },
    ),
    treatmentType: z.enum(TREATMENT_TYPE_OPTIONS),
    treatmentOther: z.string(),
    medicationCount: z.enum(MEDICATION_COUNT_OPTIONS),
    paymentMethod: z.enum(PAYMENT_METHOD_OPTIONS),
    paymentMethodOther: z.string(),
    livingArrangement: z.enum(LIVING_ARRANGEMENT_OPTIONS),
    livingMembers: z.string(),
    livingArrangementOther: z.string(),
    familySupport: z.enum(FAMILY_SUPPORT_OPTIONS),
    workSupport: z.enum(WORK_SUPPORT_OPTIONS),
    dietFood: z.string(),
    dietSnack: z.string(),
    dietDrink: z.string(),
    alcohol: z.enum(ALCOHOL_OPTIONS),
    alcoholYears: z.string(),
    alcoholDays: z.string(),
    smoking: z.enum(SMOKING_OPTIONS),
    smokingYears: z.string(),
    smokingAmount: z.string(),
    otherDiseases: z.enum(OTHER_DISEASES_OPTIONS),
    otherDiseasesList: z.string(),
    complications: z.array(z.enum(COMPLICATION_OPTIONS)).min(1),
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
const ScoreSchema = z.number().int().min(1).max(6);

const CentralAnswersSchema = z
    .record(z.string(), ScoreSchema)
    .superRefine((answers, context) => {
        const answerIds = Object.keys(answers);
        const hasExactIds =
            answerIds.length === centralQuestionIds.length &&
            answerIds.every((id) => centralQuestionIdSet.has(id));

        if (!hasExactIds) {
            context.addIssue({
                code: "custom",
                message: "ต้องตอบคำถามของภูมิภาคให้ครบทุกข้อและไม่มีข้อเกิน",
            });
        }
    });

export const SectionFourDataSchema = z.object({
    answers: CentralAnswersSchema.transform((obj) => {
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
    region: z.enum(["central"]),
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
