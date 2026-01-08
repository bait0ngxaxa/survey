/**
 * Part 4 Survey Data - Main Entry Point
 * Re-exports all types, region data, and configurations
 */

// Types
export type {
    Part4Section,
    RegionGroupConfig,
    RegionUIStep,
    RegionConfig,
} from "./types";

// Region Data
export {
    centralPart4Data,
    centralGroups,
    centralUISteps,
    centralNegativeQuestions,
    centralRegionConfig,
} from "./central";

// Re-export original region data from main file for backward compatibility
// TODO: These should be split into separate files in future refactoring
export {
    phetchabunPart4Data,
    satunPart4Data,
    lopburiPart4Data,
} from "../part4Data";

// Region Configs Map
import { centralRegionConfig } from "./central";
import { RegionConfig } from "./types";

export const regionConfigs: Record<string, RegionConfig> = {
    central: centralRegionConfig,
    // Future regions can be added here:
    // phetchabun: phetchabunRegionConfig,
    // satun: satunRegionConfig,
    // lopburi: lopburiRegionConfig,
};

// Helper function to get region config
export function getRegionConfig(region: string): RegionConfig | null {
    return regionConfigs[region] || null;
}
