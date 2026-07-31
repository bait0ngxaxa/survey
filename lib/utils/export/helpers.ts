import { type ReportData } from "@/lib/types";

export function translateRegion(value: string): string {
    const map: Record<string, string> = {
        central: "ทีมกลาง",
        phetchabun: "เพชรบูรณ์",
        satun: "สตูล",
        lopburi: "ลพบุรี",
    };
    return map[value] || value || "";
}

export function formatBirthDateThai(
    dateValue: string | Date | null | undefined,
): string {
    if (!dateValue) return "";

    if (dateValue instanceof Date) {
        if (Number.isNaN(dateValue.getTime())) return "";

        const year = dateValue.getUTCFullYear();
        const month = String(dateValue.getUTCMonth() + 1).padStart(2, "0");
        const day = String(dateValue.getUTCDate()).padStart(2, "0");
        return `${day}/${month}/${year + 543}`;
    }

    const dateStr = dateValue.trim();
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    if (!year || !month || !day) return dateStr;
    const buddhistYear = parseInt(year) + 543;
    return `${day}/${month}/${buddhistYear}`;
}

/**
 * Gets action text from report data for a specific step
 */
export function getActionText(report: ReportData, stepId: number): string {
    const step = report[`step_${stepId}`];
    if (!step || !step.action) return "";
    return `${step.label?.split("\n")[0] || `ข้อ ${stepId}`}: ${step.action}`;
}

/**
 * Formats field with "other" option
 */
export function formatWithOther(
    value: string | undefined,
    otherValue: string | undefined,
    otherLabel: string = "อื่น ๆ",
): string {
    if (value === otherLabel && otherValue) {
        return `${otherLabel}: ${otherValue}`;
    }
    return value || "";
}

/**
 * Formats screening field with "other" option
 */
export function formatScreening(
    value: string | undefined,
    otherValue: string | undefined,
): string {
    if (value === "อื่น ๆ" && otherValue) {
        return `อื่น ๆ: ${otherValue}`;
    }
    return value || "";
}
