import { MapPin } from "lucide-react";
import { type DashboardRegion } from "@/lib/constants/dashboardConstants";

interface RegionStatCardProps {
    region: DashboardRegion;
    count: number;
}

export function RegionStatCard({ region, count }: RegionStatCardProps) {
    return (
        <div
            className={`group p-6 rounded-3xl shadow-sm border bg-white/60 backdrop-blur-sm transition-all hover:-translate-y-1 duration-300 ${region.border} ${region.hoverutils}`}
        >
            <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-4">
                    <h3
                        className={`text-sm font-bold uppercase tracking-wider ${region.color}`}
                    >
                        {region.name}
                    </h3>
                    <div
                        className={`p-2.5 rounded-xl transition-colors duration-300 ${region.iconBg}`}
                    >
                        <MapPin className={`w-5 h-5 ${region.color}`} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-extrabold ${region.color}`}>
                        {count}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                        คน
                    </span>
                </div>
            </div>
        </div>
    );
}
