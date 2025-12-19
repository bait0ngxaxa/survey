import { centralPart4Data, Part4Section } from "./part4Data";

export type SurveyConfig = {
    title: string;
    part4Questions: Part4Section[];
};

export const surveyData: Record<string, SurveyConfig> = {
    central: {
        title: "แบบสอบถาม - บริบทคนไทยทีมกลาง",
        part4Questions: centralPart4Data,
    },
    // TODO: เพิ่ม region อื่นๆ เมื่อมีข้อมูลจริง
    // phetchabun: {
    //     title: "แบบสอบถาม - บริบทพื้นที่เพชรบูรณ์",
    //     part4Questions: phetchabunPart4Data,
    // },
    // satun: {
    //     title: "แบบสอบถาม - บริบทพื้นที่สตูล",
    //     part4Questions: satunPart4Data,
    // },
    // lopburi: {
    //     title: "แบบสอบถาม - บริบทพื้นที่ลพบุรี",
    //     part4Questions: lopburiPart4Data,
    // },
};

export const regions = [
    { id: "central", name: "บริบทคนไทยทีมกลาง", color: "bg-blue-500" },
    // TODO: เพิ่ม region อื่นๆ เมื่อพร้อมใช้งาน
    // { id: "phetchabun", name: "บริบทพื้นที่เพชรบูรณ์", color: "bg-teal-500" },
    // { id: "satun", name: "บริบทพื้นที่สตูล", color: "bg-orange-500" },
    // { id: "lopburi", name: "บริบทพื้นที่ลพบุรี", color: "bg-purple-500" },
];
