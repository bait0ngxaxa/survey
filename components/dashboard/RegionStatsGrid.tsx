import { Activity } from "lucide-react";
import { DASHBOARD_REGIONS } from "@/lib/constants/dashboardConstants";
import { RegionStatCard } from "./RegionStatCard";

interface RegionByCount {
    region: string;
    count: number;
}

interface RegionStatsGridProps {
    byRegion: RegionByCount[];
}

export function RegionStatsGrid({ byRegion }: RegionStatsGridProps) {
    const getCount = (regionId: string): number => {
        const found = byRegion.find((r) => r.region === regionId);
        return found ? found.count : 0;
    };

    return (
        <section aria-labelledby="region-stats-title">
            <h2
                id="region-stats-title"
                className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 thai-text"
            >
                <Activity size={24} className="text-sky-700" aria-hidden="true" />
                แยกรายเขตสุขภาพ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {DASHBOARD_REGIONS.map((region) => (
                    <RegionStatCard
                        key={region.id}
                        region={region}
                        count={getCount(region.id)}
                    />
                ))}
            </div>
        </section>
    );
}
