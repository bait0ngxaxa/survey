"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { getSubmissions } from "@/lib/actions/admin";

interface ExportButtonProps {
    regionFilter?: string;
}

// Helper function to flatten nested object into flat key-value pairs
function flattenObject(
    obj: Record<string, unknown>,
    prefix = ""
): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}_${key}` : key;

        if (value === null || value === undefined) {
            result[newKey] = "";
        } else if (Array.isArray(value)) {
            result[newKey] = value.join("; ");
        } else if (typeof value === "object") {
            const nested = flattenObject(
                value as Record<string, unknown>,
                newKey
            );
            Object.assign(result, nested);
        } else {
            result[newKey] = String(value);
        }
    }

    return result;
}

// Escape CSV value
function escapeCSV(value: string): string {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

export default function ExportButton({ regionFilter = "" }: ExportButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        try {
            setLoading(true);
            const { submissions } = await getSubmissions(
                1,
                10000,
                regionFilter
            );

            if (!submissions || submissions.length === 0) {
                alert("No data to export");
                return;
            }

            // Define Headers (7 Dimensions + General Info)
            const headers = [
                "วันที่ทำรายการ",
                "เวลา",
                "ชื่อ-นามสกุล ผู้ป่วย",
                "เพศ",
                "เขตสุขภาพ",
                "ชื่อผู้ให้ข้อมูล",
                "ชื่อผู้สัมภาษณ์",
                "มิติที่ 1 (การทำงานของร่างกาย)", // G1, G2
                "มิติที่ 2 (อาการของโรค)", // G3
                "มิติที่ 3 (สุขภาพจิตใจ)", // G4
                "มิติที่ 4 (การดูแลตนเอง)", // G5, G6
                "มิติที่ 5 (สังคม)", // G7
                "มิติที่ 6 (สุขภาพโดยรวม)", // G8
                "มิติที่ 7 (ความพึงพอใจ)", // G9, G10
            ];

            // Processing Helper
            const getActionText = (report: any, stepId: number) => {
                const step = report[`step_${stepId}`];
                if (!step || !step.action) return null;
                // Format: "ข้อ X-Y: [Action]"
                return `${step.label?.split("\n")[0] || `ข้อ ${stepId}`}: ${
                    step.action
                }`;
            };

            // Process Rows
            const csvRows = submissions.map((s) => {
                const raw: any = s.rawAnswers || {};
                const report = raw.reportData || raw.sectionFourReport || {};
                const part1 = raw.part1 || {};
                const sec2 = raw.sectionTwo || {};
                const patient = s.patient as any;

                const dateObj = new Date(s.createdAt);

                // Group results by dimension
                // Dim 1: G1, G2
                const dim1 = [
                    getActionText(report, 1),
                    getActionText(report, 2),
                ]
                    .filter(Boolean)
                    .join("\n");
                // Dim 2: G3
                const dim2 = [getActionText(report, 3)]
                    .filter(Boolean)
                    .join("\n");
                // Dim 3: G4
                const dim3 = [getActionText(report, 4)]
                    .filter(Boolean)
                    .join("\n");
                // Dim 4: G5, G6
                const dim4 = [
                    getActionText(report, 5),
                    getActionText(report, 6),
                ]
                    .filter(Boolean)
                    .join("\n");
                // Dim 5: G7
                const dim5 = [getActionText(report, 7)]
                    .filter(Boolean)
                    .join("\n");
                // Dim 6: G8
                const dim6 = [getActionText(report, 8)]
                    .filter(Boolean)
                    .join("\n");
                // Dim 7: G9, G10
                const dim7 = [
                    getActionText(report, 9),
                    getActionText(report, 10),
                ]
                    .filter(Boolean)
                    .join("\n");

                const rowData = [
                    dateObj.toLocaleDateString("th-TH"),
                    dateObj.toLocaleTimeString("th-TH"),
                    `${patient?.firstName || ""} ${
                        patient?.lastName || ""
                    }`.trim(),
                    patient?.gender || sec2.gender || "",
                    s.region,
                    sec2.respondentName || "",
                    part1.interviewerName || "",
                    dim1,
                    dim2,
                    dim3,
                    dim4,
                    dim5,
                    dim6,
                    dim7,
                ];

                return rowData.map(escapeCSV).join(",");
            });

            const csvContent = [
                headers.map(escapeCSV).join(","),
                ...csvRows,
            ].join("\n");

            // BOM for Excel
            const BOM = "\uFEFF";
            const blob = new Blob([BOM + csvContent], {
                type: "text/csv;charset=utf-8;",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            const regionSuffix = regionFilter ? `_${regionFilter}` : "_all";
            link.setAttribute(
                "download",
                `survey_report${regionSuffix}_${
                    new Date().toISOString().split("T")[0]
                }.csv`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
            <Download size={18} />
            {loading ? "กำลัง Export..." : "Export Report (CSV)"}
        </button>
    );
}
