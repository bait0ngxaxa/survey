import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { getRegionLabel } from "@/lib/constants/submissionsConstants";

interface SubmissionTableRowProps {
    submission: {
        id: string;
        createdAt: Date;
        region: string;
        patient: {
            firstName: string | null;
            lastName: string | null;
        } | null;
        interviewer?: string | null;
    };
    index: number;
    currentPage: number;
}

export function SubmissionTableRow({
    submission,
    index,
    currentPage,
}: SubmissionTableRowProps) {
    const isEven = index % 2 === 0;

    return (
        <tr
            className={`group transition-colors duration-150 ${
                isEven
                    ? "bg-white hover:bg-sky-50/50"
                    : "bg-slate-50/30 hover:bg-sky-50/50"
            }`}
        >
            {/* Row number with subtle styling */}
            <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100/80 text-slate-500 text-xs font-medium group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                    {(currentPage - 1) * 10 + index + 1}
                </span>
            </td>

            {/* ID with enhanced code styling */}
            <td className="px-6 py-4">
                <code className="inline-flex items-center text-xs bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 px-3 py-1.5 rounded-lg font-mono border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] group-hover:border-sky-200 group-hover:from-sky-50 group-hover:to-white transition-all">
                    {submission.id.slice(0, 8).toUpperCase()}
                </code>
            </td>

            {/* Patient Name */}
            <td className="px-6 py-4">
                <span className="text-slate-700 font-medium">
                    {submission.patient
                        ? `${submission.patient.firstName || ""} ${
                              submission.patient.lastName || ""
                          }`.trim() || "-"
                        : "-"}
                </span>
            </td>

            {/* Interviewer Name */}
            <td className="px-6 py-4">
                <span className="text-slate-500 font-medium">
                    {submission.interviewer || "-"}
                </span>
            </td>

            {/* Date with icon */}
            <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-slate-100/80 rounded-md group-hover:bg-sky-100 transition-colors">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <span className="font-medium">
                        {new Date(submission.createdAt).toLocaleDateString(
                            "th-TH",
                            {
                                day: "numeric",
                                month: "short",
                                year: "2-digit",
                            },
                        )}
                    </span>
                </div>
            </td>

            {/* Region badge with depth */}
            <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border border-blue-100/80 shadow-[0_1px_2px_rgba(59,130,246,0.08)]">
                    {getRegionLabel(submission.region)}
                </span>
            </td>

            {/* Action button with enhanced styling */}
            <td className="px-6 py-4 text-right">
                <Link
                    href={`/admin/submissions/${submission.id}/report`}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-sky-600 bg-sky-50/50 rounded-lg border border-sky-100/80 hover:bg-sky-100 hover:text-sky-700 hover:border-sky-200 hover:shadow-[0_2px_8px_rgba(14,165,233,0.15)] transition-all duration-200"
                >
                    <span>ดูรายงาน</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </td>
        </tr>
    );
}
