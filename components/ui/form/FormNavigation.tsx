"use client";

import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";

interface FormNavigationProps {
    onBack?: () => void;
    onNext: () => void;
    showBack?: boolean;
    nextLabel?: string;
    backLabel?: string;
    isSubmit?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function FormNavigation({
    onBack,
    onNext,
    showBack = true,
    nextLabel = "ถัดไป",
    backLabel = "ย้อนกลับ",
    isSubmit = false,
    isLoading = false,
    disabled = false,
}: FormNavigationProps) {
    return (
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-100 pt-8 sm:flex-row">
            {showBack && onBack ? (
                <button
                    onClick={onBack}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2.5 font-semibold text-sky-800 transition-colors hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6 sm:py-3"
                    type="button"
                    disabled={isLoading}
                >
                    <ChevronLeft size={20} aria-hidden="true" />
                    {backLabel}
                </button>
            ) : (
                <div />
            )}
            <button
                onClick={onNext}
                disabled={disabled || isLoading}
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 sm:w-auto sm:px-8 sm:py-3 ${
                    isSubmit
                        ? "proms-success-gradient"
                        : "proms-primary-gradient"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                type="button"
                aria-busy={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                        กำลังดำเนินการ...
                    </>
                ) : isSubmit ? (
                    <>
                        <Check size={20} aria-hidden="true" />
                        {nextLabel}
                    </>
                ) : (
                    <>
                        {nextLabel}
                        <ChevronRight size={20} aria-hidden="true" />
                    </>
                )}
            </button>
        </div>
    );
}
