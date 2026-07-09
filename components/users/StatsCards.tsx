import { User, Eye, Calendar } from "lucide-react";

interface StatsCardsProps {
    totalUsers: number;
    activeUsers: number;
    totalSubmissions: number;
}

export function StatsCards({
    totalUsers,
    activeUsers,
    totalSubmissions,
}: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                icon={<User size={24} />}
                iconBgColor="bg-sky-100"
                iconColor="text-sky-600"
                label="ผู้ใช้ทั้งหมด"
                value={totalUsers}
            />
            <StatCard
                icon={<Eye size={24} />}
                iconBgColor="bg-teal-100"
                iconColor="text-teal-600"
                label="ผู้ใช้ที่กรอกข้อมูล"
                value={activeUsers}
            />
            <StatCard
                icon={<Calendar size={24} />}
                iconBgColor="bg-indigo-100"
                iconColor="text-indigo-600"
                label="แบบสอบถามทั้งหมด"
                value={totalSubmissions}
            />
        </div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    iconBgColor: string;
    iconColor: string;
    label: string;
    value: number;
}

function StatCard({
    icon,
    iconBgColor,
    iconColor,
    label,
    value,
}: StatCardProps) {
    return (
        <div className="proms-panel rounded-2xl p-6">
            <div className="flex min-w-0 items-center gap-4">
                <div className={`p-4 ${iconBgColor} rounded-2xl ${iconColor}`}>
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="text-sm text-slate-600 font-medium thai-text break-words">
                        {label}
                    </p>
                    <p className="text-3xl font-bold text-slate-800">{value}</p>
                </div>
            </div>
        </div>
    );
}
