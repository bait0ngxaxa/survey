"use client";

import { Printer } from "lucide-react";

interface PrintButtonProps {
    label?: string;
}

export default function PrintButton({
    label = "พิมพ์รายงาน",
}: PrintButtonProps) {
    return (
        <button
            onClick={() => typeof window !== "undefined" && window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 proms-primary-gradient rounded-xl font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
            type="button"
        >
            <Printer size={18} aria-hidden="true" />
            {label}
        </button>
    );
}
