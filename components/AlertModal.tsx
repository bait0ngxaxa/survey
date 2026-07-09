"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    variant?: "error" | "success";
    autoClose?: number;
}

export default function AlertModal({
    isOpen,
    onClose,
    title = "แจ้งเตือน",
    message,
    variant = "error",
    autoClose = 0,
}: AlertModalProps) {
    useEffect(() => {
        if (autoClose <= 0 || !isOpen) return;

        const timeoutId = window.setTimeout(onClose, autoClose);
        return () => window.clearTimeout(timeoutId);
    }, [autoClose, isOpen, onClose]);

    if (!isOpen) return null;

    const isSuccess = variant === "success";
    const Icon = isSuccess ? CheckCircle : AlertCircle;
    const iconBgColor = isSuccess ? "bg-sky-100" : "bg-red-100";
    const iconTextColor = isSuccess ? "text-sky-600" : "text-red-600";
    const buttonBgColor = isSuccess
        ? "proms-primary-gradient"
        : "bg-red-700 hover:bg-red-800";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="alert-modal-title"
                className="proms-panel rounded-2xl p-6 sm:p-8 max-w-sm w-full relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 rounded-full"
                    type="button"
                    aria-label="ปิดข้อความแจ้งเตือน"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div
                        className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-4 ${iconTextColor}`}
                    >
                        <Icon size={32} aria-hidden="true" />
                    </div>

                    <h3
                        id="alert-modal-title"
                        className="text-xl font-bold text-gray-900 mb-2 thai-text"
                    >
                        {title}
                    </h3>

                    <p className="text-gray-700 whitespace-pre-wrap thai-text break-words leading-relaxed">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={`mt-6 w-full py-2.5 text-white rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${buttonBgColor}`}
                        type="button"
                    >
                        ตกลง
                    </button>
                </div>
            </div>
        </div>
    );
}
