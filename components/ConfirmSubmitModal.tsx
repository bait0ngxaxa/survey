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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {isSubmitting ? (
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Check size={32} />
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                        {isSubmitting ? titleSubmitting : title}
                    </h3>

                    <p className="text-gray-500">
                        {isSubmitting ? messageSubmitting : message}
                    </p>

                    {!isSubmitting && (
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors"
                                disabled={isSubmitting}
                            >
                                {cancelLabel}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-blue-200 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
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
