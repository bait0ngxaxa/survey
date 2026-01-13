// Types
export type {
    Part4Section,
    RegionGroupConfig,
    RegionUIStep,
    RegionConfig,
} from "./types";

// Central Region
export {
    centralPart4Data,
    centralGroups,
    centralUISteps,
    centralNegativeQuestions,
    centralRegionConfig,
} from "./central";

// Non-Central Regions
export { phetchabunPart4Data } from "./phetchabun";
export { satunPart4Data } from "./satun";
export { lopburiPart4Data } from "./lopburi";

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
