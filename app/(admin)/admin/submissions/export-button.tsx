"use client";

import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { getSubmissions } from "@/lib/actions/admin";
import * as XLSX from "xlsx";

interface ExportButtonProps {
    regionFilter?: string;
}

export default function ExportButton({ regionFilter = "" }: ExportButtonProps) {
    const [loading, setLoading] = useState(false);

    // Helper: Get action text for PROMs dimensions
    const getActionText = (report: any, stepId: number) => {
        const step = report[`step_${stepId}`];
        if (!step || !step.action) return "";
        return `${step.label?.split("\n")[0] || `ข้อ ${stepId}`}: ${
            step.action
        }`;
    };

    // Helper: Translate English values to Thai
    const translateAlcohol = (value: string) => {
        const map: Record<string, string> = {
            never: "ไม่เคยดื่มเลย",
            quit: "เคยดื่มแต่เลิกแล้ว",
            rarely: "ดื่มบ้างนานๆ ครั้ง",
            regular: "ดื่มเป็นประจำ",
        };
        return map[value] || value || "";
    };

    const translateSmoking = (value: string) => {
        const map: Record<string, string> = {
            never: "ไม่เคยสูบเลย",
            quit: "เคยสูบแต่เลิกแล้ว",
            rarely: "สูบบ้างนานๆ ครั้ง",
            regular: "สูบเป็นประจำทุกวัน",
        };
        return map[value] || value || "";
    };

    const translateLivingArrangement = (value: string) => {
        const map: Record<string, string> = {
            spouse_child: "อยู่กับคู่สมรสและบุตร/หลาน",
            relative_friend: "อยู่กับญาติ/เพื่อน",
            alone: "อยู่คนเดียว",
            other: "อื่นๆ",
        };
        return map[value] || value || "";
    };

    const translateOtherDiseases = (value: string) => {
        const map: Record<string, string> = {
            yes: "มี",
            no: "ไม่มี",
        };
        return map[value] || value || "";
    };

    // Export All Data (2 Sheets in 1 File)
    const handleExport = async () => {
        try {
            setLoading(true);
            const { submissions } = await getSubmissions(
                1,
                10000,
                regionFilter
            );

            if (!submissions || submissions.length === 0) {
                alert("ไม่พบข้อมูลสำหรับ export");
                return;
            }

            // ===== SHEET 1: ข้อมูลทั่วไป =====
            const generalData = submissions.map((s) => {
                const raw: any = s.rawAnswers || {};
                const sec2 = raw.sectionTwo || {};
                const part1 = raw.part1 || {};
                const patient = s.patient as any;
                const dateObj = new Date(s.createdAt);
                const screenings = sec2.screenings || {};

                return {
                    // Basic Info
                    วันที่: dateObj.toLocaleDateString("th-TH"),
                    เวลา: dateObj.toLocaleTimeString("th-TH"),
                    ID: s.id,
                    เขตสุขภาพ: s.region,

                    // Patient Info
                    "ชื่อ-นามสกุล": `${patient?.firstName || ""} ${
                        patient?.lastName || ""
                    }`.trim(),
                    เพศ: sec2.gender || patient?.gender || "",
                    อายุ: sec2.age || "",
                    วันเกิด: sec2.birthDate || "",

                    // Demographics
                    การศึกษา: sec2.education || "",
                    "การศึกษา (อื่นๆ)": sec2.educationOther || "",
                    สถานภาพสมรส: sec2.maritalStatus || "",
                    อาชีพ: sec2.occupation || "",
                    "อาชีพ (อื่นๆ)": sec2.occupationOther || "",
                    รายได้: sec2.income || "",
                    แหล่งเงินสนับสนุน: sec2.supportSource || "",
                    "แหล่งเงิน (อื่นๆ)": sec2.supportSourceOther || "",
                    สถานะการเงิน: sec2.financialStatus || "",

                    // Living
                    การอยู่อาศัย: translateLivingArrangement(
                        sec2.livingArrangement
                    ),
                    จำนวนสมาชิก: sec2.livingMembers || "",
                    "การอยู่อาศัย (อื่นๆ)": sec2.livingArrangementOther || "",
                    การสนับสนุนจากครอบครัว: sec2.familySupport || "",
                    การสนับสนุนจากที่ทำงาน: sec2.workSupport || "",

                    // Diabetes Info
                    ระยะเวลาเป็นเบาหวาน: sec2.diabetesDuration || "",
                    อายุที่เริ่มเป็น: sec2.diabetesAge || "",
                    รูปแบบการรักษา: sec2.treatmentType || "",
                    "การรักษา (อื่นๆ)": sec2.treatmentOther || "",
                    จำนวนยา: sec2.medicationCount || "",
                    วิธีชำระเงิน: sec2.paymentMethod || "",
                    "วิธีชำระ (อื่นๆ)": sec2.paymentMethodOther || "",

                    // Lifestyle
                    อาหาร: sec2.dietFood || "",
                    ของว่าง: sec2.dietSnack || "",
                    เครื่องดื่ม: sec2.dietDrink || "",
                    แอลกอฮอล์: translateAlcohol(sec2.alcohol),
                    "ดื่มแอลกอฮอล์ (ปี)": sec2.alcoholYears || "",
                    "ดื่มแอลกอฮอล์ (วัน/สัปดาห์)": sec2.alcoholDays || "",
                    สูบบุหรี่: translateSmoking(sec2.smoking),
                    "สูบบุหรี่ (ปี)": sec2.smokingYears || "",
                    "สูบบุหรี่ (มวน/วัน)": sec2.smokingAmount || "",

                    // Health Conditions
                    โรคอื่นๆ: translateOtherDiseases(sec2.otherDiseases),
                    รายการโรค: sec2.otherDiseasesList || "",
                    ภาวะแทรกซ้อน: Array.isArray(sec2.complications)
                        ? sec2.complications.join("; ")
                        : "",
                    "ภาวะแทรกซ้อน (อื่นๆ)": sec2.complicationsOther || "",

                    // Screenings
                    ตรวจร่างกาย: screenings.physical || "",
                    ตรวจเท้า: screenings.foot || "",
                    ตรวจตา: screenings.eye || "",
                    ตรวจปัสสาวะ: screenings.urine || "",
                    ตรวจไขมัน: screenings.lipid || "",
                    ตรวจฟัน: screenings.dental || "",
                    "ตรวจ HbA1c": screenings.hba1c || "",

                    // Part 1
                    รู้ระดับน้ำตาล: part1.bloodSugarKnown || "",
                    ระดับน้ำตาลอดอาหาร: part1.fastingLevel || "",
                    "ระดับ HbA1c": part1.hba1cLevel || "",
                    พบแพทย์: part1.visitDoctor || "",
                    เหตุผลไม่พบแพทย์: part1.notVisitReason || "",
                    ผู้สัมภาษณ์: part1.interviewerName || "",
                    วิธีสำรวจ: part1.surveyMethod || "",
                };
            });

            // ===== SHEET 2: สรุป 7 มิติ =====
            const promsData = submissions.map((s) => {
                const raw: any = s.rawAnswers || {};
                const report = raw.reportData || raw.sectionFourReport || {};
                const sec2 = raw.sectionTwo || {};
                const part1 = raw.part1 || {};
                const patient = s.patient as any;
                const dateObj = new Date(s.createdAt);

                // Group results by dimension
                const dim1 = [
                    getActionText(report, 1),
                    getActionText(report, 2),
                ]
                    .filter(Boolean)
                    .join("\n");
                const dim2 = getActionText(report, 3);
                const dim3 = getActionText(report, 4);
                const dim4 = [
                    getActionText(report, 5),
                    getActionText(report, 6),
                ]
                    .filter(Boolean)
                    .join("\n");
                const dim5 = getActionText(report, 7);
                const dim6 = getActionText(report, 8);
                const dim7 = [
                    getActionText(report, 9),
                    getActionText(report, 10),
                ]
                    .filter(Boolean)
                    .join("\n");

                return {
                    วันที่: dateObj.toLocaleDateString("th-TH"),
                    เวลา: dateObj.toLocaleTimeString("th-TH"),
                    ID: s.id,
                    "ชื่อ-นามสกุล": `${patient?.firstName || ""} ${
                        patient?.lastName || ""
                    }`.trim(),
                    เพศ: sec2.gender || patient?.gender || "",
                    เขตสุขภาพ: s.region,
                    ผู้ให้ข้อมูล: sec2.respondentName || "",
                    ผู้สัมภาษณ์: part1.interviewerName || "",
                    "มิติที่ 1 (การทำงานของร่างกาย)": dim1,
                    "มิติที่ 2 (อาการของโรค)": dim2,
                    "มิติที่ 3 (สุขภาพจิตใจ)": dim3,
                    "มิติที่ 4 (การดูแลตนเอง)": dim4,
                    "มิติที่ 5 (สังคม)": dim5,
                    "มิติที่ 6 (สุขภาพโดยรวม)": dim6,
                    "มิติที่ 7 (ความพึงพอใจ)": dim7,
                };
            });

            // ===== CREATE WORKBOOK WITH 2 SHEETS =====
            const wb = XLSX.utils.book_new();

            // Sheet 1: ข้อมูลทั่วไป
            const ws1 = XLSX.utils.json_to_sheet(generalData);
            const colWidths1 = Object.keys(generalData[0] || {}).map((key) => ({
                wch: Math.max(key.length, 15),
            }));
            ws1["!cols"] = colWidths1;
            XLSX.utils.book_append_sheet(wb, ws1, "ข้อมูลทั่วไป");

            // Sheet 2: สรุป 7 มิติ
            const ws2 = XLSX.utils.json_to_sheet(promsData);
            const colWidths2 = Object.keys(promsData[0] || {}).map((key) => ({
                wch: Math.max(key.length, 20),
            }));
            ws2["!cols"] = colWidths2;
            XLSX.utils.book_append_sheet(wb, ws2, "สรุป 7 มิติ");

            // Export single file with 2 sheets
            const regionSuffix = regionFilter ? `_${regionFilter}` : "_all";
            XLSX.writeFile(
                wb,
                `survey_data${regionSuffix}_${
                    new Date().toISOString().split("T")[0]
                }.xlsx`
            );
        } catch (error) {
            console.error("Export failed", error);
            alert("Export failed: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 font-medium shadow-md hover:shadow-lg"
        >
            <FileSpreadsheet size={18} />
            {loading ? "กำลัง Export..." : "Export Excel"}
        </button>
    );
}
