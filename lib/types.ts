export interface Part1Data {
    bloodSugarKnown: string;
    fastingLevel: string;
    hba1cLevel: string;
    visitDoctor: string;
    notVisitReason: string;
    surveyMethod?: string;
    interviewerName?: string;
}

export interface SectionTwoData {
    respondentName: string;
    gender: string;
    age: string;
    birthDate: string;
    education: string;
    educationOther: string;
    maritalStatus: string;
    occupation: string;
    occupationOther: string;
    income: string;
    supportSource: string;
    supportSourceOther: string;
    financialStatus: string;
    diabetesDuration: string;
    diabetesAge: string;
    treatmentType: string;
    treatmentOther: string;
    medicationCount: string;
    paymentMethod: string;
    paymentMethodOther: string;
    livingArrangement: string;
    livingMembers: string;
    livingArrangementOther: string;
    familySupport: string;
    workSupport: string;
    dietFood: string;
    dietSnack: string;
    dietDrink: string;
    alcohol: string;
    alcoholYears: string;
    alcoholDays: string;
    smoking: string;
    smokingYears: string;
    smokingAmount: string;
    otherDiseases: string;
    otherDiseasesList: string;
    complications: string[];
    complicationsOther: string;
    screenings: {
        physical: string;
        physicalOther: string;
        foot: string;
        footOther: string;
        eye: string;
        eyeOther: string;
        urine: string;
        urineOther: string;
        lipid: string;
        lipidOther: string;
        dental: string;
        dentalOther: string;
        hba1c: string;
        hba1cOther: string;
        other: string;
        otherText: string;
    };
    adviceReceived: string;
    adviceCount: string;
    adviceCountUnknown: boolean;
    adviceTopics: string;
    adviceSources: Record<string, string>;
    peerDiscussion: string;
    peerDiscussionTopic: string;
    activities: string;
    activitiesTopic: string;
    admissions: string;
    admissionCount: string;
    admissionReason: string;
}

export interface MedicalRecordData {
    bloodSugar: string;
    hba1c: string;
    bloodPressure: string;
    microAlbumin: string;
    microAlbuminRatio: string;
    microAlbuminOther: string;
    creatinine: string;
    weight: string;
    lipid_tchol: string;
    lipid_tg: string;
    lipid_ldl: string;
    lipid_hdl: string;
    otherDiseases: string;
    diabetesDurationYears: string;
    diabetesDurationMonths: string;
}

// ===== Report Data Types =====

export interface ReportStepData {
    id?: number;
    dimension?: string;
    questionsLabel?: string;
    label: string;
    action: string;
    criteria: string;
    relatedUnit: string;
    avgScore?: number;
    averageScore?: number;
    additionalInfo?: AdditionalInfoData;
}

export interface AdditionalInfoData {
    movementLimit?: boolean;
    tired?: boolean;
    topic?: string;
    [key: string]: boolean | string | undefined;
}

export interface ReportData {
    [key: `step_${number}`]: ReportStepData;
}

export interface RecommendationsData {
    [key: string]: ReportStepData;
}

// ===== Raw Answers from Database =====

export interface RawAnswers {
    part1?: Part1Data;
    sectionTwo?: SectionTwoData;
    medicalRecord?: MedicalRecordData;
    sectionFour?: Record<number, number>;
    reportData?: ReportData;
}

export interface SectionFourData {
    answers: Record<number, number>;
    reportData?: ReportData;
}

// ===== Patient Types =====

export interface PatientData {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    nationalId?: string | null;
    gender?: string | null;
}

// ===== Type Guards =====

export function isRawAnswers(data: unknown): data is RawAnswers {
    return data !== null && typeof data === "object";
}

export function isReportData(data: unknown): data is ReportData {
    if (!data || typeof data !== "object") return false;
    return Object.keys(data).some((key) => key.startsWith("step_"));
}

export function isReportStepData(data: unknown): data is ReportStepData {
    if (!data || typeof data !== "object") return false;
    const step = data as Record<string, unknown>;
    return typeof step.action === "string" || typeof step.label === "string";
}

export function asRawAnswers(data: unknown): RawAnswers {
    if (isRawAnswers(data)) return data;
    return {};
}

export function asReportData(data: unknown): ReportData | undefined {
    if (isReportData(data)) return data;
    return undefined;
}
