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
    errorMessage?: string | null;
    onClose: () => void;
}

export function UserDetailModal({
    user,
    submissions,
    loadingSubmissions,
    errorMessage,
    onClose,
}: UserDetailModalProps) {
    const displayName = getUserDisplayName(user.firstName, user.lastName);
    const initial = getUserInitial(user.firstName);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="user-detail-title"
                className="proms-panel rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
            >
                <div className="proms-primary-gradient p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div className="flex min-w-0 items-center gap-4">
                            {user.imageUrl ? (
                                <Image
                                    src={user.imageUrl}
                                    alt=""
                                    width={56}
                                    height={56}
                                    className="rounded-full border-2 border-white/30"
                                />
                            ) : (
                                <div className="w-14 h-14 shrink-0 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold">
                                        {initial}
                                    </span>
                                </div>
                            )}
                            <div className="min-w-0">
                                <h2
                                    id="user-detail-title"
                                    className="text-xl font-bold thai-text break-words"
                                >
                                    {displayName}
                                </h2>
                                <p className="break-all text-sky-100">
                                    {user.email || "-"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                            type="button"
                            aria-label="ปิดรายละเอียดผู้ใช้"
                        >
                            <X size={24} aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
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

                <div className="p-6 overflow-y-auto max-h-[50vh]">
                    <h3 className="font-semibold text-slate-800 mb-4 thai-text">
                        รายการแบบสอบถาม
                    </h3>
                    <SubmissionsList
                        submissions={submissions}
                        loading={loadingSubmissions}
                        errorMessage={errorMessage}
                    />
                </div>
            </div>
        </div>
    );
}
