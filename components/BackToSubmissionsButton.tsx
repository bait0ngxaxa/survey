"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackToSubmissionsButton() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.push("/admin/submissions")}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
        >
            <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            กลับไปรายการแบบสอบถาม
        </button>
    );
}
