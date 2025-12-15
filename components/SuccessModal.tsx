"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function SuccessModal() {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleClose = useCallback(() => {
        setIsOpen(false);

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("loggedIn");
        router.replace(`${pathname}?${newParams.toString()}`);
    }, [searchParams, router, pathname]);

    const shouldShowModal = searchParams.get("loggedIn") === "true";

    useEffect(() => {
        if (shouldShowModal && !isOpen) {
            const openTimer = setTimeout(() => setIsOpen(true), 0);
            return () => clearTimeout(openTimer);
        }
    }, [shouldShowModal, isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            handleClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all animate-in zoom-in-95 duration-300 relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <CheckCircle size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        เข้าสู่ระบบสำเร็จ
                    </h3>

                    <p className="text-gray-500">ยินดีต้อนรับเข้าสู่ระบบ</p>
                </div>
            </div>
        </div>
    );
}
