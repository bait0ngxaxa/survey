"use client";

import Link from "next/link";
import { Printer } from "lucide-react";

export function PrintAllButton() {
    return (
        <Link
            href="/admin/submissions/print-all"
            className="group relative flex items-center justify-center gap-2 bg-white border border-sky-200 text-sky-800 px-5 py-2.5 rounded-xl font-medium transition-colors duration-200 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
        >
            <Printer size={18} className="group-hover:text-sky-700" aria-hidden="true" />
            <span>พิมพ์ทั้งหมด</span>
        </Link>
    );
}
