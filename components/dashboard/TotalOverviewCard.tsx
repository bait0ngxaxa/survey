import { Users } from "lucide-react";

interface TotalOverviewCardProps {
    totalCount: number;
}

export function TotalOverviewCard({ totalCount }: TotalOverviewCardProps) {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-sky-100 flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
                <h2 className="text-lg font-semibold text-slate-600 uppercase tracking-wide">
                    ภาพรวมผู้ตอบแบบสอบถามทั้งหมด
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-5xl font-extrabold text-slate-800">
                        {totalCount}
                    </p>
                    <p className="text-slate-500 font-medium">คน</p>
                </div>
            </div>
            <div className="relative z-10 p-4 bg-sky-100 text-sky-600 rounded-2xl group-hover:bg-sky-200 transition-colors duration-300">
                <Users size={32} />
            </div>
        </div>
    );
}
