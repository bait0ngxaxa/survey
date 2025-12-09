"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { getSubmissions } from "@/lib/actions/admin";

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

export default function ExportButton() {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        try {
            setLoading(true);
            const { submissions } = await getSubmissions(1, 10000);

            if (!submissions || submissions.length === 0) {
                alert("No data to export");
                return;
            }

            // Collect all possible headers from all submissions
            const allHeaders = new Set<string>([
                "id",
                "patientId",
                "patient_firstName",
                "patient_lastName",
                "region",
                "hospital",
                "totalScorePart4",
                "interpretationResult",
                "createdAt",
            ]);

            // Process all submissions and collect headers
            const processedData: Record<string, string>[] = [];

            for (const s of submissions) {
                const row: Record<string, string> = {
                    id: s.id,
                    patientId: s.patientId,
                    patient_firstName:
                        (s.patient as { firstName?: string })?.firstName || "",
                    patient_lastName:
                        (s.patient as { lastName?: string })?.lastName || "",
                    region: s.region,
                    hospital: s.hospital || "",
                    totalScorePart4: s.totalScorePart4?.toString() || "",
                    interpretationResult: s.interpretationResult || "",
                    createdAt: new Date(s.createdAt).toLocaleString("th-TH"),
                };

                // Flatten rawAnswers
                if (s.rawAnswers && typeof s.rawAnswers === "object") {
                    const flatAnswers = flattenObject(
                        s.rawAnswers as Record<string, unknown>,
                        "raw"
                    );
                    for (const key of Object.keys(flatAnswers)) {
                        allHeaders.add(key);
                    }
                    Object.assign(row, flatAnswers);
                }

                // Flatten scoreBySection
                if (s.scoreBySection && typeof s.scoreBySection === "object") {
                    const flatScores = flattenObject(
                        s.scoreBySection as Record<string, unknown>,
                        "score"
                    );
                    for (const key of Object.keys(flatScores)) {
                        allHeaders.add(key);
                    }
                    Object.assign(row, flatScores);
                }

                processedData.push(row);
            }

            // Convert to CSV
            const headerArray = Array.from(allHeaders);
            const csvContent = [
                headerArray.map(escapeCSV).join(","),
                ...processedData.map((row) =>
                    headerArray.map((h) => escapeCSV(row[h] || "")).join(",")
                ),
            ].join("\n");

            // Add BOM for Excel UTF-8 compatibility
            const BOM = "\uFEFF";
            const blob = new Blob([BOM + csvContent], {
                type: "text/csv;charset=utf-8;",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute(
                "download",
                `survey_full_export_${
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
            {loading ? "กำลัง Export..." : "Export CSV (ข้อมูลทั้งหมด)"}
        </button>
    );
}
