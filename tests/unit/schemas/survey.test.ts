import { describe, expect, it } from "vitest";
import {
    SurveySubmissionInputSchema,
    type SurveySubmissionInputValidated,
} from "@/lib/schemas";
import { createValidSurveySubmission } from "@/tests/fixtures/surveySubmission";

type InvalidInputFactory = () => SurveySubmissionInputValidated;

const crossFieldCases: Array<[string, InvalidInputFactory]> = [
    ["age and birth date are both empty", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            age: "",
            birthDate: "",
        };
        return data;
    }],
    ["known blood sugar has no levels", () => {
        const data = createValidSurveySubmission();
        data.part1 = {
            ...data.part1,
            bloodSugarKnown: "ทราบ",
            fastingLevel: "",
            hba1cLevel: "",
        };
        return data;
    }],
    ["not visiting every time has no reason", () => {
        const data = createValidSurveySubmission();
        data.part1 = {
            ...data.part1,
            visitDoctor: "ไม่ทุกครั้ง",
            notVisitReason: "",
        };
        return data;
    }],
    ["interview has no interviewer name", () => {
        const data = createValidSurveySubmission();
        data.part1 = {
            ...data.part1,
            surveyMethod: "สัมภาษณ์",
            interviewerName: "",
        };
        return data;
    }],
    ["education other has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            education: "อื่น ๆ",
            educationOther: "",
        };
        return data;
    }],
    ["occupation other has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            occupation: "อื่น ๆ",
            occupationOther: "",
        };
        return data;
    }],
    ["support source other has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            occupation: "ไม่ได้ประกอบอาชีพ",
            supportSource: "อื่น ๆ",
            supportSourceOther: "",
        };
        return data;
    }],
    ["treatment other has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            treatmentType: "อื่น ๆ",
            treatmentOther: "",
        };
        return data;
    }],
    ["payment method other has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            paymentMethod: "อื่น ๆ",
            paymentMethodOther: "",
        };
        return data;
    }],
    ["living arrangement other has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            livingArrangement: "อื่น ๆ",
            livingArrangementOther: "",
        };
        return data;
    }],
    ["living arrangement requiring members has no member count", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            livingArrangement: "อยู่กับญาติ/เพื่อน",
            livingMembers: "",
        };
        return data;
    }],
    ["regular drinking has no quantity", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            alcohol: "ดื่มเป็นประจำ",
            alcoholDays: "",
        };
        return data;
    }],
    ["regular smoking has no quantity", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            smoking: "สูบเป็นประจำ",
            smokingAmount: "",
        };
        return data;
    }],
    ["other disease has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            otherDiseases: "มี",
            otherDiseasesList: "",
        };
        return data;
    }],
    ["other complication has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            complications: ["อื่น ๆ"],
            complicationsOther: "",
        };
        return data;
    }],
    ["other screening frequency has no detail", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            screenings: {
                ...data.sectionTwo.screenings,
                physical: "อื่น ๆ",
                physicalOther: "",
            },
        };
        return data;
    }],
    ["diabetes duration and onset age are both empty", () => {
        const data = createValidSurveySubmission();
        data.sectionTwo = {
            ...data.sectionTwo,
            diabetesDuration: "",
            diabetesAge: "",
        };
        return data;
    }],
];

describe("SurveySubmissionInputSchema cross-field validation", () => {
    it.each(crossFieldCases)("rejects when %s", (_name, createInvalidInput) => {
        const result = SurveySubmissionInputSchema.safeParse(
            createInvalidInput(),
        );

        expect(result.success).toBe(false);
    });

    it("accepts a complete submission with conditional details", () => {
        const data = createValidSurveySubmission();
        data.part1 = {
            ...data.part1,
            bloodSugarKnown: "ทราบ",
            fastingLevel: "100",
            hba1cLevel: "6.5",
            visitDoctor: "ไม่ทุกครั้ง",
            notVisitReason: "ไม่สะดวก",
            surveyMethod: "สัมภาษณ์",
            interviewerName: "ผู้สัมภาษณ์",
        };
        data.sectionTwo = {
            ...data.sectionTwo,
            age: "",
            birthDate: "1990-01-01",
            education: "อื่น ๆ",
            educationOther: "การศึกษานอกระบบ",
            occupation: "ไม่ได้ประกอบอาชีพ",
            supportSource: "อื่น ๆ",
            supportSourceOther: "บุตร",
            diabetesDuration: "",
            diabetesAge: "40",
            treatmentType: "อื่น ๆ",
            treatmentOther: "สมุนไพร",
            paymentMethod: "อื่น ๆ",
            paymentMethodOther: "กองทุน",
            livingArrangement: "อยู่กับญาติ/เพื่อน",
            livingMembers: "2",
            dietFood: "ข้าว",
            alcohol: "ดื่มเป็นประจำ",
            alcoholDays: "2",
            smoking: "สูบเป็นประจำ",
            smokingAmount: "3",
            otherDiseases: "มี",
            otherDiseasesList: "ความดันโลหิตสูง",
            complications: ["อื่น ๆ"],
            complicationsOther: "ภาวะแทรกซ้อนอื่น",
            screenings: {
                ...data.sectionTwo.screenings,
                physical: "อื่น ๆ",
                physicalOther: "ตามแพทย์นัด",
            },
        };

        const result = SurveySubmissionInputSchema.safeParse(data);

        expect(result.success).toBe(true);
    });

    it("returns a validation failure for malformed field types", () => {
        const validData = createValidSurveySubmission();
        const input: unknown = {
            ...validData,
            sectionTwo: {
                ...validData.sectionTwo,
                complications: null,
            },
        };

        const result = SurveySubmissionInputSchema.safeParse(input);

        expect(result.success).toBe(false);
    });
});
