/**
 * Thai date formatting utilities — SSOT for all date display logic.
 * All functions use "th-TH" locale for consistent Thai formatting.
 */

/** Short date: "8 มี.ค. 69" */
export function formatDateShort(date: Date | string): string {
    return new Date(date).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "2-digit",
    });
}

/** Default date: "8 มี.ค. 2569" */
export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("th-TH");
}

/** Full date with time: "8 มีนาคม 2569 13:00" */
export function formatDateFull(date: Date | string): string {
    return new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** Medium date with time: "8 มี.ค. 2569 13:00" */
export function formatDateMedium(date: Date | string): string {
    return new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
