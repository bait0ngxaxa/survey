import Link from "next/link";
import { Calendar, ChevronRight, User } from "lucide-react";
import { getRegionLabel } from "@/lib/constants/submissionsConstants";

interface SubmissionCardProps {
    submission: {
        id: string;
        createdAt: Date;
        region: string;
        patient?: {
            firstName?: string | null;
            lastName?: string | null;
            nationalId?: string | null;
        } | null;
        interviewer?: string | null;
    };
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
    return (
        <Link
            href={`/admin/submissions/${submission.id}/report`}
            className="block bg-white p-5 rounded-xl shadow-sm border border-slate-200 active:scale-[0.99] transition-transform"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                        {submission.patient?.firstName}{" "}
                        {submission.patient?.lastName}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        HN: {submission.patient?.nationalId || "-"}
                    </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                    {getRegionLabel(submission.region)}
                </span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(submission.createdAt).toLocaleDateString("th-TH")}
                </div>
                <div className="flex items-center text-indigo-600 font-medium">
                    ดูรายละเอียด <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
    );
}
