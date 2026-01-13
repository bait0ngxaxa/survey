import { Sparkles } from "lucide-react";

export function UserDashboardHeader() {
    return (
        <div className="mb-12 text-center max-w-4xl mx-auto animate-in slide-in-from-bottom-5 fade-in duration-700">
            {/* Enhanced Title with Glow */}
            <div className="relative inline-block mb-6">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    <span className="relative text-slate-800">
                        ยินดีต้อนรับสู่ระบบ
                        <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-sky-200/50 via-blue-200/30 to-transparent rounded-full blur-sm" />
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500">
                        แบบสอบถาม PROMs
                    </span>
                    <span className="block text-xl md:text-3xl font-semibold text-sky-600 mt-3">
                        เครื่องมือการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                    </span>
                </h1>
            </div>

            {/* Glassmorphism Instruction Card */}
            <div className="relative group inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="relative text-lg text-slate-500 bg-white/70 backdrop-blur-md py-3 px-8 rounded-full border border-sky-100/80 shadow-[0_4px_20px_rgba(14,165,233,0.1),0_2px_8px_rgba(0,0,0,0.04)] inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15),0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
                    <Sparkles className="w-5 h-5 text-sky-500 animate-pulse" />
                    กรุณาเลือกพื้นที่ของท่านเพื่อเริ่มทำแบบสอบถาม
                </p>
            </div>
        </div>
    );
}
