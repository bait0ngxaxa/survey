import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    regionFilter: string;
    searchQuery: string;
}

export function Pagination({
    currentPage,
    totalPages,
    regionFilter,
    searchQuery,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const buildUrl = (page: number): string => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        if (regionFilter) params.set("region", regionFilter);
        if (searchQuery) params.set("search", searchQuery);
        return `/admin/submissions?${params.toString()}`;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-8 sm:pb-0">
            <div className="text-sm text-slate-500">
                หน้า{" "}
                <span className="font-semibold text-slate-900">
                    {currentPage}
                </span>{" "}
                จาก {totalPages}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <Link
                    href={buildUrl(currentPage - 1)}
                    className={`flex-1 sm:flex-none justify-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center gap-2 ${
                        currentPage <= 1
                            ? "pointer-events-none opacity-50 border-slate-200 bg-slate-50 text-slate-400"
                            : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400"
                    }`}
                >
                    <ChevronLeft className="w-4 h-4" />
                    ก่อนหน้า
                </Link>
                <Link
                    href={buildUrl(currentPage + 1)}
                    className={`flex-1 sm:flex-none justify-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center gap-2 ${
                        currentPage >= totalPages
                            ? "pointer-events-none opacity-50 border-slate-200 bg-slate-50 text-slate-400"
                            : "border-slate-900 text-white bg-slate-900 hover:bg-slate-800 hover:shadow-md"
                    }`}
                >
                    ถัดไป
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
