import { MapPin, Calendar } from "lucide-react";
import { type UserSubmission } from "@/lib/actions/users";
import { formatDate } from "@/lib/utils/usersUtils";
import { getRegionLabel } from "@/lib/constants/submissionsConstants";

interface SubmissionsListProps {
    submissions: UserSubmission[];
    loading: boolean;
    errorMessage?: string | null;
}

export function SubmissionsList({
    submissions,
    loading,
    errorMessage,
}: SubmissionsListProps) {
    if (loading) {
        return (
            <div className="text-center py-8" role="status" aria-live="polite">
                <div className="animate-spin h-6 w-6 border-4 border-sky-700 border-t-transparent rounded-full mx-auto" />
                <p className="mt-3 text-sm text-slate-600 thai-text">
                    กำลังโหลดรายการแบบสอบถาม...
                </p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="font-semibold text-amber-950 thai-text">
                    ยังโหลดรายการแบบสอบถามไม่ได้
                </p>
                <p className="mt-1 text-sm text-amber-800 thai-text">
                    {errorMessage}
                </p>
            </div>
        );
    }

    if (submissions.length === 0) {
        return (
            <div className="text-center py-8 text-slate-600 thai-text">
                ยังไม่มีแบบสอบถาม
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {submissions.map((sub) => (
                <div
                    key={sub.id}
                    className="proms-panel-muted rounded-lg p-4"
                >
                    <div className="flex justify-between items-start">
                        <div className="min-w-0">
                            <p className="font-medium text-slate-800 thai-text break-words">
                                {sub.patientName}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                                <span className="font-mono text-xs bg-slate-200 px-2 py-0.5 rounded break-all">
                                    {sub.id.slice(0, 8)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} aria-hidden="true" />
                                    {getRegionLabel(sub.region)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} aria-hidden="true" />
                                    {formatDate(sub.createdAt, true)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
