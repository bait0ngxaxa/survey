import { type PatientData } from "@/lib/types";

export interface SubmissionData {
    id: string;
    region: string;
    createdAt: Date;
    rawAnswers: unknown;
    respondentNameSnapshot?: string | null;
    genderSnapshot?: string | null;
    birthDateSnapshot?: Date | null;
    patient: PatientData | null;
}

export interface GeneralDataRow {
    วันที่: string;
    เวลา: string;
    ID: string;
    เขตสุขภาพ: string;
    วิธีเก็บข้อมูล: string;
    ผู้ให้ข้อมูล: string;
    ผู้สัมภาษณ์: string;
    ทราบระดับน้ำตาล: string;
    "ระดับน้ำตาลในเลือด Fasting": string;
    "ระดับน้ำตาลสะสม HbA1c": string;
    พบแพทย์ตามนัด: string;
    เหตุผลไม่พบแพทย์: string;
    [key: string]: string;
}

export interface PromsDataRow {
    วันที่: string;
    เวลา: string;
    ID: string;
    ผู้ให้ข้อมูล: string;
    เพศ: string;
    เขตสุขภาพ: string;
    [key: string]: string;
}
