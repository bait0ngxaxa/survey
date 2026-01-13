import { StaffUser } from "@/lib/actions/users";
import { UserTableRow } from "./UserTableRow";

interface UsersTableProps {
    users: StaffUser[];
    loading: boolean;
    onViewDetail: (user: StaffUser) => void;
}

export function UsersTable({ users, loading, onViewDetail }: UsersTableProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {loading ? (
                <LoadingState />
            ) : users.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-sky-50/50 border-b border-sky-100">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-slate-700">
                                    ผู้ใช้
                                </th>
                                <th className="text-left py-4 px-6 font-semibold text-slate-700">
                                    อีเมล
                                </th>
                                <th className="text-center py-4 px-6 font-semibold text-slate-700">
                                    จำนวน Submission
                                </th>
                                <th className="text-center py-4 px-6 font-semibold text-slate-700">
                                    กรอกล่าสุด
                                </th>
                                <th className="text-center py-4 px-6 font-semibold text-slate-700">
                                    ดูรายละเอียด
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <UserTableRow
                                    key={user.id}
                                    user={user}
                                    onViewDetail={onViewDetail}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function LoadingState() {
    return (
        <div className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
            <p className="text-slate-500 mt-3">กำลังโหลด...</p>
        </div>
    );
}

function EmptyState() {
    return <div className="p-8 text-center text-slate-500">ไม่พบผู้ใช้</div>;
}
