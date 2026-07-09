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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-8 sm:pb-0">
            <div className="flex items-center gap-2 px-4 py-2 proms-panel rounded-xl">
                <span className="text-sm text-slate-500">หน้า</span>
                <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 proms-primary-gradient text-sm font-bold rounded-lg">
                    {currentPage}
                </span>
                <span className="text-sm text-slate-500">จาก</span>
                <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
                    {totalPages}
                </span>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
                <Link
                    href={buildUrl(currentPage - 1)}
                    className={`group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${
                        currentPage <= 1
                            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
                            : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                    aria-disabled={currentPage <= 1}
                >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    <span>ก่อนหน้า</span>
                </Link>

                <Link
                    href={buildUrl(currentPage + 1)}
                    className={`group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${
                        currentPage >= totalPages
                            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
                            : "proms-primary-gradient"
                    }`}
                    aria-disabled={currentPage >= totalPages}
                >
                    <span>ถัดไป</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
            </div>
        </div>
    );
}
