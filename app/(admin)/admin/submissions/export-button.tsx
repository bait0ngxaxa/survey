"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { getSubmissions } from "@/lib/actions/admin";

export default function ExportButton() {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        try {
            setLoading(true);
            // Fetch all data for export (adjust page size to large number or implement specific export action)
            // For simplicity, we just fetch first 1000 or need a separate full export action
            // But re-using getSubmissions with large pageSize is a quick fix for mvp

            const { submissions } = await getSubmissions(1, 1000);

            if (!submissions || submissions.length === 0) {
                alert("No data to export");
                return;
            }

            // Convert to CSV
            const headers = [
                "ID",
                "Patient ID",
                "Region",
                "Hospital",
                "Result",
                "Date",
            ];
            const csvContent = [
                headers.join(","),
                ...submissions.map((s) =>
                    [
                        s.id,
                        s.patientId,
                        s.region,
                        `"${s.hospital || ""}"`, // Quote hospital name in case of commas
                        s.interpretationResult || "",
                        new Date(s.createdAt).toLocaleDateString(),
                    ].join(",")
                ),
            ].join("\n");

            // Download
            const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute(
                "download",
                `survey_submission_${new Date().toISOString()}.csv`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Export failed", error);
            alert("Export failed");
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
            {loading ? "Exporting..." : "Export CSV"}
        </button>
    );
}
