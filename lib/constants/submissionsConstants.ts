/** Default page size for paginated queries */
export const DEFAULT_PAGE_SIZE = 10;

/** Region ID constants — use instead of magic strings */
export const REGION_ID = {
    CENTRAL: "central",
    PHETCHABUN: "phetchabun",
    SATUN: "satun",
    LOPBURI: "lopburi",
} as const;

export const REGIONS = [
    "",
    REGION_ID.CENTRAL,
    REGION_ID.PHETCHABUN,
    REGION_ID.SATUN,
    REGION_ID.LOPBURI,
] as const;

/** Region type */
export type Region = (typeof REGIONS)[number];

/** Region display labels */
export const REGION_LABELS: Record<string, string> = {
    "": "ทั้งหมด",
    [REGION_ID.CENTRAL]: "ทีมกลาง",
    [REGION_ID.PHETCHABUN]: "เพชรบูรณ์",
    [REGION_ID.SATUN]: "สตูล",
    [REGION_ID.LOPBURI]: "ลพบุรี",
};

/**
 * Get display label for a region
 * @param region - Region key
 * @returns Display label in Thai
 */
export function getRegionLabel(region: string): string {
    return REGION_LABELS[region] || region;
}
