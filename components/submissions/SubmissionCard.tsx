import Link from "next/link";
import { Calendar, ChevronRight, User } from "lucide-react";
import { getRegionLabel } from "@/lib/constants/submissionsConstants";
import { type AdminSubmission } from "@/lib/types";
import { formatDate } from "@/lib/utils/formatDate";

interface SubmissionCardProps {
    submission: AdminSubmission;
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
    const patientName = submission.respondent || "-";

    return (
        <Link
            href={`/admin/submissions/${submission.id}/report`}
            className="block proms-panel p-5 rounded-2xl active:bg-sky-50 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
        >
            <div className="flex justify-between items-start gap-4 mb-4">
                <div className="min-w-0 space-y-1">
                    <h3 className="font-bold text-slate-900 text-base thai-text break-words">
                        {patientName}
                    </h3>
                    <div className="text-xs text-slate-600 flex items-center gap-1 break-all">
                        <User className="w-3 h-3 shrink-0" aria-hidden="true" />
                        HN: {submission.patient?.nationalId || "-"}
                    </div>
                </div>
                <span className="inline-flex shrink-0 items-center px-2 py-1 rounded-md text-xs font-semibold bg-linear-to-r from-sky-50 to-blue-50 text-sky-800 ring-1 ring-sky-100 thai-text">
                    {getRegionLabel(submission.region)}
                </span>
            </div>

            <div className="flex flex-col gap-3 text-sm text-slate-600 pt-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {formatDate(submission.createdAt)}
                </div>
                <div className="flex items-center text-sky-700 font-medium">
                    ดูรายงาน <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </div>
            </div>
        </Link>
    );
}
