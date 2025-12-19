"use client";

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
    if (autoClose > 0 && isOpen) {
        setTimeout(onClose, autoClose);
    }

    if (!isOpen) return null;

    const isSuccess = variant === "success";
    const Icon = isSuccess ? CheckCircle : AlertCircle;
    const iconBgColor = isSuccess ? "bg-blue-100" : "bg-red-100";
    const iconTextColor = isSuccess ? "text-blue-600" : "text-red-600";
    const buttonBgColor = isSuccess
        ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
        : "bg-red-600 hover:bg-red-700 shadow-red-200";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all animate-in zoom-in-95 duration-300 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div
                        className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-4 ${iconTextColor}`}
                    >
                        <Icon size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {title}
                    </h3>

                    <p className="text-gray-500 whitespace-pre-wrap">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={`mt-6 w-full py-2.5 text-white rounded-xl font-semibold transition-colors shadow-lg ${buttonBgColor}`}
                    >
                        ตกลง
                    </button>
                </div>
            </div>
        </div>
    );
}
