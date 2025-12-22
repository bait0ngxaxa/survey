"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
    return (
        <button
            onClick={() => typeof window !== "undefined" && window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
            <Printer size={18} />
            Print Report
        </button>
    );
}
