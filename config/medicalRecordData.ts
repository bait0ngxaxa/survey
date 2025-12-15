// Medical Record Form field definitions

export interface MedicalFieldConfig {
    id: string;
    label: string;
    type: "number" | "text" | "textarea";
    placeholder?: string;
    unit?: string;
}

export const MEDICAL_RECORD_FIELDS: MedicalFieldConfig[] = [
    {
        id: "bloodSugar",
        label: "1. ระดับน้ำตาลในเลือด (mg/dl)",
        type: "number",
        placeholder: "เช่น 120",
    },
    {
        id: "hba1c",
        label: "2. ระดับ HbA1c (%)",
        type: "number",
        placeholder: "เช่น 6.5",
    },
    {
        id: "bloodPressure",
        label: "3. ค่าความดันโลหิต (mmHg)",
        type: "text",
        placeholder: "เช่น 120/80",
    },
    {
        id: "creatinine",
        label: "4. Creatinine (mg/dl)",
        type: "number",
        placeholder: "ระบุค่า Creatinine",
    },
];

export const LIPID_PROFILE_FIELDS: MedicalFieldConfig[] = [
    {
        id: "lipid_tchol",
        label: "7.1 TChol (mg/dl)",
        type: "number",
    },
    {
        id: "lipid_tg",
        label: "7.2 TG (mg/dl)",
        type: "number",
    },
    {
        id: "lipid_ldl",
        label: "7.3 LDL-C (mg/dl)",
        type: "number",
    },
    {
        id: "lipid_hdl",
        label: "7.4 HDL-C (mg/dl)",
        type: "number",
    },
];
