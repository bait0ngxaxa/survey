import Link from "next/link";
import { REGIONS, REGION_LABELS } from "@/lib/constants/submissionsConstants";

interface RegionFilterProps {
    currentRegion: string;
    searchQuery: string;
}

export function RegionFilter({
    currentRegion,
    searchQuery,
}: RegionFilterProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <span className="text-sm font-medium text-slate-500 whitespace-nowrap hidden md:inline">
                ภูมิภาค:
            </span>
            <div className="flex gap-2">
                {REGIONS.map((r) => (
                    <Link
                        key={r}
                        href={`/admin/submissions?page=1${
                            r ? `&region=${r}` : ""
                        }${searchQuery ? `&search=${searchQuery}` : ""}`}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                            currentRegion === r
                                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20"
                                : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                        }`}
                    >
                        {REGION_LABELS[r] || r}
                    </Link>
                ))}
            </div>
        </div>
    );
}
