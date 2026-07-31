import {
    initialMedicalRecordData,
    initialPart1Data,
    initialSectionTwoData,
} from "@/lib/initialData";
import { type SurveySubmissionInputValidated } from "@/lib/schemas";

export function createCompleteCentralAnswers(
    score = 4,
): Record<number, number> {
    return Object.fromEntries(
        Array.from({ length: 29 }, (_, index) => [index + 1, score]),
    );
}

export function createValidSurveySubmission(): SurveySubmissionInputValidated {
    return {
        submissionToken: crypto.randomUUID(),
        region: "central" as const,
        part1: {
            ...initialPart1Data,
            bloodSugarKnown: "ไม่ทราบ" as const,
            visitDoctor: "ทุกครั้ง" as const,
            surveyMethod: "ตอบด้วยตนเอง" as const,
        },
        sectionTwo: {
            ...initialSectionTwoData,
            respondentName: "ผู้ทดสอบ ระบบ",
            gender: "ชาย" as const,
            age: "45",
            education: "ปริญญาตรี" as const,
            maritalStatus: "โสด" as const,
            occupation: "ข้าราชการ/พนักงานรัฐวิสาหกิจ" as const,
            income: "ตั้งแต่10,001 – 20,000 บาท" as const,
            financialStatus: "เพียงพอในการใช้จ่าย" as const,
            diabetesDuration: "5",
            treatmentType: "ใช้ยารับประทาน" as const,
            medicationCount: "1- 5 รายการ" as const,
            paymentMethod: "บัตรทอง 30 บาท" as const,
            livingArrangement: "อยู่คนเดียว" as const,
            familySupport: "มี" as const,
            workSupport: "มี" as const,
            dietFood: "ข้าว",
            alcohol: "ไม่เคยดื่ม" as const,
            smoking: "ไม่เคยสูบ" as const,
            otherDiseases: "ไม่มี" as const,
            complications: ["ไม่มีภาวะแทรกซ้อน" as const],
            screenings: {
                ...initialSectionTwoData.screenings,
                physical: "ทุก 3 เดือน" as const,
                foot: "ทุก 3 เดือน" as const,
                eye: "ทุก 3 เดือน" as const,
                urine: "ทุก 3 เดือน" as const,
                lipid: "ทุก 3 เดือน" as const,
                dental: "ทุก 3 เดือน" as const,
                hba1c: "ทุก 3 เดือน" as const,
            },
        },
        medicalRecord: { ...initialMedicalRecordData },
        sectionFour: {
            answers: createCompleteCentralAnswers(),
            reportData: {},
        },
    };
}
