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

    const handleExport = async (): Promise<void> => {
        try {
            setLoading(true);

            // Fetch all submissions
            const { submissions } = await getSubmissions({
                page: 1,
                pageSize: 10000,
                regionFilter,
            });

            if (!submissions || submissions.length === 0) {
                alert("ไม่พบข้อมูลสำหรับ export");
                return;
            }

            // Transform data for both sheets
            const generalData = submissions.map((s) =>
                transformToGeneralData({
                    id: s.id,
                    region: s.region,
                    createdAt: s.createdAt,
                    rawAnswers: s.rawAnswers,
                    patient: s.patient as PatientData | null,
                }),
            );

            const promsData = submissions.map((s) =>
                transformToPromsData({
                    id: s.id,
                    region: s.region,
                    createdAt: s.createdAt,
                    rawAnswers: s.rawAnswers,
                    patient: s.patient as PatientData | null,
                }),
            );

            // Create and export workbook
            const workbook = createWorkbook(generalData, promsData);
            XLSX.writeFile(workbook, generateFilename(regionFilter));
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
