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
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity size={24} className="text-sky-500" />
                แยกรายเขตสุขภาพ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {DASHBOARD_REGIONS.map((region) => (
                    <RegionStatCard
                        key={region.id}
                        region={region}
                        count={getCount(region.id)}
                    />
                ))}
            </div>
        </div>
    );
}
