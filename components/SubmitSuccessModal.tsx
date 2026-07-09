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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="submit-success-title"
                className="proms-panel rounded-2xl p-6 sm:p-8 max-w-sm w-full relative"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mb-6 text-sky-600">
                        <CheckCircle size={48} />
                    </div>

                    <h3
                        id="submit-success-title"
                        className="text-2xl font-bold text-gray-900 mb-2 thai-text"
                    >
                        บันทึกข้อมูลสำเร็จ!
                    </h3>

                    <p className="text-gray-700 mb-6 thai-text leading-relaxed">
                        ขอขอบพระคุณ ทุกท่านเป็นอย่างสูง
                        ที่ท่านกรุณาสละเวลาร่วมตอบแบบสอบถามในครั้งนี้
                    </p>

                    <div className="text-sm text-gray-400">
                        กำลังนำท่านไปยังหน้าหลักใน{" "}
                        <span className="font-bold text-sky-600">
                            {countdown}
                        </span>{" "}
                        วินาที
                    </div>

                    <button
                        onClick={() => router.push(redirectTo)}
                        className="mt-6 px-6 py-3 proms-primary-gradient rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                        type="button"
                    >
                        ไปยังหน้าหลัก
                    </button>
                </div>
            </div>
        </div>
    );
}
