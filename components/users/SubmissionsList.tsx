import { MapPin, Calendar } from "lucide-react";
import { UserSubmission } from "@/lib/actions/users";
import { formatDate } from "@/lib/utils/usersUtils";
import { getRegionLabel } from "@/lib/constants/submissionsConstants";

interface SubmissionsListProps {
    submissions: UserSubmission[];
    loading: boolean;
}

export function SubmissionsList({
    submissions,
    loading,
}: SubmissionsListProps) {
    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
            </div>
        );
    }

    if (submissions.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500">
                ยังไม่มี submissions
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {submissions.map((sub) => (
                <div
                    key={sub.id}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-medium text-slate-800">
                                {sub.patientName}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                                <span className="font-mono text-xs bg-slate-200 px-2 py-0.5 rounded">
                                    {sub.id.slice(0, 8)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {getRegionLabel(sub.region)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
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
