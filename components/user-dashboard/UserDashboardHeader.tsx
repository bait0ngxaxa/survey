import { Activity } from "lucide-react";

export function UserDashboardHeader() {
    return (
        <div className="mb-16 text-center lg:text-left animate-in slide-in-from-bottom-5 fade-in duration-700">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="max-w-3xl space-y-6">
                    {/* Breadcrumb-style Status */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 border border-sky-100/50 text-sky-600 text-[10px] font-bold uppercase tracking-widest">
                        <Activity className="w-3 h-3 animate-pulse" />
                        System Active // Clinical Environment
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight thai-text leading-[1.1]">
                        <span className="text-slate-900 block">
                            ยินดีต้อนรับสู่ระบบ
                        </span>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-blue-600">
                            แบบสอบถาม PROMs
                        </span>
                    </h1>

                    <div className="relative pl-0 lg:pl-6">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500/20 rounded-full hidden lg:block" />
                        <p className="text-lg md:text-xl text-slate-500 font-medium thai-text">
                            เครื่องมือการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่
                            2
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="mt-10 h-px w-full bg-linear-to-r from-slate-200 via-slate-100 to-transparent" />
        </div>
    );
}
