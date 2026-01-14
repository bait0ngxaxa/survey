/**
 * Format date for display
 * @param date - Date to format
 * @param includeTime - Whether to include time in output
 * @returns Formatted date string in Thai locale
 */
export function formatDate(date: Date | null, includeTime = false): string {
    if (!date) return "-";
    if (includeTime) {
        return new Date(date).toLocaleString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    return new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

/**
 * Get user display name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param fallback - Fallback text if no name available
 * @returns Display name string
 */
export function getUserDisplayName(
    firstName?: string | null,
    lastName?: string | null,
    fallback = "ไม่ระบุชื่อ"
): string {
    if (firstName || lastName) {
        return `${firstName || ""} ${lastName || ""}`.trim();
    }
    return fallback;
}

/**
 * Get user initials for avatar
 * @param firstName - User's first name
 * @param email - User's email
 * @returns Single character initial
 */
export function getUserInitial(
    firstName?: string | null,
    email?: string | null
): string {
    return (firstName?.[0] || email?.[0] || "?").toUpperCase();
}
