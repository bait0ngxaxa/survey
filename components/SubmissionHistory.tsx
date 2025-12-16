"use client";

import { useState } from "react";
import {
    ClipboardList,
    ChevronDown,
    ChevronUp,
    Calendar,
    User,
} from "lucide-react";
import { regions } from "@/config/surveyData";

interface Submission {
    id: string;
    region: string;
    createdAt: Date;
    patient: {
        id: string;
        firstName: string | null;
        lastName: string | null;
    };
}

interface SubmissionHistoryProps {
    submissions: Submission[];
}

function maskSubmissionId(id: string): string {
    return id.slice(0, 8).toUpperCase();
}

function getRegionInfo(regionId: string) {
    const region = regions.find((r) => r.id === regionId);
    return region || { name: regionId, color: "bg-slate-500" };
}

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function SubmissionHistory({
    submissions,
}: SubmissionHistoryProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    if (submissions.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-xl shadow-sky-100/50 border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-50 rounded-xl">
                        <ClipboardList className="w-5 h-5 text-slate-400" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">
                        ประวัติการบันทึกข้อมูล
                    </h2>
                </div>
                <p className="text-slate-400 text-center py-8">
                    ยังไม่มีประวัติการบันทึกแบบสอบถาม
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-sky-100/50 border border-slate-100 overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-sky-50 rounded-xl">
                        <ClipboardList className="w-6 h-6 text-sky-600" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-bold text-slate-800">
                            ประวัติการบันทึกข้อมูล
                        </h2>
                        <p className="text-sm text-slate-500">
                            รายการล่าสุด {submissions.length} รายการ
                        </p>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
            </button>

            {/* Content */}
            {isExpanded && (
                <div className="border-t border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        รหัส
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        ผู้ให้ข้อมูล
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        พื้นที่
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        วันที่บันทึก
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {submissions.map((submission) => {
                                    const regionInfo = getRegionInfo(
                                        submission.region
                                    );
                                    const patientName =
                                        [
                                            submission.patient.firstName,
                                            submission.patient.lastName,
                                        ]
                                            .filter(Boolean)
                                            .join(" ") || "-";

                                    return (
                                        <tr
                                            key={submission.id}
                                            className="hover:bg-sky-50/30 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <code className="text-sm bg-slate-100 group-hover:bg-white border border-slate-200 group-hover:border-sky-200 px-2 py-1 rounded text-slate-600 font-mono transition-colors">
                                                    {maskSubmissionId(
                                                        submission.id
                                                    )}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1 rounded-full bg-slate-50 text-slate-400">
                                                        <User className="w-3 h-3" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700">
                                                        {patientName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${regionInfo.color}`}
                                                    />
                                                    <span className="text-sm text-slate-600">
                                                        {regionInfo.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    {formatDate(
                                                        submission.createdAt
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
