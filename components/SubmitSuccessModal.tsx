"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmitSuccessModalProps {
    isOpen: boolean;
    redirectTo?: string;
    autoRedirectDelay?: number; // milliseconds
}

export default function SubmitSuccessModal({
    isOpen,
    redirectTo = "/dashboard",
    autoRedirectDelay = 3000,
}: SubmitSuccessModalProps) {
    const router = useRouter();
    const [countdown, setCountdown] = useState(
        Math.ceil(autoRedirectDelay / 1000)
    );

    useEffect(() => {
        if (!isOpen) return;

        // Countdown timer
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Auto redirect
        const redirectTimer = setTimeout(() => {
            router.push(redirectTo);
        }, autoRedirectDelay);

        return () => {
            clearInterval(countdownInterval);
            clearTimeout(redirectTimer);
        };
    }, [isOpen, router, redirectTo, autoRedirectDelay]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all animate-in zoom-in-95 duration-300 relative">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                        <CheckCircle size={48} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        บันทึกข้อมูลสำเร็จ!
                    </h3>

                    <p className="text-gray-500 mb-6">
                        ขอขอบพระคุณ ทุกท่านเป็นอย่างสูง
                        ที่ท่านกรุณาสละเวลาร่วมตอบแบบสอบถามในครั้งนี้
                    </p>

                    <div className="text-sm text-gray-400">
                        กำลังนำท่านไปยังหน้าหลักใน{" "}
                        <span className="font-bold text-blue-600">
                            {countdown}
                        </span>{" "}
                        วินาที
                    </div>

                    <button
                        onClick={() => router.push(redirectTo)}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all"
                    >
                        ไปยังหน้าหลัก
                    </button>
                </div>
            </div>
        </div>
    );
}
