import { Users } from "lucide-react";
import Link from "next/link";

interface TotalOverviewCardProps {
    totalCount: number;
}

export function TotalOverviewCard({ totalCount }: TotalOverviewCardProps) {
    return (
        <Link
            href="/admin/submissions"
            className="proms-panel rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-6 relative overflow-hidden group transition-colors duration-200 hover:border-sky-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
        >
            <div className="relative z-10 min-w-0">
                <h2 className="text-lg font-semibold text-slate-700 thai-text break-words">
                    ภาพรวมผู้ตอบแบบสอบถามทั้งหมด
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-5xl font-extrabold text-slate-800">
                        {totalCount}
                    </p>
                    <p className="text-slate-500 font-medium">คน</p>
                </div>
            </div>
            <div className="relative z-10 shrink-0 p-4 proms-primary-gradient rounded-2xl transition-colors duration-200">
                <Users size={32} aria-hidden="true" />
            </div>
        </Link>
    );
}
