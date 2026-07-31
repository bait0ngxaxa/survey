"use client";

import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { getSubmissions } from "@/lib/actions/admin";
import * as XLSX from "xlsx";
import {
    transformToGeneralData,
    transformToPromsData,
    type GeneralDataRow,
    type PromsDataRow,
} from "@/lib/utils/export";
import { type PatientData } from "@/lib/types";

interface ExportButtonProps {
    regionFilter?: string;
}

/**
 * Creates an Excel workbook with two sheets from submission data
 */
function createWorkbook(
    generalData: GeneralDataRow[],
    promsData: PromsDataRow[],
): XLSX.WorkBook {
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

    return wb;
}

/**
 * Generates filename with region suffix and current date
 */
function generateFilename(regionFilter: string): string {
    const regionSuffix = regionFilter ? `_${regionFilter}` : "_all";
    const dateStr = new Date().toISOString().split("T")[0];
    return `survey_data${regionSuffix}_${dateStr}.xlsx`;
}

export function ExportButton({ regionFilter = "" }: ExportButtonProps) {
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const handleExport = async (): Promise<void> => {
        try {
            setLoading(true);
            setStatusMessage(null);

            const { submissions } = await getSubmissions({
                page: 1,
                pageSize: 10000,
                regionFilter,
            });

            if (!submissions || submissions.length === 0) {
                setStatusMessage("ไม่พบข้อมูลสำหรับส่งออก");
                return;
            }

            const generalData = submissions.map((s) =>
                transformToGeneralData({
                    id: s.id,
                    region: s.region,
                    createdAt: s.createdAt,
                    rawAnswers: s.rawAnswers,
                    respondentNameSnapshot: s.respondentNameSnapshot,
                    genderSnapshot: s.genderSnapshot,
                    birthDateSnapshot: s.birthDateSnapshot,
                    patient: s.patient as PatientData | null,
                }),
            );

            const promsData = submissions.map((s) =>
                transformToPromsData({
                    id: s.id,
                    region: s.region,
                    createdAt: s.createdAt,
                    rawAnswers: s.rawAnswers,
                    respondentNameSnapshot: s.respondentNameSnapshot,
                    genderSnapshot: s.genderSnapshot,
                    birthDateSnapshot: s.birthDateSnapshot,
                    patient: s.patient as PatientData | null,
                }),
            );

            const workbook = createWorkbook(generalData, promsData);
            XLSX.writeFile(workbook, generateFilename(regionFilter));
            setStatusMessage(`ส่งออกข้อมูลสำเร็จ ${submissions.length} รายการ`);
        } catch (error) {
            console.error("Export failed", error);
            const message =
                error instanceof Error
                    ? error.message
                    : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
            setStatusMessage(`ส่งออกข้อมูลไม่สำเร็จ: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-2">
            <button
                onClick={handleExport}
                disabled={loading}
                className="flex items-center justify-center gap-2 proms-success-gradient px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                type="button"
                aria-busy={loading}
            >
                <FileSpreadsheet size={18} aria-hidden="true" />
                {loading ? "กำลังส่งออก..." : "ส่งออก Excel"}
            </button>
            {statusMessage && (
                <p
                    className="max-w-64 rounded-lg bg-white px-3 py-2 text-right text-xs font-medium text-slate-700 ring-1 ring-slate-200 thai-text"
                    role="status"
                >
                    {statusMessage}
                </p>
            )}
        </div>
    );
}
