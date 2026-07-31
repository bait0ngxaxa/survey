import {
    NO_COMPLICATIONS_OPTION,
    REQUIRED_SCREENINGS,
    SCREENING_LABELS,
} from "@/config/sectionTwoData";
import { type Part1Data, type SectionTwoData } from "@/lib/types";

export interface ValidationIssue {
    path: string[];
    message: string;
}

function isBlank(value: unknown): boolean {
    return typeof value !== "string" || value.trim().length === 0;
}

export function getPart1ValidationIssues(
    part1Data: Part1Data,
): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    if (
        part1Data.surveyMethod === "สัมภาษณ์" &&
        isBlank(part1Data.interviewerName)
    ) {
        issues.push({
            path: ["interviewerName"],
            message: "กรุณาระบุชื่อผู้สัมภาษณ์",
        });
    }

    if (isBlank(part1Data.bloodSugarKnown)) {
        issues.push({
            path: ["bloodSugarKnown"],
            message: "กรุณาระบุว่าท่านทราบผลการตรวจระดับน้ำตาลหรือไม่",
        });
    } else if (
        part1Data.bloodSugarKnown === "ทราบ" &&
        (isBlank(part1Data.fastingLevel) || isBlank(part1Data.hba1cLevel))
    ) {
        issues.push({
            path: [
                isBlank(part1Data.fastingLevel)
                    ? "fastingLevel"
                    : "hba1cLevel",
            ],
            message: "กรุณาระบุระดับน้ำตาลในเลือดและค่าน้ำตาลสะสม",
        });
    }

    if (isBlank(part1Data.visitDoctor)) {
        issues.push({
            path: ["visitDoctor"],
            message: "กรุณาระบุว่าท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่",
        });
    } else if (
        part1Data.visitDoctor === "ไม่ทุกครั้ง" &&
        isBlank(part1Data.notVisitReason)
    ) {
        issues.push({
            path: ["notVisitReason"],
            message: "กรุณาระบุสาเหตุที่ไม่ได้มาพบแพทย์ทุกครั้ง",
        });
    }

    return issues;
}

