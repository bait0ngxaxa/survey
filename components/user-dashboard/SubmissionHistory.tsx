"use client";

import { useState } from "react";
import {
    ClipboardList,
    ChevronDown,
    ChevronUp,
    Calendar,
    User,
    Hash,
    AlertCircle,
} from "lucide-react";
import { regions } from "@/config/surveyData";
import { type AdminSubmission } from "@/lib/types";
import { formatDateMedium } from "@/lib/utils/formatDate";

interface SubmissionHistoryProps {
    submissions: AdminSubmission[];
    loadError?: string;
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
    loadError,
}: SubmissionHistoryProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    if (loadError) {
        return (
            <section
                aria-labelledby="submission-history-title"
                className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                        <AlertCircle className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 space-y-2">
                        <h2
                            id="submission-history-title"
                            className="text-xl font-bold text-amber-950 thai-text"
                        >
                            ยังโหลดประวัติการบันทึกไม่ได้
                        </h2>
                        <p className="text-sm leading-relaxed text-amber-800 thai-text break-words">
                            {loadError} กรุณารีเฟรชหน้าอีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (submissions.length === 0) {
        return (
            <section
                aria-labelledby="submission-history-title"
                className="proms-panel rounded-2xl p-8 sm:p-10 text-center"
            >
                <div className="mb-5 inline-flex rounded-2xl bg-sky-50 p-4 text-sky-500 ring-1 ring-sky-100">
                    <ClipboardList className="w-10 h-10" aria-hidden="true" />
                </div>
                <h2
                    id="submission-history-title"
                    className="text-xl font-bold text-slate-900 mb-2 thai-text"
                >
                    ยังไม่มีประวัติการบันทึก
                </h2>
                <p className="text-slate-600 thai-text max-w-sm mx-auto leading-relaxed">
                    ข้อมูลที่คุณบันทึกจะปรากฏที่นี่หลังจากส่งแบบสอบถามครั้งแรก
                </p>
            </section>
        );
    }

    return (
        <section
            aria-labelledby="submission-history-title"
            className="proms-panel rounded-2xl overflow-hidden"
        >
            <div className="flex flex-col justify-between gap-6 border-b border-sky-100 p-5 sm:p-6 md:flex-row md:items-center lg:p-8">
                <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                    <div className="shrink-0 rounded-2xl proms-primary-gradient p-3">
                        <ClipboardList className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <h2
                            id="submission-history-title"
                            className="text-2xl font-black text-slate-900 thai-text tracking-tight"
                        >
                            ประวัติการบันทึกล่าสุด
                        </h2>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                            <p className="text-sm font-semibold text-slate-600 thai-text">
                                แสดง {submissions.length} รายการล่าสุด
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group flex min-h-11 items-center justify-center gap-3 rounded-xl border border-sky-100 bg-sky-50 px-5 py-2.5 text-sm font-bold text-sky-800 transition-colors duration-200 hover:bg-linear-to-r hover:from-sky-500 hover:via-blue-600 hover:to-cyan-500 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 md:w-auto"
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls="submission-history-content"
                >
                    {isExpanded ? "ย่อมุมมอง" : "ขยายมุมมอง"}
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                    ) : (
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    )}
                </button>
            </div>

            {isExpanded && (
                <div id="submission-history-content">
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="proms-header-gradient">
                                    <th className="px-8 py-5 text-xs font-bold text-sky-800 border-b border-sky-100">
                                        ID แบบสอบถาม
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold text-sky-800 border-b border-sky-100">
                                        ผู้ป่วย
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold text-sky-800 border-b border-sky-100">
                                        เขตสุขภาพ
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold text-sky-800 border-b border-sky-100">
                                        วันที่บันทึก
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {submissions.map((submission) => {
                                    const regionInfo = getRegionInfo(
                                        submission.region,
                                    );
                                    const patientName =
                                        submission.respondent || "-";

                                    return (
                                        <tr
                                            key={submission.id}
                                            className="group hover:bg-slate-50/80 transition-colors duration-200"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <Hash className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
                                                    <code className="text-xs font-mono font-bold text-slate-600 group-hover:text-sky-700 transition-colors">
                                                        {maskSubmissionId(submission.id)}
                                                    </code>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center transition-colors duration-200">
                                                        <User className="w-4 h-4 text-slate-400 group-hover:text-sky-500" aria-hidden="true" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700 thai-text group-hover:text-slate-900 transition-colors break-words">
                                                        {patientName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white border border-slate-100 rounded-lg group-hover:border-slate-200 transition-colors">
                                                    <span className={`w-2 h-2 shrink-0 rounded-full ${regionInfo.color}`} />
                                                    <span className="text-xs font-bold text-slate-600 thai-text">
                                                        {regionInfo.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center">
                                                    <div className="flex items-center gap-2.5">
                                                        <Calendar className="w-4 h-4 text-slate-300" aria-hidden="true" />
                                                        <span className="text-xs font-medium text-slate-500">
                                                            {formatDateMedium(submission.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="divide-y divide-slate-100 md:hidden">
                        {submissions.map((submission) => {
                            const regionInfo = getRegionInfo(submission.region);
                            const patientName = submission.respondent || "-";

                            return (
                                <article
                                    key={submission.id}
                                    className="space-y-4 p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-slate-500">
                                                ID แบบสอบถาม
                                            </p>
                                            <code className="font-mono text-sm font-bold text-slate-800 break-all">
                                                {maskSubmissionId(submission.id)}
                                            </code>
                                        </div>
                                        <span className="inline-flex max-w-[48%] shrink-0 items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                                            <span
                                                className={`h-2 w-2 shrink-0 rounded-full ${regionInfo.color}`}
                                            />
                                            <span className="truncate thai-text">
                                                {regionInfo.name}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                                        <span className="thai-text text-sm font-semibold text-slate-800 break-words">
                                            {patientName}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Calendar className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                                        {formatDateMedium(submission.createdAt)}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}
