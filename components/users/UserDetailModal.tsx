import Image from "next/image";
import { X } from "lucide-react";
import { type StaffUser, type UserSubmission } from "@/lib/actions/users";
import {
    formatDate,
    getUserDisplayName,
    getUserInitial,
} from "@/lib/utils/usersUtils";
import { SubmissionsList } from "./SubmissionsList";

interface UserDetailModalProps {
    user: StaffUser;
    submissions: UserSubmission[];
    loadingSubmissions: boolean;
    onClose: () => void;
}

export function UserDetailModal({
    user,
    submissions,
    loadingSubmissions,
    onClose,
}: UserDetailModalProps) {
    const displayName = getUserDisplayName(user.firstName, user.lastName);
    const initial = getUserInitial(user.firstName);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            {user.imageUrl ? (
                                <Image
                                    src={user.imageUrl}
                                    alt=""
                                    width={56}
                                    height={56}
                                    className="rounded-full border-2 border-white/30"
                                />
                            ) : (
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold">
                                        {initial}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-bold">
                                    {displayName}
                                </h2>
                                <p className="text-blue-100">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="bg-white/20 px-4 py-2 rounded-lg">
                            <span className="text-blue-100 text-sm">
                                กรอกทั้งหมด
                            </span>
                            <p className="text-2xl font-bold">
                                {user.submissionCount} ชุด
                            </p>
                        </div>
                        <div className="bg-white/20 px-4 py-2 rounded-lg">
                            <span className="text-blue-100 text-sm">
                                กรอกล่าสุด
                            </span>
                            <p className="text-lg font-semibold">
                                {formatDate(user.lastSubmission)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[50vh]">
                    <h3 className="font-semibold text-slate-700 mb-4">
                        รายการ Submissions
                    </h3>
                    <SubmissionsList
                        submissions={submissions}
                        loading={loadingSubmissions}
                    />
                </div>
            </div>
        </div>
    );
}
