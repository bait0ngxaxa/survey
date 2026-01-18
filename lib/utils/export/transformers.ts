import {
    type RawAnswers,
    type Part1Data,
    type SectionTwoData,
    type ReportData,
    asRawAnswers,
} from "@/lib/types";
import {
    type SubmissionData,
    type GeneralDataRow,
    type PromsDataRow,
} from "./types";
import {
    translateRegion,
    formatBirthDateThai,
    formatWithOther,
    formatScreening,
    getActionText,
} from "./helpers";

export function transformToGeneralData(
    submission: SubmissionData,
): GeneralDataRow {
    const raw: RawAnswers = asRawAnswers(submission.rawAnswers);
    const sec2: Partial<SectionTwoData> = raw.sectionTwo || {};
    const part1: Partial<Part1Data> = raw.part1 || {};
    const patient = submission.patient;
    const dateObj = new Date(submission.createdAt);
    const screenings: Partial<SectionTwoData["screenings"]> =
        sec2.screenings || {};

    return {
        วันที่: dateObj.toLocaleDateString("th-TH"),
        เวลา: dateObj.toLocaleTimeString("th-TH"),
        ID: submission.id,
        เขตสุขภาพ: translateRegion(submission.region),

        วิธีเก็บข้อมูล: part1.surveyMethod || "",
        ผู้ให้ข้อมูล: `${patient?.firstName || ""} ${
            patient?.lastName || ""
        }`.trim(),
        ผู้สัมภาษณ์: part1.interviewerName || "",

        // Part 1
        ทราบระดับน้ำตาล: part1.bloodSugarKnown || "",
        "ระดับน้ำตาลในเลือด Fasting": part1.fastingLevel || "",
        "ระดับน้ำตาลสะสม HbA1c": part1.hba1cLevel || "",
        พบแพทย์ตามนัด: part1.visitDoctor || "",
        เหตุผลไม่พบแพทย์: part1.notVisitReason || "",

        // Demographics
        เพศ: sec2.gender || patient?.gender || "",
        อายุ: sec2.age || "",
        วันเกิด: formatBirthDateThai(sec2.birthDate),
        การศึกษา:
            formatWithOther(sec2.education, sec2.educationOther, "อื่น ๆ") ||
            formatWithOther(
                sec2.education,
                sec2.educationOther,
                "สูงกว่าปริญญาตรี",
            ),
        สถานภาพสมรส: sec2.maritalStatus || "",
        อาชีพ: formatWithOther(sec2.occupation, sec2.occupationOther),
        รายได้เฉลี่ยต่อเดือน: sec2.income || "",
        "การส่งเสียเลี้ยงดู(กรณีไม่ได้ทำงาน)": formatWithOther(
            sec2.supportSource,
            sec2.supportSourceOther,
        ),
        เศรษฐกิจครอบครัว: sec2.financialStatus || "",

        // Diabetes Info
        "ระยะเวลาทราบว่าเป็นเบาหวาน (ปี)": sec2.diabetesDuration || "",
        อายุตอนเป็นเบาหวาน: sec2.diabetesAge || "",
        ประเภทการรักษา: formatWithOther(
            sec2.treatmentType,
            sec2.treatmentOther,
        ),
        จำนวนยา: sec2.medicationCount || "",
        สิทธิรักษาของผู้ป่วย: formatWithOther(
            sec2.paymentMethod,
            sec2.paymentMethodOther,
        ),

        // Living
        สถานะการอยู่อาศัย: formatWithOther(
            sec2.livingArrangement,
            sec2.livingArrangementOther,
        ),
        จำนวนสมาชิก: sec2.livingMembers || "",
        การสนับสนุนจากครอบครัว: sec2.familySupport || "",
        การสนับสนุนจากที่ทำงาน: sec2.workSupport || "",

        // Diet
        "อาหาร 3 อย่างทานบ่อย": sec2.dietFood || "",
        "ขนม 3 อย่างทานบ่อย": sec2.dietSnack || "",
        "เครื่องดื่ม 3 อย่างทานบ่อย": sec2.dietDrink || "",

        // Alcohol
        ดื่มแอลกอฮอล์:
            (sec2.alcohol || "") +
            (sec2.alcohol === "เลิกดื่มแล้ว" && sec2.alcoholYears
                ? ` (${sec2.alcoholYears} ปี)`
                : "") +
            (sec2.alcohol === "ดื่มเป็นประจำ" && sec2.alcoholDays
                ? ` (${sec2.alcoholDays} วัน/สัปดาห์)`
                : ""),

        // Smoking
        สูบบุหรี่:
            (sec2.smoking || "") +
            (sec2.smoking === "เลิกสูบแล้ว" && sec2.smokingYears
                ? ` (${sec2.smokingYears} ปี)`
                : "") +
            (sec2.smoking === "สูบเป็นประจำ" && sec2.smokingAmount
                ? ` (${sec2.smokingAmount} มวน/วัน)`
                : ""),

        // Health Conditions
        โรคอื่นๆ:
            (sec2.otherDiseases || "") +
            (sec2.otherDiseases === "มี" && sec2.otherDiseasesList
                ? `: ${sec2.otherDiseasesList}`
                : ""),
        ภาวะแทรกซ้อน:
            (Array.isArray(sec2.complications)
                ? sec2.complications.join("; ")
                : "") +
            (sec2.complications?.includes("อื่น ๆ") && sec2.complicationsOther
                ? `: ${sec2.complicationsOther}`
                : ""),

        // Screenings
        ตรวจร่างกาย: formatScreening(
            screenings.physical,
            screenings.physicalOther,
        ),
        ตรวจเท้า: formatScreening(screenings.foot, screenings.footOther),
        ตรวจตา: formatScreening(screenings.eye, screenings.eyeOther),
        ตรวจปัสสาวะ: formatScreening(screenings.urine, screenings.urineOther),
        ตรวจไขมัน: formatScreening(screenings.lipid, screenings.lipidOther),
        ตรวจฟัน: formatScreening(screenings.dental, screenings.dentalOther),
        "ตรวจ HbA1c": formatScreening(screenings.hba1c, screenings.hba1cOther),
        ตรวจอื่นๆ: screenings.otherText || screenings.other || "",
    };
}

