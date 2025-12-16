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
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-8 border-t border-slate-100 mt-8">
            {showBack && onBack ? (
                <button
                    onClick={onBack}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                    type="button"
                >
                    <ChevronLeft size={20} />
                    {backLabel}
                </button>
            ) : (
                <div />
            )}
            <button
                onClick={onNext}
                disabled={disabled || isLoading}
                className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-sky-200/50 transition-all flex items-center justify-center gap-2 ${
                    isSubmit
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-sky-600 hover:bg-sky-700 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                type="button"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        กำลังดำเนินการ...
                    </>
                ) : isSubmit ? (
                    <>
                        <Check size={20} />
                        {nextLabel}
                    </>
                ) : (
                    <>
                        {nextLabel}
                        <ChevronRight size={20} />
                    </>
                )}
            </button>
        </div>
    );
}
