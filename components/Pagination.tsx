"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BasePaginationProps {
    currentPage: number;
    totalPages: number;
}

interface UrlPaginationProps extends BasePaginationProps {
    /** Base path for URL-based pagination (e.g., "/admin/submissions") */
    basePath: string;
    /** URL search params to preserve */
    searchParams?: Record<string, string>;
    onPageChange?: never;
}

interface CallbackPaginationProps extends BasePaginationProps {
    /** Callback-based pagination: function called when page changes */
    onPageChange: (page: number) => void;
    basePath?: never;
    searchParams?: never;
}

type PaginationProps = UrlPaginationProps | CallbackPaginationProps;

/**
 * Shared Pagination component that supports both:
 * - URL-based navigation (using Next.js Link with basePath + searchParams)
 * - Callback-based navigation (using button onClick)
 */
export function Pagination(props: PaginationProps) {
    const { currentPage, totalPages } = props;

    if (totalPages <= 1) return null;

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    // Build URL for a given page number (only for URL-based pagination)
    const buildUrl = (page: number): string => {
        if ("basePath" in props && props.basePath) {
            const params = new URLSearchParams();
            params.set("page", String(page));
            if (props.searchParams) {
                Object.entries(props.searchParams).forEach(([key, value]) => {
                    if (value) params.set(key, value);
                });
            }
            return `${props.basePath}?${params.toString()}`;
        }
        return "#";
    };

    const prevButtonClasses = `group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 overflow-hidden transition-all duration-200 ${
        isPrevDisabled
            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
            : "bg-white text-slate-700 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
    }`;

    const nextButtonClasses = `group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 overflow-hidden transition-all duration-200 ${
        isNextDisabled
            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
            : "text-white shadow-[0_4px_16px_rgba(14,165,233,0.25)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.35)] hover:-translate-y-0.5"
    }`;

    const prevContent = (
        <>
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>ก่อนหน้า</span>
        </>
    );

    const nextContent = (
        <>
            {/* Gradient background for active state */}
            {!isNextDisabled && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 transition-opacity duration-200" />
                </>
            )}
            <span className="relative z-10">ถัดไป</span>
            <ChevronRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </>
    );

    // Determine if using URL-based or callback-based navigation
    const useLinks = "basePath" in props && !!props.basePath;

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

            {/* Navigation buttons */}
            <div className="flex gap-3 w-full sm:w-auto">
                {useLinks ? (
                    <>
                        <Link
                            href={buildUrl(currentPage - 1)}
                            className={prevButtonClasses}
                            aria-disabled={isPrevDisabled}
                        >
                            {prevContent}
                        </Link>
                        <Link
                            href={buildUrl(currentPage + 1)}
                            className={nextButtonClasses}
                            aria-disabled={isNextDisabled}
                        >
                            {nextContent}
                        </Link>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() =>
                                "onPageChange" in props &&
                                props.onPageChange?.(currentPage - 1)
                            }
                            disabled={isPrevDisabled}
                            className={prevButtonClasses}
                        >
                            {prevContent}
                        </button>
                        <button
                            onClick={() =>
                                "onPageChange" in props &&
                                props.onPageChange?.(currentPage + 1)
                            }
                            disabled={isNextDisabled}
                            className={nextButtonClasses}
                        >
                            {nextContent}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
