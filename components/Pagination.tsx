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

    const prevButtonClasses = `group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${
        isPrevDisabled
            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
            : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50"
    }`;

    const nextButtonClasses = `group relative flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${
        isNextDisabled
            ? "pointer-events-none opacity-50 bg-slate-100 text-slate-400 border border-slate-200"
            : "proms-primary-gradient"
    }`;

    const prevContent = (
        <>
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>ก่อนหน้า</span>
        </>
    );

    const nextContent = (
        <>
            <span>ถัดไป</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </>
    );

    // Determine if using URL-based or callback-based navigation
    const useLinks = "basePath" in props && !!props.basePath;

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
                            type="button"
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
                            type="button"
                        >
                            {nextContent}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
