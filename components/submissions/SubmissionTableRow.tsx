import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { getRegionLabel } from "@/lib/constants/submissionsConstants";

interface SubmissionTableRowProps {
    submission: {
        id: string;
        createdAt: Date;
        region: string;
    };
    index: number;
    currentPage: number;
}

export function SubmissionTableRow({
    submission,
    index,
    currentPage,
}: SubmissionTableRowProps) {
    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-center text-slate-400">
                {(currentPage - 1) * 10 + index + 1}
            </td>
            <td className="px-6 py-4 font-medium text-slate-900">
                <code className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-mono border border-slate-200">
                    {submission.id.slice(0, 8).toUpperCase()}
                </code>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {new Date(submission.createdAt).toLocaleDateString(
                        "th-TH",
                        {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                        }
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {getRegionLabel(submission.region)}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <Link
                    href={`/admin/submissions/${submission.id}/report`}
                    className="inline-flex items-center text-sky-600 hover:text-sky-900 font-medium text-sm transition-colors"
                >
                    <span>ดูรายงาน</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </td>
        </tr>
    );
}
