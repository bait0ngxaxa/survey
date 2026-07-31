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
import {
    getPart1ValidationIssues,
    getScreeningsValidationIssues,
    getSectionTwoValidationIssues,
} from "@/lib/validation/surveyCrossFieldRules";
import {
    isStrictDecimalString,
    isStrictDateString,
    isStrictIntegerString,
} from "@/lib/validation/strictValueValidation";

const requiredText = z.string().trim().min(1, "จำเป็นต้องระบุข้อมูล");
const optionalText = z.string();
const surveyMethodSchema = z.enum(["ตอบด้วยตนเอง", "สัมภาษณ์"]);
const bloodSugarKnownSchema = z.enum(["ทราบ", "ไม่ทราบ"]);
const visitDoctorSchema = z.enum(["ทุกครั้ง", "ไม่ทุกครั้ง"]);

const optionalIntegerString = z.string().refine(
    (value) => value === "" || isStrictIntegerString(value),
    { message: "ต้องเป็นตัวเลขจำนวนเต็ม" },
);
const optionalDecimalString = z.string().refine(
    (value) => value === "" || isStrictDecimalString(value),
    { message: "ต้องเป็นตัวเลขทศนิยม" },
);

function integerStringInRange(
    min: number,
    max: number,
    message: string,
) {
    return z.string().refine(
        (value) =>
            value === "" ||
            (isStrictIntegerString(value) &&
                Number(value) >= min &&
                Number(value) <= max),
        { message },
    );
}

const centralQuestionIds = centralPart4Data.flatMap((section) =>
    section.questions.map((question) => String(question.id)),
);
const centralQuestionIdSet = new Set(centralQuestionIds);

// Part 1 Schema
export const Part1DataSchema = z
    .object({
        bloodSugarKnown: bloodSugarKnownSchema,
        fastingLevel: optionalDecimalString,
        hba1cLevel: optionalDecimalString,
        visitDoctor: visitDoctorSchema,
        notVisitReason: optionalText,
        surveyMethod: surveyMethodSchema.optional(),
        interviewerName: optionalText.optional(),
    })
    .superRefine((part1Data, context) => {
        for (const issue of getPart1ValidationIssues(part1Data)) {
            context.addIssue({
                code: "custom",
                path: issue.path,
                message: issue.message,
            });
        }
    });

// Screenings Schema
export const ScreeningsSchema = z
    .object({
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
    })
    .superRefine((screenings, context) => {
        for (const issue of getScreeningsValidationIssues(screenings)) {
            context.addIssue({
                code: "custom",
                path: issue.path,
                message: issue.message,
            });
        }
    });

// Section Two Schema
export const SectionTwoDataSchema = z.object({
    respondentName: requiredText,
    gender: z.enum(GENDER_OPTIONS),
    age: integerStringInRange(1, 120, "อายุต้องอยู่ระหว่าง 1-120 ปี"),
    birthDate: z.string().refine(
        (value) => value === "" || isStrictDateString(value),
        {
            message:
                "วันเกิดต้องอยู่ในรูปแบบ YYYY-MM-DD และเป็นวันที่ถูกต้อง",
        },
    ),
    education: z.enum(EDUCATION_OPTIONS),
    educationOther: z.string(),
    maritalStatus: z.enum(MARITAL_STATUS_OPTIONS),
    occupation: z.enum(OCCUPATION_OPTIONS),
    occupationOther: z.string(),
    income: z.enum(INCOME_OPTIONS),
    supportSource: z.string(),
    supportSourceOther: z.string(),
    financialStatus: z.enum(FINANCIAL_STATUS_OPTIONS),
    diabetesDuration: integerStringInRange(
        1,
        100,
        "ระยะเวลาต่องเป็นตัวเลขระหว่าง 1 ปีขึ้นไป",
    ),
    diabetesAge: integerStringInRange(
        1,
        100,
        "อายุที่เริ่มเป็นต้องเป็นตัวเลขระหว่าง 1-120 ปี",
    ),
    treatmentType: z.enum(TREATMENT_TYPE_OPTIONS),
    treatmentOther: z.string(),
    medicationCount: z.enum(MEDICATION_COUNT_OPTIONS),
    paymentMethod: z.enum(PAYMENT_METHOD_OPTIONS),
    paymentMethodOther: z.string(),
    livingArrangement: z.enum(LIVING_ARRANGEMENT_OPTIONS),
    livingMembers: optionalIntegerString,
    livingArrangementOther: z.string(),
    familySupport: z.enum(FAMILY_SUPPORT_OPTIONS),
    workSupport: z.enum(WORK_SUPPORT_OPTIONS),
    dietFood: z.string(),
    dietSnack: z.string(),
    dietDrink: z.string(),
    alcohol: z.enum(ALCOHOL_OPTIONS),
    alcoholYears: optionalIntegerString,
    alcoholDays: optionalIntegerString,
    smoking: z.enum(SMOKING_OPTIONS),
    smokingYears: optionalIntegerString,
    smokingAmount: optionalIntegerString,
    otherDiseases: z.enum(OTHER_DISEASES_OPTIONS),
    otherDiseasesList: z.string(),
    complications: z.array(z.enum(COMPLICATION_OPTIONS)).min(1),
    complicationsOther: z.string(),
    screenings: ScreeningsSchema,
    adviceReceived: z.string(),
    adviceCount: optionalIntegerString,
    adviceCountUnknown: z.boolean(),
    adviceTopics: z.string(),
    adviceSources: z.record(z.string(), z.string()),
    peerDiscussion: z.string(),
    peerDiscussionTopic: z.string(),
    activities: z.string(),
    activitiesTopic: z.string(),
    admissions: z.string(),
    admissionCount: optionalIntegerString,
    admissionReason: z.string(),
}).superRefine((sectionTwoData, context) => {
    for (const issue of getSectionTwoValidationIssues(sectionTwoData)) {
        context.addIssue({
            code: "custom",
            path: issue.path,
            message: issue.message,
        });
    }
});

// Medical Record Schema
export const MedicalRecordDataSchema = z.object({
    bloodSugar: optionalDecimalString,
    hba1c: optionalDecimalString,
    bloodPressure: z.string(),
    microAlbumin: z.string(),
    microAlbuminRatio: optionalDecimalString,
    microAlbuminOther: z.string(),
    creatinine: optionalDecimalString,
    weight: optionalDecimalString,
    lipid_tchol: optionalDecimalString,
    lipid_tg: optionalDecimalString,
    lipid_ldl: optionalDecimalString,
    lipid_hdl: optionalDecimalString,
    otherDiseases: z.string(),
    diabetesDurationYears: optionalIntegerString,
    diabetesDurationMonths: optionalIntegerString,
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

const AdditionalInfoSchema = z.object({
    movementLimit: z.boolean().optional(),
    tired: z.boolean().optional(),
    q9Topic: z.string().max(1000).optional(),
});

// Section Four Schema - JSON keys are always strings, so we validate string keys and transform
const ScoreSchema = z.number().int().min(1).max(6);

export const SubmissionTokenSchema = z.string().uuid("Invalid submission token");

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
            const numKey = Number(key);
            if (Number.isInteger(numKey)) {
                result[numKey] = value;
            }
        }
        return result;
    }),
    additionalInfo: AdditionalInfoSchema.optional(),
    // Kept for backward-compatible callers; submitSurvey never trusts or persists it.
    reportData: z.unknown().optional(),
});

// Main Survey Submission Schema
export const SurveySubmissionInputSchema = z.object({
    submissionToken: SubmissionTokenSchema,
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
