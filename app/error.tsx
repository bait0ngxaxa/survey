"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to monitoring service (e.g., Sentry)
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                </div>

                {/* Error Message */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    เกิดข้อผิดพลาด
                </h2>
                <p className="text-gray-600 mb-6">
                    ขออภัย เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === "development" && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                        <p className="text-sm font-mono text-red-800 break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-red-600 mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        ลองใหม่อีกครั้ง
                    </button>
                    <a
                        href="/dashboard"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        กลับหน้าหลัก
                    </a>
                </div>
            </div>
        </div>
    );
}
