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
}

export function UserTableRow({ user, onViewDetail }: UserTableRowProps) {
    const displayName = getUserDisplayName(user.firstName, user.lastName);
    const initial = getUserInitial(user.firstName, user.email);

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    {user.imageUrl ? (
                        <Image
                            src={user.imageUrl}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                                {initial}
                            </span>
                        </div>
                    )}
                    <span className="font-medium text-slate-800">
                        {displayName}
                    </span>
                </div>
            </td>
            <td className="py-4 px-6 text-slate-600">{user.email || "-"}</td>
            <td className="py-4 px-6 text-center">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        user.submissionCount > 0
                            ? "bg-green-100 text-green-700"
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
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="ดูรายละเอียด"
                >
                    <Eye size={20} />
                </button>
            </td>
        </tr>
    );
}
