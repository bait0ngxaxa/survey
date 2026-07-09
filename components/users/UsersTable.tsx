import { type StaffUser } from "@/lib/actions/users";
import { UserTableRow } from "./UserTableRow";

interface UsersTableProps {
    users: StaffUser[];
    loading: boolean;
    onViewDetail: (user: StaffUser) => void;
}

export function UsersTable({ users, loading, onViewDetail }: UsersTableProps) {
    return (
        <div className="proms-panel rounded-2xl overflow-hidden">
            {loading ? (
                <LoadingState />
            ) : users.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full">
                            <thead className="proms-header-gradient border-b border-sky-100">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                                        ผู้ใช้
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                                        อีเมล
                                    </th>
                                    <th className="text-center py-4 px-6 font-semibold text-slate-700">
                                        จำนวนแบบสอบถาม
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
                    <div className="divide-y divide-slate-100 md:hidden">
                        {users.map((user) => (
                            <UserTableRow
                                key={user.id}
                                user={user}
                                onViewDetail={onViewDetail}
                                variant="card"
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function LoadingState() {
    return (
        <div className="p-8 text-center" role="status" aria-live="polite">
            <div className="animate-spin h-8 w-8 border-4 border-sky-700 border-t-transparent rounded-full mx-auto" />
            <p className="text-slate-600 mt-3 thai-text">กำลังโหลดรายชื่อ...</p>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="p-8 text-center">
            <h2 className="font-bold text-slate-900 thai-text">ไม่พบผู้ใช้</h2>
            <p className="mt-1 text-sm text-slate-600 thai-text">
                ลองปรับคำค้นหาใหม่อีกครั้ง
            </p>
        </div>
    );
}