export function getSectionTwoValidationIssues(
    formData: SectionTwoData,
): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    if (isBlank(formData.age) && isBlank(formData.birthDate)) {
        issues.push({
            path: ["age"],
            message: "กรุณากรอกอายุหรือวันเกิด (ข้อ 2)",
        });
    }

    if (
        (formData.education === "สูงกว่าปริญญาตรี" ||
            formData.education === "อื่น ๆ") &&
        isBlank(formData.educationOther)
    ) {
        issues.push({
            path: ["educationOther"],
            message: "กรุณาระบุรายละเอียดระดับการศึกษา (ข้อ 3)",
        });
    }

    if (formData.occupation === "อื่น ๆ" && isBlank(formData.occupationOther)) {
        issues.push({
            path: ["occupationOther"],
            message: "กรุณาระบุอาชีพ (ข้อ 5)",
        });
    }

    if (formData.occupation === "ไม่ได้ประกอบอาชีพ") {
        if (isBlank(formData.supportSource)) {
            issues.push({
                path: ["supportSource"],
                message: "กรุณาเลือกแหล่งเงินสนับสนุน (ข้อ 7)",
            });
        } else if (
            formData.supportSource === "อื่น ๆ" &&
            isBlank(formData.supportSourceOther)
        ) {
            issues.push({
                path: ["supportSourceOther"],
                message: "กรุณาระบุแหล่งเงินสนับสนุน (ข้อ 7)",
            });
        }
    }

    if (isBlank(formData.diabetesDuration) && isBlank(formData.diabetesAge)) {
        issues.push({
            path: ["diabetesDuration"],
            message: "กรุณากรอกระยะเวลาเป็นเบาหวานหรืออายุที่เริ่มเป็น (ข้อ 9)",
        });
    }

    if (
        formData.treatmentType === "อื่น ๆ" &&
        isBlank(formData.treatmentOther)
    ) {
        issues.push({
            path: ["treatmentOther"],
            message: "กรุณาระบุรูปแบบการรักษา (ข้อ 10)",
        });
    }

    if (
        formData.paymentMethod === "อื่น ๆ" &&
        isBlank(formData.paymentMethodOther)
    ) {
        issues.push({
            path: ["paymentMethodOther"],
            message: "กรุณาระบุวิธีจ่ายค่ารักษาพยาบาล (ข้อ 12)",
        });
    }

    if (
        (formData.livingArrangement === "อยู่กับคู่สมรสและบุตร/หลาน" ||
            formData.livingArrangement === "อยู่กับญาติ/เพื่อน") &&
        isBlank(formData.livingMembers)
    ) {
        issues.push({
            path: ["livingMembers"],
            message: "กรุณากรอกจำนวนสมาชิก (ข้อ 13)",
        });
    }

    if (
        formData.livingArrangement === "อื่น ๆ" &&
        isBlank(formData.livingArrangementOther)
    ) {
        issues.push({
            path: ["livingArrangementOther"],
            message: "กรุณาระบุการอยู่อาศัย (ข้อ 13)",
        });
    }

    if (
        isBlank(formData.dietFood) &&
        isBlank(formData.dietSnack) &&
        isBlank(formData.dietDrink)
    ) {
        issues.push({
            path: ["dietFood"],
            message:
                "กรุณากรอกรายการอาหาร/เครื่องดื่มอย่างน้อย 1 รายการ (ข้อ 16)",
        });
    }

    if (formData.alcohol === "เลิกดื่มแล้ว" && isBlank(formData.alcoholYears)) {
        issues.push({
            path: ["alcoholYears"],
            message: "กรุณากรอกจำนวนปีที่เลิกดื่ม (ข้อ 17)",
        });
    }

    if (formData.alcohol === "ดื่มเป็นประจำ" && isBlank(formData.alcoholDays)) {
        issues.push({
            path: ["alcoholDays"],
            message: "กรุณากรอกจำนวนวันที่ดื่มต่อสัปดาห์ (ข้อ 17)",
        });
    }

    if (formData.smoking === "เลิกสูบแล้ว" && isBlank(formData.smokingYears)) {
        issues.push({
            path: ["smokingYears"],
            message: "กรุณากรอกจำนวนปีที่เลิกสูบ (ข้อ 18)",
        });
    }

    if (formData.smoking === "สูบเป็นประจำ" && isBlank(formData.smokingAmount)) {
        issues.push({
            path: ["smokingAmount"],
            message: "กรุณากรอกจำนวนมวนที่สูบต่อวัน (ข้อ 18)",
        });
    }

    if (formData.otherDiseases === "มี" && isBlank(formData.otherDiseasesList)) {
        issues.push({
            path: ["otherDiseasesList"],
            message: "กรุณาระบุรายชื่อโรค (ข้อ 19)",
        });
    }

    if (
        Array.isArray(formData.complications) &&
        formData.complications.includes(NO_COMPLICATIONS_OPTION) &&
        formData.complications.length > 1
    ) {
        issues.push({
            path: ["complications"],
            message:
                "กรุณาเลือกไม่มีภาวะแทรกซ้อนเพียงอย่างเดียว หรือเลือกภาวะแทรกซ้อนอื่น (ข้อ 20)",
        });
    }

    if (
        Array.isArray(formData.complications) &&
        formData.complications.includes("อื่น ๆ") &&
        isBlank(formData.complicationsOther)
    ) {
        issues.push({
            path: ["complicationsOther"],
            message: "กรุณาระบุภาวะแทรกซ้อนอื่นๆ (ข้อ 20)",
        });
    }

    return issues;
}

export function getScreeningsValidationIssues(
    screenings: SectionTwoData["screenings"],
): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    for (const screening of REQUIRED_SCREENINGS) {
        const value = screenings[screening];
        const label = SCREENING_LABELS[screening] || screening;

        if (isBlank(value)) {
            issues.push({
                path: [screening],
                message: `กรุณาเลือกความถี่การตรวจ${label} (ข้อ 21)`,
            });
        } else if (value === "อื่น ๆ") {
            const otherKey = `${screening}Other` as keyof typeof screenings;
            if (isBlank(screenings[otherKey])) {
                issues.push({
                    path: [otherKey],
                    message: `กรุณาระบุรายละเอียดความถี่การตรวจ${label} (ข้อ 21)`,
                });
            }
        }
    }

    return issues;
}
