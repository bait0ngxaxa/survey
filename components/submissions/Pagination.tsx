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
            {/* Page indicator with badge styling */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <span className="text-sm text-slate-500">หน้า</span>
                <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white text-sm font-bold rounded-lg shadow-[0_2px_8px_rgba(14,165,233,0.3)]">
                    {currentPage}
                </span>
                <span className="text-sm text-slate-500">จาก</span>
                <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
                    {totalPages}
                </span>
            </div>

            {/* Navigation buttons with enhanced styling */}
            <div className="flex gap-3 w-full sm:w-auto">
                {/* Previous button */}
                <Link
                    href={buildUrl(currentPage - 1)}
                    className={`group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 overflow-hidden transition-all duration-200 ${
                        currentPage <= 1
                            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
                            : "bg-white text-slate-700 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                    }`}
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    <span>ก่อนหน้า</span>
                </Link>

                {/* Next button with gradient */}
                <Link
                    href={buildUrl(currentPage + 1)}
                    className={`group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 overflow-hidden transition-all duration-200 ${
                        currentPage >= totalPages
                            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
                            : "text-white shadow-[0_4px_16px_rgba(14,165,233,0.25)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.35)] hover:-translate-y-0.5"
                    }`}
                >
                    {/* Gradient background for active state */}
                    {currentPage < totalPages && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 transition-opacity duration-200" />
                        </>
                    )}
                    <span className="relative z-10">ถัดไป</span>
                    <ChevronRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}
