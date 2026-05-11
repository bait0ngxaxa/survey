import { ArrowRight, Shield, Microscope, ClipboardList } from "lucide-react";

interface IntroductionProps {
    onStart: () => void;
}

export default function Introduction({ onStart }: IntroductionProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Main Container with Deep Shadow and Perimeter Glow */}
            <div className="relative bg-white rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),0_0_1px_1px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-slate-100 overflow-hidden group">
                {/* Background Atmosphere */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50/40 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50/40 rounded-full blur-[100px]" />

                {/* Internal Light Sweep */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />

                <div className="relative p-8 sm:p-14 sm:pt-20">
                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center space-y-8 mb-16">
                        {/* Science Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase">
                            <Microscope className="w-3.5 h-3.5" />
                            Clinical Research Protocol
                        </div>

                        {/* Title Group */}
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight thai-text">
                                การวิจัยและพัฒนา
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    เครื่องมือรายงานโดยผู้ป่วย
                                </span>
                            </h1>
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-indigo-600 font-bold text-lg tracking-wide uppercase">
                                    Patient Reported Outcomes
                                </p>
                                <div className="h-1 w-12 bg-emerald-400 rounded-full" />
                            </div>
                        </div>

                        <p className="max-w-2xl text-slate-500 text-lg leading-relaxed font-medium">
                            เพื่อใช้ในการพัฒนาระบบบริการแบบเน้นคุณค่า
                            (Value-Based Care)
                            <span className="block text-slate-400 text-base mt-1 italic">
                                สำหรับผู้ป่วยโรคเบาหวาน
                            </span>
                        </p>
                    </div>

                    {/* Features Grid - Enhanced Prominence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {/* Info Card - High Contrast */}
                        <div className="group/card relative">
                            {/* Decorative Glow Background */}
                            <div className="absolute inset-0 bg-blue-100/40 rounded-[2.5rem] blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                            <div className="relative h-full p-8 bg-white rounded-[2rem] border-2 border-slate-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group-hover/card:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)] group-hover/card:-translate-y-2 transition-all duration-500 overflow-hidden">
                                {/* Glassy Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-3xl group-hover/card:bg-blue-100/50 transition-colors duration-500" />

                                <div className="relative space-y-6">
                                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-500">
                                        <ClipboardList className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            วัตถุประสงค์การวิจัย
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-balance thai-text">
                                            ข้อมูลที่ได้จากการศึกษาครั้งนี้จะเป็นประโยชน์สูงสุดในการพัฒนา
                                            <span className="text-blue-600 font-bold">
                                                {" "}
                                                เครื่องมือสำหรับรายงานผลลัพธ์{" "}
                                            </span>
                                            เพื่อยกระดับการดูแลผู้ป่วยเบาหวาน
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Privacy Card - High Contrast */}
                        <div className="group/card relative">
                            {/* Decorative Glow Background */}
                            <div className="absolute inset-0 bg-emerald-100/40 rounded-[2.5rem] blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                            <div className="relative h-full p-8 bg-white rounded-[2rem] border-2 border-slate-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group-hover/card:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] group-hover/card:-translate-y-2 transition-all duration-500 overflow-hidden">
                                {/* Glassy Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16 blur-3xl group-hover/card:bg-emerald-100/50 transition-colors duration-500" />

                                <div className="relative space-y-6">
                                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-200 group-hover/card:scale-110 group-hover/card:-rotate-3 transition-all duration-500">
                                        <Shield className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            ความปลอดภัยข้อมูล
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-balance thai-text">
                                            ระบบการจัดเก็บข้อมูลได้รับ
                                            <span className="text-emerald-600 font-bold">
                                                {" "}
                                                การรักษาความปลอดภัยสูงสุด{" "}
                                            </span>
                                            ข้อมูลของท่านจะถูกเก็บเป็นความลับและประมวลผลตามจริยธรรมการวิจัย
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer & CTA */}
                    <div className="flex flex-col items-center space-y-10">
                        {/* Appreciation Message */}
                        <div className="relative">
                            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200" />
                            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200" />
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                ขอบพระคุณทุกท่านที่สละเวลาร่วมตอบแบบสอบถาม
                            </p>
                        </div>

                        {/* Premium Button */}
                        <button
                            onClick={onStart}
                            className="group relative px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_15px_30px_-5px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.4)]"
                        >
                            <span className="relative z-10 flex items-center gap-3 tracking-wide">
                                เริ่มต้นทำแบบสอบถาม
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </span>

                            {/* Button Shine Effect */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>

                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        </button>

                        {/* Trust Labels */}
                        <div className="flex items-center gap-6 pt-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Verified Protocol
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Secure Encryption
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
