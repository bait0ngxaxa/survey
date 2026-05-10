"use client";

import { useState } from "react";
import {
    ClipboardList,
    ChevronDown,
    ChevronUp,
    Calendar,
    User,
    ArrowUpRight,
    Hash
} from "lucide-react";
import { regions } from "@/config/surveyData";
import { type AdminSubmission } from "@/lib/types";
import { formatDateMedium } from "@/lib/utils/formatDate";

interface SubmissionHistoryProps {
    submissions: AdminSubmission[];
}

function maskSubmissionId(id: string): string {
    return id.slice(0, 8).toUpperCase();
}

function getRegionInfo(regionId: string) {
    const region = regions.find((r) => r.id === regionId);
    return region || { name: regionId, color: "bg-slate-500" };
}

export default function SubmissionHistory({
    submissions,
}: SubmissionHistoryProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    if (submissions.length === 0) {
        return (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex p-5 bg-slate-50 rounded-3xl mb-6">
                    <ClipboardList className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2 thai-text">
                    ยังไม่มีประวัติการบันทึก
                </h2>
                <p className="text-slate-400 thai-text max-w-xs mx-auto">
                    ข้อมูลที่คุณบันทึกจะปรากฏที่นี่หลังจากส่งแบบสอบถามครั้งแรก
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm transition-all duration-500">
            {/* Aesthetic Header */}
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="absolute inset-0 bg-sky-500/20 blur-lg rounded-full" />
                        <div className="relative p-4 bg-sky-600 rounded-2xl">
                            <ClipboardList className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 thai-text tracking-tight">
                            ประวัติการบันทึกล่าสุด
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Data Feed // {submissions.length} Nodes
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group flex items-center gap-3 px-5 py-2.5 bg-slate-50 hover:bg-sky-600 text-slate-600 hover:text-white rounded-xl border border-slate-200 transition-all duration-300 font-bold text-sm"
                >
                    {isExpanded ? "ย่อมุมมอง" : "ขยายมุมมอง"}
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                    ) : (
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    )}
                </button>
            </div>

            {/* Interactive Table Content */}
            {isExpanded && (
                <div className="animate-in slide-in-from-top-2 fade-in duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                        Clinical ID
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                        Patient Identification
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                        Regional Node
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                        Timestamp
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {submissions.map((submission, idx) => {
                                    const regionInfo = getRegionInfo(
                                        submission.region,
                                    );
                                    const patientName =
                                        [
                                            submission.patient?.firstName,
                                            submission.patient?.lastName,
                                        ]
                                            .filter(Boolean)
                                            .join(" ") || "-";

                                    return (
                                        <tr
                                            key={submission.id}
                                            className="group hover:bg-slate-50/80 transition-all duration-300"
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <Hash className="w-3.5 h-3.5 text-slate-300" />
                                                    <code className="text-xs font-mono font-bold text-slate-500 group-hover:text-sky-600 transition-colors">
                                                        {maskSubmissionId(submission.id)}
                                                    </code>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                                                        <User className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700 thai-text group-hover:text-slate-900 transition-colors">
                                                        {patientName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white border border-slate-100 rounded-lg group-hover:border-slate-200 transition-colors">
                                                    <span className={`w-2 h-2 rounded-full ${regionInfo.color} animate-pulse`} />
                                                    <span className="text-xs font-bold text-slate-600 thai-text">
                                                        {regionInfo.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2.5">
                                                        <Calendar className="w-4 h-4 text-slate-300" />
                                                        <span className="text-xs font-medium text-slate-500">
                                                            {formatDateMedium(submission.createdAt)}
                                                        </span>
                                                    </div>
                                                    <ArrowUpRight className="w-4 h-4 text-slate-200 opacity-0 group-hover:opacity-100 group-hover:text-sky-400 transition-all duration-300" />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* View More Subtle CTA */}
                    <div className="p-6 bg-slate-50/30 text-center">
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
                            End of Recent Ledger
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
