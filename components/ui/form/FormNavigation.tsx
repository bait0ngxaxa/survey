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
        <div className="p-4 sm:p-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 bg-gray-50">
            {showBack && onBack ? (
                <button
                    onClick={onBack}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-all flex items-center justify-center gap-2"
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
                className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                    isSubmit
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
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
