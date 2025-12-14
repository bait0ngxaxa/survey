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

    const getActionText = (report: any, stepId: number) => {
        const step = report[`step_${stepId}`];
        if (!step || !step.action) return "";
        return `${step.label?.split("\n")[0] || `ข้อ ${stepId}`}: ${
            step.action
        }`;
    };

    const translateRegion = (value: string) => {
        const map: Record<string, string> = {
            central: "ทีมกลาง",
            phetchabun: "เพชรบูรณ์",
            satun: "สตูล",
            lopburi: "ลพบุรี",
        };
        return map[value] || value || "";
    };

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
                const report = raw.reportData || raw.sectionFourReport || {};

                // // Extract additionalInfo from reportData
                // const step2Info = report.step_2?.additionalInfo || {};
                // const step9Info = report.step_9?.additionalInfo || {};

                return {
                    วันที่: dateObj.toLocaleDateString("th-TH"),
                    เวลา: dateObj.toLocaleTimeString("th-TH"),
                    ID: s.id,
                    เขตสุขภาพ: translateRegion(s.region),

                    วิธีเก็บข้อมูล: part1.surveyMethod || "",

                    ผู้ให้ข้อมูล: `${patient?.firstName || ""} ${
                        patient?.lastName || ""
                    }`.trim(),

                    // Part 1
                    ผู้สัมภาษณ์: part1.interviewerName || "",

                    ทราบระดับน้ำตาล: part1.bloodSugarKnown || "",
                    "ระดับน้ำตาลในเลือด Fasting": part1.fastingLevel || "",
                    "ระดับน้ำตาลสะสม HbA1c": part1.hba1cLevel || "",
                    พบแพทย์ตามนัด: part1.visitDoctor || "",
                    เหตุผลไม่พบแพทย์: part1.notVisitReason || "",

                    // Demographics
                    เพศ: sec2.gender || patient?.gender || "",
                    อายุ: sec2.age || "",
                    วันเกิด: sec2.birthDate || "",
                    การศึกษา:
                        (sec2.education === "อื่น ๆ" ||
                            sec2.education === "สูงกว่าปริญญาตรี") &&
                        sec2.educationOther
                            ? `${sec2.education}: ${sec2.educationOther}`
                            : sec2.education || "",
                    สถานภาพสมรส: sec2.maritalStatus || "",
                    อาชีพ:
                        sec2.occupation === "อื่น ๆ" && sec2.occupationOther
                            ? `อื่นๆ: ${sec2.occupationOther}`
                            : sec2.occupation || "",
                    รายได้เฉลี่ยต่อเดือน: sec2.income || "",
                    "การส่งเสียเลี้ยงดู(กรณีไม่ได้ทำงาน)":
                        sec2.supportSource === "อื่น ๆ" &&
                        sec2.supportSourceOther
                            ? `อื่นๆ: ${sec2.supportSourceOther}`
                            : sec2.supportSource || "",
                    เศรษฐกิจครอบครัว: sec2.financialStatus || "",

                    // Diabetes Info
                    "ระยะเวลาทราบว่าเป็นเบาหวาน (ปี)":
                        sec2.diabetesDuration || "",
                    อายุตอนเป็นเบาหวาน: sec2.diabetesAge || "",
                    ประเภทการรักษา:
                        sec2.treatmentType === "อื่น ๆ" && sec2.treatmentOther
                            ? `อื่นๆ: ${sec2.treatmentOther}`
                            : sec2.treatmentType || "",
                    จำนวนยา: sec2.medicationCount || "",
                    สิทธิรักษาของผู้ป่วย:
                        sec2.paymentMethod === "อื่น ๆ" &&
                        sec2.paymentMethodOther
                            ? `อื่นๆ: ${sec2.paymentMethodOther}`
                            : sec2.paymentMethod || "",

                    // Living
                    สถานะการอยู่อาศัย:
                        sec2.livingArrangement === "อื่น ๆ" &&
                        sec2.livingArrangementOther
                            ? `อื่นๆ: ${sec2.livingArrangementOther}`
                            : sec2.livingArrangement || "",
                    จำนวนสมาชิก: sec2.livingMembers || "",
                    การสนับสนุนจากครอบครัว: sec2.familySupport || "",
                    การสนับสนุนจากที่ทำงาน: sec2.workSupport || "",

                    // Diet
                    "อาหาร 3 อย่างทานบ่อย": sec2.dietFood || "",
                    "ขนม 3 อย่างทานบ่อย": sec2.dietSnack || "",
                    "เครื่องดื่ม 3 อย่างทานบ่อย": sec2.dietDrink || "",

                    // Lifestyle - Alcohol (merge based on value)
                    ดื่มแอลกอฮอล์:
                        (sec2.alcohol || "") +
                        (sec2.alcohol === "เลิกดื่มแล้ว" && sec2.alcoholYears
                            ? ` (${sec2.alcoholYears} ปี)`
                            : "") +
                        (sec2.alcohol === "ดื่มเป็นประจำ" && sec2.alcoholDays
                            ? ` (${sec2.alcoholDays} วัน/สัปดาห์)`
                            : ""),

                    // Lifestyle - Smoking (merge based on value)
                    สูบบุหรี่:
                        (sec2.smoking || "") +
                        (sec2.smoking === "เลิกสูบแล้ว" && sec2.smokingYears
                            ? ` (${sec2.smokingYears} ปี)`
                            : "") +
                        (sec2.smoking === "สูบเป็นประจำ" && sec2.smokingAmount
                            ? ` (${sec2.smokingAmount} มวน/วัน)`
                            : ""),

                    // Health Conditions - Merge other diseases with list
                    โรคอื่นๆ:
                        (sec2.otherDiseases || "") +
                        (sec2.otherDiseases === "มี" && sec2.otherDiseasesList
                            ? `: ${sec2.otherDiseasesList}`
                            : ""),
                    ภาวะแทรกซ้อน:
                        (Array.isArray(sec2.complications)
                            ? sec2.complications.join("; ")
                            : "") +
                        (sec2.complications?.includes("อื่น ๆ") &&
                        sec2.complicationsOther
                            ? `: ${sec2.complicationsOther}`
                            : ""),

                    // Screenings
                    ตรวจร่างกาย: screenings.physical || "",
                    ตรวจเท้า: screenings.foot || "",
                    ตรวจตา: screenings.eye || "",
                    ตรวจปัสสาวะ: screenings.urine || "",
                    ตรวจไขมัน: screenings.lipid || "",
                    ตรวจฟัน: screenings.dental || "",
                    "ตรวจ HbA1c": screenings.hba1c || "",
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

                // Extract additionalInfo from reportData
                const step2Info = report.step_2?.additionalInfo || {};
                const step9Info = report.step_9?.additionalInfo || {};

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
                    ผู้ให้ข้อมูล: `${patient?.firstName || ""} ${
                        patient?.lastName || ""
                    }`.trim(),
                    เพศ: sec2.gender || patient?.gender || "",
                    เขตสุขภาพ: translateRegion(s.region),

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
