import {
    phetchabunPart4Data,
    satunPart4Data,
    lopburiPart4Data,
    centralPart4Data,
    Part4Section,
} from "./part4Data";

export type Part2Question = {
    id: number;
    text: string;
};

export type SurveyConfig = {
    title: string;
    part2Questions: Part2Question[];
    part4Questions: Part4Section[];
};

const defaultPart2Questions: Part2Question[] = [
    {
        id: 6,
        text: "อาการน้ำตาลต่ำ เช่น ตัวสั่น มือสั่น เหงื่อออกมากกว่าปกติ หัวใจเต้นแรงหรือใจสั่น มึนศีรษะหรือมีอาการเหมือนจะเป็นลม การมองเห็นผิดปกติชั่วคราว ฯลฯ",
    },
    {
        id: 7,
        text: "อาการน้ำตาลสูง เช่น ปากแห้ง คอแห้ง หิวน้ำบ่อย ดื่มน้ำมาก เหนื่อยง่าย ตาพร่ามัว คลื่นไส้ ซึม หมดสติ ชักกระตุก ปัสสาวะบ่อยและมากผิดปกติโดยเฉพาะในเวลากลางคืน",
    },
    {
        id: 8,
        text: "อาการและความผิดปกติที่เท้า เช่น ชาตามปลายมือปลายเท้า คันที่เท้าและร่องนิ้วเท้า เท้าเป็นตาปลา มีตุ่มพุพองมีบาดแผลเป็นหนอง แผลหายช้า เวลาเดินรู้สึกเจ็บแปล๊บๆ เหมือนเข็มตำเท้า",
    },
    {
        id: 9,
        text: "อาการใดอาการหนึ่งหรือทุกอาการต่อไปนี้ เช่น เปลือกตาบวม เท้าทั้งสองข้างบวม ปัสสาวะเป็นฟอง",
    },
    {
        id: 10,
        text: "อาการใดอาการหนึ่งหรือทุกอาการต่อไปนี้ เช่น แน่นหน้าอก หอบ เหนื่อย เจ็บหน้าอกร้าวไปแขนซ้ายหรือคอ",
    },
    {
        id: 11,
        text: "มองเห็นภาพมัวลง เห็นภาพมัวลงกว่าเดิม",
    },
    {
        id: 12,
        text: "มีอาการติดเชื้อในร่างกาย มีไข้ หนาวสั่น",
    },
];

// Mock data for demo purposes
const phetchabunQuestions = [
    ...defaultPart2Questions,
    {
        id: 13,
        text: "คำถามพิเศษสำหรับพื้นที่เพชรบูรณ์: ท่านรับประทานมะขามหวานบ่อยแค่ไหน (Mock)",
    },
];

const satunQuestions = [
    ...defaultPart2Questions,
    {
        id: 13,
        text: "คำถามพิเศษสำหรับพื้นที่สตูล: ท่านรับประทานอาหารทะเลบ่อยแค่ไหน (Mock)",
    },
];

const lopburiQuestions = [
    ...defaultPart2Questions,
    {
        id: 13,
        text: "คำถามพิเศษสำหรับพื้นที่ลพบุรี: ท่านระวังลิงรบกวนบ่อยแค่ไหน (Mock)",
    },
];

const centralQuestions = [
    ...defaultPart2Questions,
    {
        id: 13,
        text: "คำถามพิเศษสำหรับพื้นที่ภาคกลาง: การจราจรติดขัดมีผลต่อความเครียดของท่านบ่อยแค่ไหน (Mock)",
    },
];

export const surveyData: Record<string, SurveyConfig> = {
    phetchabun: {
        title: "แบบสอบถาม - บริบทพื้นที่เพชรบูรณ์",
        part2Questions: phetchabunQuestions,
        part4Questions: phetchabunPart4Data,
    },
    satun: {
        title: "แบบสอบถาม - บริบทพื้นที่สตูล",
        part2Questions: satunQuestions,
        part4Questions: satunPart4Data,
    },
    lopburi: {
        title: "แบบสอบถาม - บริบทพื้นที่ลพบุรี",
        part2Questions: lopburiQuestions,
        part4Questions: lopburiPart4Data,
    },
    central: {
        title: "แบบสอบถาม - บริบทคนไทยทีมกลาง",
        part2Questions: centralQuestions,
        part4Questions: centralPart4Data,
    },
};

export const regions = [
    // { id: "phetchabun", name: "บริบทพื้นที่เพชรบูรณ์", color: "bg-teal-500" },
    // { id: "satun", name: "บริบทพื้นที่สตูล", color: "bg-orange-500" },
    // { id: "lopburi", name: "บริบทพื้นที่ลพบุรี", color: "bg-purple-500" },
    { id: "central", name: "บริบทคนไทยทีมกลาง", color: "bg-blue-500" },
];
