"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmExitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export default function ConfirmExitModal({
    isOpen,
    onClose,
    onConfirm,
    title = "ออกจากแบบสอบถาม?",
    message = "ข้อมูลที่กรอกไว้จะไม่ถูกบันทึก คุณต้องการออกจากหน้านี้ใช่หรือไม่?",
}: ConfirmExitModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-exit-title"
                className="proms-panel relative rounded-2xl p-8 max-w-md w-full animate-in zoom-in-95 fade-in duration-300"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                    type="button"
                    aria-label="ปิดหน้าต่างยืนยันการออก"
                >
                    <X size={24} aria-hidden="true" />
                </button>

                <div className="text-center">
                    <div className="w-16 h-16 proms-primary-gradient rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg shadow-sky-200/70">
                        <AlertTriangle size={32} aria-hidden="true" />
                    </div>

                    <h3
                        id="confirm-exit-title"
                        className="text-xl font-bold text-gray-900 mb-2 thai-text"
                    >
                        {title}
                    </h3>

                    <p className="text-gray-700 whitespace-pre-wrap thai-text leading-relaxed">
                        {message}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={onClose}
                            className="min-h-11 flex-1 rounded-xl bg-sky-50 py-2.5 font-semibold text-sky-800 transition-colors hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                            type="button"
                        >
                            ยกเลิก
                        </button>
                        <button
                            onClick={onConfirm}
                            className="min-h-11 flex-1 rounded-xl py-2.5 proms-primary-gradient font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                            type="button"
                        >
                            ออกจากแบบสอบถาม
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
