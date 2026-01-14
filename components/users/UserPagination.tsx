import { ChevronLeft, ChevronRight } from "lucide-react";

interface UserPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function UserPagination({
    currentPage,
    totalPages,
    onPageChange,
}: UserPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-8 sm:pb-0">
            {/* Page indicator with badge styling */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <span className="text-sm text-slate-500">หน้า</span>
                <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold rounded-lg shadow-md shadow-sky-500/20">
                    {currentPage}
                </span>
                <span className="text-sm text-slate-500">จาก</span>
                <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
                    {totalPages}
                </span>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3 w-full sm:w-auto">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 overflow-hidden transition-all duration-200 ${
                        currentPage <= 1
                            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
                            : "bg-white text-slate-700 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                    }`}
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    <span>ก่อนหน้า</span>
                </button>

                {/* Next button with gradient */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 overflow-hidden transition-all duration-200 ${
                        currentPage >= totalPages
                            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
                            : "text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5"
                    }`}
                >
                    {/* Gradient background for active state */}
                    {currentPage < totalPages && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-400 to-blue-500 transition-opacity duration-200" />
                        </>
                    )}
                    <span className="relative z-10">ถัดไป</span>
                    <ChevronRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>
        </div>
    );
}
