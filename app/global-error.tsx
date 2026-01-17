"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return (
        <html lang="th">
            <body>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full text-center">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            เกิดข้อผิดพลาดร้ายแรง
                        </h2>
                        <p className="text-gray-600 mb-6">
                            ระบบเกิดข้อผิดพลาดที่ไม่สามารถกู้คืนได้ กรุณาลองใหม่
                        </p>
                        <button
                            onClick={reset}
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            ลองใหม่อีกครั้ง
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
