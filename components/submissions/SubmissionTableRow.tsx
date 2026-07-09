import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { getRegionLabel } from "@/lib/constants/submissionsConstants";
import { type AdminSubmission } from "@/lib/types";
import { formatDateShort } from "@/lib/utils/formatDate";

interface SubmissionTableRowProps {
    submission: AdminSubmission;
    index: number;
    currentPage: number;
}

export function SubmissionTableRow({
    submission,
    index,
    currentPage,
}: SubmissionTableRowProps) {
    const isEven = index % 2 === 0;
    const patientName = submission.patient
        ? `${submission.patient.firstName || ""} ${
              submission.patient.lastName || ""
          }`.trim() || "-"
        : "-";

    return (
        <tr
            className={`group transition-colors duration-150 ${
                isEven
                    ? "bg-white hover:bg-sky-50/50"
                    : "bg-slate-50/30 hover:bg-sky-50/50"
            }`}
        >
            <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100/80 text-slate-500 text-xs font-medium group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                    {(currentPage - 1) * 10 + index + 1}
                </span>
            </td>

            <td className="px-6 py-4">
                <code className="inline-flex items-center text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-mono border border-slate-200 group-hover:border-sky-200 transition-colors">
                    {submission.id.slice(0, 8).toUpperCase()}
                </code>
            </td>

            <td className="px-6 py-4">
                <span className="text-slate-700 font-medium thai-text break-words">
                    {patientName}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className="text-slate-600 font-medium thai-text break-words">
                    {submission.interviewer || "-"}
                </span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-slate-100/80 rounded-md group-hover:bg-sky-100 transition-colors">
                        <Calendar
                            className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors"
                            aria-hidden="true"
                        />
                    </div>
                    <span className="font-medium">
                        {formatDateShort(submission.createdAt)}
                    </span>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-sky-50 to-blue-50 text-sky-800 border border-sky-100 thai-text">
                    {getRegionLabel(submission.region)}
                </span>
            </td>

            <td className="px-6 py-4 text-right">
                <Link
                    href={`/admin/submissions/${submission.id}/report`}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white proms-primary-gradient rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                >
                    <span>ดูรายงาน</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
            </td>
        </tr>
    );
}
