import Image from "next/image";
import { Eye } from "lucide-react";
import { type StaffUser } from "@/lib/actions/users";
import {
    formatDate,
    getUserDisplayName,
    getUserInitial,
} from "@/lib/utils/usersUtils";

interface UserTableRowProps {
    user: StaffUser;
    onViewDetail: (user: StaffUser) => void;
    variant?: "row" | "card";
}

export function UserTableRow({
    user,
    onViewDetail,
    variant = "row",
}: UserTableRowProps) {
    const displayName = getUserDisplayName(user.firstName, user.lastName);
    const initial = getUserInitial(user.firstName, user.email);
    const avatar = user.imageUrl ? (
        <Image
            src={user.imageUrl}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
        />
    ) : (
        <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
            <span className="text-sky-700 font-semibold">{initial}</span>
        </div>
    );

    if (variant === "card") {
        return (
            <article className="space-y-4 p-5">
                <div className="flex min-w-0 items-start gap-3">
                    {avatar}
                    <div className="min-w-0 flex-1">
                        <h2 className="font-semibold text-slate-900 thai-text break-words">
                            {displayName}
                        </h2>
                        <p className="break-all text-sm text-slate-600">
                            {user.email || "-"}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <p className="text-slate-500 thai-text">จำนวนแบบสอบถาม</p>
                        <p className="font-bold text-slate-900">
                            {user.submissionCount} ชุด
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-500 thai-text">กรอกล่าสุด</p>
                        <p className="font-bold text-slate-900">
                            {formatDate(user.lastSubmission)}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onViewDetail(user)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl proms-primary-gradient px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                    type="button"
                >
                    <Eye size={18} aria-hidden="true" />
                    ดูรายละเอียด
                </button>
            </article>
        );
    }

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="py-4 px-6">
                <div className="flex min-w-0 items-center gap-3">
                    {avatar}
                    <span className="font-medium text-slate-800 thai-text break-words">
                        {displayName}
                    </span>
                </div>
            </td>
            <td className="py-4 px-6 text-slate-600 break-all">
                {user.email || "-"}
            </td>
            <td className="py-4 px-6 text-center">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        user.submissionCount > 0
                            ? "bg-linear-to-r from-sky-50 to-blue-50 text-sky-800 border border-sky-100"
                            : "bg-slate-100 text-slate-500"
                    }`}
                >
                    {user.submissionCount} ชุด
                </span>
            </td>
            <td className="py-4 px-6 text-center text-slate-600">
                {formatDate(user.lastSubmission)}
            </td>
            <td className="py-4 px-6 text-center">
                <button
                    onClick={() => onViewDetail(user)}
                    className="p-2 text-sky-700 hover:bg-sky-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                    title="ดูรายละเอียด"
                    type="button"
                    aria-label={`ดูรายละเอียด ${displayName}`}
                >
                    <Eye size={20} aria-hidden="true" />
                </button>
            </td>
        </tr>
    );
}
