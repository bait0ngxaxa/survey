// Section 2 Form Options - All options extracted from SectionTwoForm.tsx

export const GENDER_OPTIONS = ["ชาย", "หญิง"];

export const EDUCATION_OPTIONS = [
    "ต่ำกว่าประถมศึกษา",
    "ประถมศึกษา",
    "มัธยมศึกษาตอนต้น",
    "มัธยมศึกษาตอนปลาย/ ปวช.",
    "ปวส./อนุปริญญา",
    "ปริญญาตรี",
    "สูงกว่าปริญญาตรี",
    "อื่น ๆ",
];

export const MARITAL_STATUS_OPTIONS = ["โสด", "สมรส/อยู่ด้วยกัน", "หย่า/หม้าย"];

export const OCCUPATION_OPTIONS = [
    "ไม่ได้ประกอบอาชีพ",
    "ข้าราชการ/พนักงานรัฐวิสาหกิจ",
    "พนักงานบริษัทเอกชน",
    "ประกอบธุรกิจส่วนตัว เช่น ค้าขาย",
    "ข้าราชการบำนาญ",
    "เกษตรกรรม",
    "รับจ้างทั่วไป",
    "อื่น ๆ",
];

export const INCOME_OPTIONS = [
    "ไม่มีรายได้",
    "น้อยกว่า 5,000 บาท",
    "ตั้งแต่ 5,001 – 10,000 บาท",
    "ตั้งแต่10,001 – 20,000 บาท",
    "ตั้งแต่ 20,001 – 30,000 บาท",
    "มากกว่า 30,001 บาท",
];

export const SUPPORT_SOURCE_OPTIONS = [
    "ไม่มี",
    "จากคู่สมรส",
    "จากลูก",
    "จากญาติ",
    "เงินบำนาญ",
    "ยังทำงานอยู่",
    "อื่น ๆ",
];

export const FINANCIAL_STATUS_OPTIONS = [
    "เพียงพอในการใช้จ่าย",
    "ไม่เพียงพอในการใช้จ่าย",
];

export const TREATMENT_TYPE_OPTIONS = [
    "การควบคุมอาหารเพียงอย่างเดียว",
    "ใช้ยารับประทาน",
    "ใช้ยาฉีดอินซูลิน",
    "ใช้ยารับประทานร่วมกับยาฉีดอินซูลิน",
    "อื่น ๆ",
];

export const MEDICATION_COUNT_OPTIONS = [
    "ไม่มี",
    "1- 5 รายการ",
    "5-10 รายการ",
    "มากกว่า 10 รายการ",
];

export const PAYMENT_METHOD_OPTIONS = [
    "บัตรทอง 30 บาท",
    "บัตรประกันสังคม",
    "สวัสดิการข้าราชการ/รัฐวิสาหกิจ",
    "บัตรผู้สูงอายุ",
    "จ่ายเอง",
    "อื่น ๆ",
];

export const LIVING_ARRANGEMENT_OPTIONS = [
    "อยู่คนเดียว",
    "อยู่กับคู่สมรสและบุตร/หลาน",
    "อยู่กับญาติ/เพื่อน",
    "อื่น ๆ",
];

export const FAMILY_SUPPORT_OPTIONS = ["มี", "ไม่มี (ดูแลด้วยตัวเองคนเดียว)"];

export const WORK_SUPPORT_OPTIONS = ["มี", "ไม่มี (ดูแลด้วยตัวเองคนเดียว)"];

export const ALCOHOL_OPTIONS = ["ไม่เคยดื่ม", "เลิกดื่มแล้ว", "ดื่มเป็นประจำ"];

export const SMOKING_OPTIONS = ["ไม่เคยสูบ", "เลิกสูบแล้ว", "สูบเป็นประจำ"];

export const OTHER_DISEASES_OPTIONS = ["ไม่มี", "มี"];

export const COMPLICATION_OPTIONS = [
    "ไม่มีภาวะแทรกซ้อน",
    "มีอาการตามัวมองไม่ชัด ต้อกระจก",
    "มีอาการผิดปกติของไต/โรคไต",
    "มีอาการชาตามปลายมือปลายเท้า",
    "ถูกตัดนิ้วมือนิ้วเท้าหรือตัดขาตัดเท้า",
    "ความดันโลหิตสูง",
    "มีแผลเรื้อรัง",
    "มีอาการทางหัวใจ เช่น เจ็บหน้าอก เป็นโรคหัวใจ",
    "อัมพาต",
    "ขาและเท้าบวม",
    "อื่น ๆ",
];

export const SCREENING_FREQUENCY_OPTIONS = [
    "ทุก 3 เดือน",
    "ทุก 6 เดือน",
    "ทุก 1 ปี",
    "อื่น ๆ",
];

// Screening types for validation
export const REQUIRED_SCREENINGS = [
    "physical",
    "foot",
    "eye",
    "urine",
    "lipid",
    "dental",
    "hba1c",
] as const;

export const SCREENING_LABELS: Record<string, string> = {
    physical: "ร่างกาย",
    foot: "เท้า",
    eye: "ตา",
    urine: "ปัสสาวะ",
    lipid: "ไขมัน",
    dental: "ฟัน",
    hba1c: "HbA1c",
};
