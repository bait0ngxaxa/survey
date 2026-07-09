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
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap hidden md:inline thai-text">
                ภูมิภาค:
            </span>
            <div className="flex gap-2" role="list" aria-label="กรองตามภูมิภาค">
                {REGIONS.map((r) => (
                    <Link
                        key={r}
                        href={`/admin/submissions?page=1${
                            r ? `&region=${r}` : ""
                        }${searchQuery ? `&search=${searchQuery}` : ""}`}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${
                            currentRegion === r
                                ? "proms-primary-gradient"
                                : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-800"
                        }`}
                        aria-current={currentRegion === r ? "page" : undefined}
                    >
                        {REGION_LABELS[r] || r}
                    </Link>
                ))}
            </div>
        </div>
    );
}
