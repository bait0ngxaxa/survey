export const REGIONS = [
    "",
    "central",
    "phetchabun",
    "satun",
    "lopburi",
] as const;

/** Region type */
export type Region = (typeof REGIONS)[number];

/** Region display labels */
export const REGION_LABELS: Record<string, string> = {
    "": "ทั้งหมด",
    central: "ทีมกลาง",
    phetchabun: "เพชรบูรณ์",
    satun: "สตูล",
    lopburi: "ลพบุรี",
};

/**
 * Get display label for a region
 * @param region - Region key
 * @returns Display label in Thai
 */
export function getRegionLabel(region: string): string {
    return REGION_LABELS[region] || region;
}
