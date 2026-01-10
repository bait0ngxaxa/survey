import { ArrowRight, FileText, Info, Shield, Sparkles } from "lucide-react";

interface IntroductionProps {
    onStart: () => void;
}

export default function Introduction({ onStart }: IntroductionProps) {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            {/* Main Card with Glassmorphism */}
            <div className="relative group">
                {/* Outer Glow */}
                <div className="absolute inset-[-2px] bg-gradient-to-br from-sky-200/30 via-blue-200/20 to-cyan-200/30 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-white/90 backdrop-blur-sm rounded-4xl shadow-xl shadow-sky-100/50 border border-white/80 overflow-hidden">
                    {/* Header with Enhanced Styling */}
                    <div className="relative bg-gradient-to-b from-white to-slate-50/50 py-12 px-6 sm:px-12 border-b border-slate-100/80 text-center overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-[-50%] left-[-20%] w-80 h-80 bg-sky-100/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-[-50%] right-[-20%] w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />

                        {/* Icon with Glow Effect */}
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-[-8px] bg-sky-200/40 rounded-3xl blur-xl animate-pulse" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-50 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200/50 border border-sky-100/50">
                                <FileText className="w-8 h-8 text-sky-600" />
                            </div>
                        </div>

                        {/* Title with Gradient */}
                        <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                            <span className="text-slate-800">
                                การวิจัยเรื่อง
                            </span>
                            <br />
                            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500">
                                "การวิจัยและพัฒนาเครื่องมือรายงานโดยผู้ป่วย"
                            </span>
                        </h1>

                        <p className="text-slate-500 text-lg sm:text-xl font-medium mt-4">
                            (Patient Report Outcomes Measurement)
                        </p>

                        <p className="relative text-slate-600 mt-4 max-w-2xl mx-auto font-medium">
                            เพื่อใช้ในการพัฒนาระบบบริการแบบเน้นคุณค่าสำหรับผู้ป่วยเบาหวาน
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8 sm:p-12 space-y-8">
                        <div className="space-y-6 max-w-2xl mx-auto">
                            {/* Info Box with Enhanced Styling */}
                            <div className="group/info relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-100/50 to-blue-100/30 rounded-2xl blur-xl opacity-0 group-hover/info:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex gap-4 items-start p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-md" />
                                        <Info className="relative w-6 h-6 text-sky-600 shrink-0 mt-1" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-700 leading-relaxed font-medium">
                                            ข้อมูลที่ได้จากการศึกษาครั้งนี้จะเป็นประโยชน์ในการพัฒนาเครื่องมือสำหรับการ
                                            รายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่
                                            2
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Box with Enhanced Styling */}
                            <div className="group/privacy relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-200/50 to-cyan-200/30 rounded-2xl blur-xl opacity-0 group-hover/privacy:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-gradient-to-br from-sky-50 to-blue-50/50 p-6 rounded-2xl border border-sky-100/80 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                    <div className="flex justify-center mb-3">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-md" />
                                            <Shield className="relative w-6 h-6 text-sky-600" />
                                        </div>
                                    </div>
                                    <p className="text-sky-800 font-medium text-lg">
                                        ข้อมูลทั้งหมดจะปิดเป็นความลับ
                                        <br />
                                        และใช้เฉพาะสำหรับการวิจัยครั้งนี้เท่านั้น
                                    </p>
                                </div>
                            </div>

                            {/* Thank You Message */}
                            <div className="relative py-2">
                                <p className="text-slate-500 text-center leading-relaxed flex items-center justify-center gap-2">
                                    <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                                    <span>
                                        ผู้วิจัยขอขอบพระคุณ ทุกท่านเป็นอย่างสูง
                                        <br />
                                        ที่ท่านกรุณาสละเวลาร่วมตอบแบบสอบถามในครั้งนี้
                                    </span>
                                    <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                                </p>
                            </div>
                        </div>

                        {/* Enhanced CTA Button */}
                        <div className="pt-4 flex justify-center">
                            <button
                                onClick={onStart}
                                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-300 overflow-hidden rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-200/50"
                            >
                                {/* Button Background Layers */}
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 transition-opacity duration-300" />

                                {/* Shine effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700" />
                                </div>

                                {/* Button Shadow */}
                                <div className="absolute inset-0 rounded-2xl shadow-[0_4px_20px_rgba(14,165,233,0.3),0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_30px_rgba(14,165,233,0.45),0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300" />

                                <span className="relative flex items-center group-hover:-translate-y-0.5 transition-transform duration-300">
                                    เริ่มทำแบบสอบถาม
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
