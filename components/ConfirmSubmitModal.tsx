"use client";

import { Check } from "lucide-react";

interface ConfirmSubmitModalProps {
    isOpen: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    titleSubmitting?: string;
    message?: string;
    messageSubmitting?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

export default function ConfirmSubmitModal({
    isOpen,
    isSubmitting,
    onClose,
    onConfirm,
    title = "ยืนยันการส่งแบบสอบถาม?",
    titleSubmitting = "กำลังส่งข้อมูล...",
    message = "ท่านได้ทำแบบสอบถามครบถ้วนแล้ว ต้องการส่งข้อมูลเลยหรือไม่",
    messageSubmitting = "กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูลของท่าน",
    confirmLabel = "ยืนยันส่งข้อมูล",
    cancelLabel = "กลับไปแก้ไข",
}: ConfirmSubmitModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-submit-title"
                className="proms-panel rounded-2xl max-w-md w-full p-6"
            >
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {isSubmitting ? (
                            <div
                                className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"
                                aria-hidden="true"
                            />
                        ) : (
                            <Check size={32} aria-hidden="true" />
                        )}
                    </div>

                    <h3
                        id="confirm-submit-title"
                        className="text-xl font-bold text-gray-900 thai-text"
                    >
                        {isSubmitting ? titleSubmitting : title}
                    </h3>

                    <p className="text-gray-700 thai-text leading-relaxed">
                        {isSubmitting ? messageSubmitting : message}
                    </p>

                    {!isSubmitting && (
                        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                            <button
                                onClick={onClose}
                                className="min-h-11 flex-1 rounded-xl border border-sky-200 px-4 py-2 font-semibold text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                                disabled={isSubmitting}
                                type="button"
                            >
                                {cancelLabel}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="min-h-11 flex-1 rounded-xl px-4 py-2 proms-primary-gradient font-semibold transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                                disabled={isSubmitting}
                                type="button"
                            >
                                {confirmLabel}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
