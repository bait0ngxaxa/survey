const STRICT_INTEGER_PATTERN = /^\d+$/;
const STRICT_DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;
const STRICT_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isStrictIntegerString(value: string): boolean {
    return STRICT_INTEGER_PATTERN.test(value);
}

export function isStrictDecimalString(value: string): boolean {
    return STRICT_DECIMAL_PATTERN.test(value);
}

export function parseStrictDate(value: string): Date | null {
    const match = STRICT_DATE_PATTERN.exec(value);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(0);

    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(0, 0, 0, 0);

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        return null;
    }

    return date;
}

export function isStrictDateString(value: string): boolean {
    return parseStrictDate(value) !== null;
}
