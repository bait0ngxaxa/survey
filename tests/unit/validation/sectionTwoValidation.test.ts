import { describe, it, expect } from "vitest";
import { validateSectionTwo } from "@/lib/validation/sectionTwoValidation";
import { type SectionTwoData } from "@/lib/types";

// Helper to create a valid base object
const createValidData = (): SectionTwoData => ({
    respondentName: "Test User",
    gender: "ชาย",
    age: "50",
    birthDate: "",
    education: "ปริญญาตรี",
    educationOther: "",
    maritalStatus: "โสด",
    occupation: "ข้าราชการ",
    occupationOther: "",
    income: "มากกว่า 30,001 บาท",
    supportSource: "",
    supportSourceOther: "",
    financialStatus: "เพียงพอในการใช้จ่าย",
    diabetesDuration: "5",
    diabetesAge: "",
    treatmentType: "ใช้ยารับประทาน",
    treatmentOther: "",
    medicationCount: "1- 5 รายการ",
    paymentMethod: "จ่ายเอง",
    paymentMethodOther: "",
    livingArrangement: "อยู่คนเดียว",
    livingMembers: "",
    livingArrangementOther: "",
    familySupport: "มี",
    workSupport: "มี",
    dietFood: "Vegetables",
    dietSnack: "",
    dietDrink: "",
    alcohol: "ไม่เคยดื่ม",
    alcoholYears: "",
    alcoholDays: "",
    smoking: "ไม่เคยสูบ",
    smokingYears: "",
    smokingAmount: "",
    otherDiseases: "ไม่มี",
    otherDiseasesList: "",
    complications: ["ไม่มีภาวะแทรกซ้อน"],
    complicationsOther: "",
    screenings: {
        physical: "ทุก 1 ปี",
        foot: "ทุก 1 ปี",
        eye: "ทุก 1 ปี",
        urine: "ทุก 1 ปี",
        lipid: "ทุก 1 ปี",
        dental: "ทุก 1 ปี",
        hba1c: "ทุก 1 ปี",
        physicalOther: "",
        footOther: "",
        eyeOther: "",
        urineOther: "",
        lipidOther: "",
        dentalOther: "",
        hba1cOther: "",
        other: "",
        otherText: "",
    },
    adviceReceived: "เคย",
    adviceCount: "1",
    adviceCountUnknown: false,
    adviceTopics: "Diet",
    adviceSources: {},
    peerDiscussion: "เคย",
    peerDiscussionTopic: "Exercise",
    activities: "เคย",
    activitiesTopic: "Walk",
    admissions: "ไม่เคย",
    admissionCount: "",
    admissionReason: "",
});

describe("Section Two Validation", () => {
    describe("Happy Path", () => {
        it("should return valid for complete data", () => {
            const data = createValidData();
            const result = validateSectionTwo(data);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("Diabetes Info Validation", () => {
        it("should error if diabetes duration is negative", () => {
            const data = createValidData();
            data.diabetesDuration = "-5";
            const result = validateSectionTwo(data);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain(
                "กรุณาระบุตัวเลขระยะเวลาการเป็นเบาหวานให้ถูกต้อง (ข้อ 9)",
            );
        });

        it("should error if diabetes age is negative", () => {
            const data = createValidData();
            data.diabetesDuration = "";
            data.diabetesAge = "-20";
            const result = validateSectionTwo(data);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain(
                "กรุณาระบุตัวเลขอายุที่เริ่มเป็นเบาหวานให้ถูกต้อง (ข้อ 9)",
            );
        });
    });

    describe("Conditional Fields", () => {
        it("should error if Occupation is 'Other' but detail is missing", () => {
            const data = createValidData();
            data.occupation = "อื่น ๆ";
            data.occupationOther = "";
            const result = validateSectionTwo(data);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("กรุณาระบุอาชีพ (ข้อ 5)");
        });

        it("should error if Alcohol is 'Drinking' but frequency is missing", () => {
            const data = createValidData();
            data.alcohol = "ดื่มเป็นประจำ";
            data.alcoholDays = "";
            const result = validateSectionTwo(data);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain(
                "กรุณากรอกจำนวนวันที่ดื่มต่อสัปดาห์ (ข้อ 17)",
            );
        });
    });

    describe("Screenings Validation", () => {
        it("should error if required screening is missing", () => {
            const data = createValidData();
            data.screenings.eye = ""; // Remove eye screening
            const result = validateSectionTwo(data);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain(
                "กรุณาเลือกความถี่การตรวจตา (ข้อ 21)",
            );
        });
    });
});
