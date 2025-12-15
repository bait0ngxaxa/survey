import { SectionTwoData } from "../types";
import { REQUIRED_SCREENINGS, SCREENING_LABELS } from "@/config/sectionTwoData";

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export function validateSectionTwo(formData: SectionTwoData): ValidationResult {
    const errors: string[] = [];

    // 1. Gender
    if (!formData.gender) {
        errors.push("กรุณาเลือกเพศ (ข้อ 1)");
    }

    // 2. Age or Birth Date
    if (!formData.age && !formData.birthDate) {
        errors.push("กรุณากรอกอายุหรือวันเกิด (ข้อ 2)");
    }

    // 3. Education
    if (!formData.education) {
        errors.push("กรุณาเลือกระดับการศึกษา (ข้อ 3)");
    }
    if (
        (formData.education === "สูงกว่าปริญญาตรี" ||
            formData.education === "อื่น ๆ") &&
        !formData.educationOther
    ) {
        errors.push("กรุณาระบุรายละเอียดระดับการศึกษา (ข้อ 3)");
    }

    // 4. Marital Status
    if (!formData.maritalStatus) {
        errors.push("กรุณาเลือกสถานภาพสมรส (ข้อ 4)");
    }

    // 5. Occupation
    if (!formData.occupation) {
        errors.push("กรุณาเลือกอาชีพ (ข้อ 5)");
    }
    if (formData.occupation === "อื่น ๆ" && !formData.occupationOther) {
        errors.push("กรุณาระบุอาชีพ (ข้อ 5)");
    }

    // 6. Income
    if (!formData.income) {
        errors.push("กรุณาเลือกรายได้เฉลี่ยต่อเดือน (ข้อ 6)");
    }

    // 7. Support Source (only if not working)
    if (formData.occupation === "ไม่ได้ประกอบอาชีพ") {
        if (!formData.supportSource) {
            errors.push("กรุณาเลือกแหล่งเงินสนับสนุน (ข้อ 7)");
        }
        if (
            formData.supportSource === "อื่น ๆ" &&
            !formData.supportSourceOther
        ) {
            errors.push("กรุณาระบุแหล่งเงินสนับสนุน (ข้อ 7)");
        }
    }

    // 8. Financial Status
    if (!formData.financialStatus) {
        errors.push("กรุณาเลือกเศรษฐกิจครอบครัว (ข้อ 8)");
    }

    // 9. Diabetes Duration (at least one: duration or age of onset)
    if (!formData.diabetesDuration && !formData.diabetesAge) {
        errors.push("กรุณากรอกระยะเวลาเป็นเบาหวานหรืออายุที่เริ่มเป็น (ข้อ 9)");
    }

    // 10. Treatment Type
    if (!formData.treatmentType) {
        errors.push("กรุณาเลือกรูปแบบการรักษา (ข้อ 10)");
    }
    if (formData.treatmentType === "อื่น ๆ" && !formData.treatmentOther) {
        errors.push("กรุณาระบุรูปแบบการรักษา (ข้อ 10)");
    }

    // 11. Medication Count
    if (!formData.medicationCount) {
        errors.push("กรุณาเลือกจำนวนยาที่ได้รับ (ข้อ 11)");
    }

    // 12. Payment Method
    if (!formData.paymentMethod) {
        errors.push("กรุณาเลือกวิธีจ่ายค่ารักษาพยาบาล (ข้อ 12)");
    }
    if (formData.paymentMethod === "อื่น ๆ" && !formData.paymentMethodOther) {
        errors.push("กรุณาระบุวิธีจ่ายค่ารักษาพยาบาล (ข้อ 12)");
    }

    // 13. Living Arrangement
    if (!formData.livingArrangement) {
        errors.push("กรุณาเลือกการอยู่อาศัย (ข้อ 13)");
    }
    if (
        (formData.livingArrangement === "อยู่กับคู่สมรสและบุตร/หลาน" ||
            formData.livingArrangement === "อยู่กับญาติ/เพื่อน") &&
        !formData.livingMembers
    ) {
        errors.push("กรุณากรอกจำนวนสมาชิก (ข้อ 13)");
    }
    if (
        formData.livingArrangement === "อื่น ๆ" &&
        !formData.livingArrangementOther
    ) {
        errors.push("กรุณาระบุการอยู่อาศัย (ข้อ 13)");
    }

    // 14. Family Support
    if (!formData.familySupport) {
        errors.push("กรุณาเลือกการสนับสนุนจากครอบครัว (ข้อ 14)");
    }

    // 15. Work Support
    if (!formData.workSupport) {
        errors.push("กรุณาเลือกการสนับสนุนจากที่ทำงาน (ข้อ 15)");
    }

    // 16. Diet - at least one field filled
    if (!formData.dietFood && !formData.dietSnack && !formData.dietDrink) {
        errors.push(
            "กรุณากรอกรายการอาหาร/เครื่องดื่มอย่างน้อย 1 รายการ (ข้อ 16)"
        );
    }

    // 17. Alcohol
    if (!formData.alcohol) {
        errors.push("กรุณาเลือกการดื่มแอลกอฮอล์ (ข้อ 17)");
    }
    if (formData.alcohol === "เลิกดื่มแล้ว" && !formData.alcoholYears) {
        errors.push("กรุณากรอกจำนวนปีที่เลิกดื่ม (ข้อ 17)");
    }
    if (formData.alcohol === "ดื่มเป็นประจำ" && !formData.alcoholDays) {
        errors.push("กรุณากรอกจำนวนวันที่ดื่มต่อสัปดาห์ (ข้อ 17)");
    }

    // 18. Smoking
    if (!formData.smoking) {
        errors.push("กรุณาเลือกการสูบบุหรี่ (ข้อ 18)");
    }
    if (formData.smoking === "เลิกสูบแล้ว" && !formData.smokingYears) {
        errors.push("กรุณากรอกจำนวนปีที่เลิกสูบ (ข้อ 18)");
    }
    if (formData.smoking === "สูบเป็นประจำ" && !formData.smokingAmount) {
        errors.push("กรุณากรอกจำนวนมวนที่สูบต่อวัน (ข้อ 18)");
    }

    // 19. Other Diseases
    if (!formData.otherDiseases) {
        errors.push("กรุณาเลือกว่ามีโรคอื่นร่วมด้วยหรือไม่ (ข้อ 19)");
    }
    if (formData.otherDiseases === "มี" && !formData.otherDiseasesList) {
        errors.push("กรุณาระบุรายชื่อโรค (ข้อ 19)");
    }

    // 20. Complications
    if (formData.complications.length === 0) {
        errors.push("กรุณาเลือกภาวะแทรกซ้อน (ข้อ 20)");
    }
    if (
        formData.complications.includes("อื่น ๆ") &&
        !formData.complicationsOther
    ) {
        errors.push("กรุณาระบุภาวะแทรกซ้อนอื่นๆ (ข้อ 20)");
    }

    // 21. Screenings - at least main screenings must be filled
    for (const screening of REQUIRED_SCREENINGS) {
        if (!formData.screenings[screening]) {
            const label = SCREENING_LABELS[screening] || screening;
            errors.push(`กรุณาเลือกความถี่การตรวจ${label} (ข้อ 21)`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}