export function transformToPromsData(submission: SubmissionData): PromsDataRow {
    const raw: RawAnswers = asRawAnswers(submission.rawAnswers);
    const report = (raw.reportData || {}) as ReportData;
    const sec2: Partial<SectionTwoData> = raw.sectionTwo || {};
    const patient = submission.patient;
    const dateObj = new Date(submission.createdAt);

    // Extract additionalInfo from reportData
    const step2Info = report.step_2?.additionalInfo || {};
    const step9Info = report.step_9?.additionalInfo || {};

    // Group results by dimension
    const dim1 = [getActionText(report, 1), getActionText(report, 2)]
        .filter(Boolean)
        .join("\n");
    const dim2 = getActionText(report, 3);
    const dim3 = getActionText(report, 4);
    const dim4 = [getActionText(report, 5), getActionText(report, 6)]
        .filter(Boolean)
        .join("\n");
    const dim5 = getActionText(report, 7);
    const dim6 = getActionText(report, 8);
    const dim7 = [getActionText(report, 9), getActionText(report, 10)]
        .filter(Boolean)
        .join("\n");

    return {
        วันที่: dateObj.toLocaleDateString("th-TH"),
        เวลา: dateObj.toLocaleTimeString("th-TH"),
        ID: submission.id,
        ผู้ให้ข้อมูล: `${patient?.firstName || ""} ${
            patient?.lastName || ""
        }`.trim(),
        เพศ: sec2.gender || patient?.gender || "",
        เขตสุขภาพ: translateRegion(submission.region),

        "มิติที่ 1 (การทำงานของร่างกาย)": dim1,
        "ข้อจำกัดการเคลื่อนไหว (มิติ 1)": step2Info.movementLimit
            ? "มีข้อจำกัดด้านการเคลื่อนไหว"
            : "",
        "ออกแรงแล้วเหนื่อย (มิติ 1)": step2Info.tired
            ? "ออกแรงแล้วเหนื่อย"
            : "",
        "มิติที่ 2 (อาการของโรค)": dim2,
        "มิติที่ 3 (สุขภาพจิตใจ)": dim3,
        "มิติที่ 4 (การดูแลตนเอง)": dim4,
        "มิติที่ 5 (สังคม)": dim5,
        "มิติที่ 6 (สุขภาพโดยรวม)": dim6,
        "มิติที่ 7 (ความพึงพอใจ)": dim7,
        "ต้องการทราบเรื่องเพิ่ม (มิติ 7)": step9Info.topic || "",
    };
}
