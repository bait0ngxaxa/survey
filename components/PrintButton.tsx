"use client";

import { Printer } from "lucide-react";

interface PrintButtonProps {
    label?: string;
}

export default function PrintButton({
    label = "Print Report",
}: PrintButtonProps) {
    return (
        <button
            onClick={() => typeof window !== "undefined" && window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 transition-all active:scale-95 cursor-pointer"
        >
            <Printer size={18} />
            {label}
        </button>
    );
}
