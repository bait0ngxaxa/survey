import { type SectionTwoData } from "../types";
import {
    getScreeningsValidationIssues,
    getSectionTwoValidationIssues,
} from "./surveyCrossFieldRules";
import {
    isStrictDateString,
    isStrictIntegerString,
} from "./strictValueValidation";

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

function validateDemographics(formData: SectionTwoData): string[] {
    const errors: string[] = [];

    // 1. Gender
    if (!formData.gender) {
        errors.push("กรุณาเลือกเพศ (ข้อ 1)");
    }

    // 2. Age format
    if (formData.age) {
        const ageNum = isStrictIntegerString(formData.age)
            ? Number(formData.age)
            : Number.NaN;
        if (Number.isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
            errors.push("อายุต้องอยู่ระหว่าง 1-120 ปี (ข้อ 2)");
        }
    }

    if (formData.birthDate && !isStrictDateString(formData.birthDate)) {
        errors.push("กรุณาระบุวันเกิดให้ถูกต้อง (ข้อ 2)");
    }

    // 3. Education
    if (!formData.education) {
        errors.push("กรุณาเลือกระดับการศึกษา (ข้อ 3)");
    }
    // 4. Marital Status
    if (!formData.maritalStatus) {
        errors.push("กรุณาเลือกสถานภาพสมรส (ข้อ 4)");
    }

    // 5. Occupation
    if (!formData.occupation) {
        errors.push("กรุณาเลือกอาชีพ (ข้อ 5)");
    }
    // 6. Income
    if (!formData.income) {
        errors.push("กรุณาเลือกรายได้เฉลี่ยต่อเดือน (ข้อ 6)");
    }

    // 8. Financial Status
    if (!formData.financialStatus) {
        errors.push("กรุณาเลือกเศรษฐกิจครอบครัว (ข้อ 8)");
    }

    return errors;
}

function validateDiabetesInfo(formData: SectionTwoData): string[] {
    const errors: string[] = [];

    // 9. Diabetes Duration and age formats
    if (formData.diabetesDuration) {
        const duration = isStrictIntegerString(formData.diabetesDuration)
            ? Number(formData.diabetesDuration)
            : Number.NaN;
        if (Number.isNaN(duration) || duration < 1 || duration >= 100) {
            errors.push(
                "กรุณาระบุตัวเลขระยะเวลาการเป็นเบาหวานให้ถูกต้อง (ข้อ 9)",
            );
        }
    }
    if (formData.diabetesAge) {
        const age = isStrictIntegerString(formData.diabetesAge)
            ? Number(formData.diabetesAge)
            : Number.NaN;
        if (Number.isNaN(age) || age < 1 || age >= 100) {
            errors.push(
                "กรุณาระบุตัวเลขอายุที่เริ่มเป็นเบาหวานให้ถูกต้อง (ข้อ 9)",
            );
        }
    }

    // 10. Treatment Type
    if (!formData.treatmentType) {
        errors.push("กรุณาเลือกรูปแบบการรักษา (ข้อ 10)");
    }
    // 11. Medication Count
    if (!formData.medicationCount) {
        errors.push("กรุณาเลือกจำนวนยาที่ได้รับ (ข้อ 11)");
    }

    // 12. Payment Method
    if (!formData.paymentMethod) {
        errors.push("กรุณาเลือกวิธีจ่ายค่ารักษาพยาบาล (ข้อ 12)");
    }
    return errors;
}

function validateLivingAndSupport(formData: SectionTwoData): string[] {
    const errors: string[] = [];

    // 13. Living Arrangement
    if (!formData.livingArrangement) {
        errors.push("กรุณาเลือกการอยู่อาศัย (ข้อ 13)");
    }
    // 14. Family Support
    if (!formData.familySupport) {
        errors.push("กรุณาเลือกการสนับสนุนจากครอบครัว (ข้อ 14)");
    }

    // 15. Work Support
    if (!formData.workSupport) {
        errors.push("กรุณาเลือกการสนับสนุนจากที่ทำงาน (ข้อ 15)");
    }

    return errors;
}

function validateLifestyle(formData: SectionTwoData): string[] {
    const errors: string[] = [];

    // 17. Alcohol
    if (!formData.alcohol) {
        errors.push("กรุณาเลือกการดื่มแอลกอฮอล์ (ข้อ 17)");
    }
    // 18. Smoking
    if (!formData.smoking) {
        errors.push("กรุณาเลือกการสูบบุหรี่ (ข้อ 18)");
    }
    return errors;
}

function validateHealthConditions(formData: SectionTwoData): string[] {
    const errors: string[] = [];

    // 19. Other Diseases
    if (!formData.otherDiseases) {
        errors.push("กรุณาเลือกว่ามีโรคอื่นร่วมด้วยหรือไม่ (ข้อ 19)");
    }
    // 20. Complications
    if (formData.complications.length === 0) {
        errors.push("กรุณาเลือกภาวะแทรกซ้อน (ข้อ 20)");
    }

    return errors;
}

export function validateSectionTwo(formData: SectionTwoData): ValidationResult {
    const errors: string[] = [
        ...validateDemographics(formData),
        ...validateDiabetesInfo(formData),
        ...validateLivingAndSupport(formData),
        ...validateLifestyle(formData),
        ...validateHealthConditions(formData),
        ...getSectionTwoValidationIssues(formData).map(
            (issue) => issue.message,
        ),
        ...getScreeningsValidationIssues(formData.screenings).map(
            (issue) => issue.message,
        ),
    ];

    return {
        isValid: errors.length === 0,
        errors,
    };
}
