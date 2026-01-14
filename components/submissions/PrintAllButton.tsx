"use client";

import Link from "next/link";
import { Printer } from "lucide-react";

export function PrintAllButton() {
    return (
        <Link
            href="/admin/submissions/print-all"
            className="group relative flex items-center justify-center gap-2 bg-white border border-slate-200/80 text-slate-700 px-5 py-2.5 rounded-xl font-medium overflow-hidden transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
        >
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50/80 rounded-xl" />
            <div className="absolute inset-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.03)] rounded-xl" />

            {/* Content */}
            <Printer
                size={18}
                className="relative z-10 group-hover:text-sky-600 transition-colors"
            />
            <span className="relative z-10">Print All</span>
        </Link>
    );
}
