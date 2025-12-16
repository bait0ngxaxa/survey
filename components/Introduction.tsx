import { ArrowRight, FileText, Info } from "lucide-react";

interface IntroductionProps {
    onStart: () => void;
}

export default function Introduction({ onStart }: IntroductionProps) {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white rounded-4xl shadow-xl shadow-sky-100/50 border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="bg-white py-12 px-6 sm:px-12 border-b border-slate-100 text-center">
                    <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8 text-sky-600" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                        การวิจัยเรื่อง
                        <br />
                        <span className="text-sky-600 block mt-2">
                            “การวิจัยและพัฒนาเครื่องมือรายงานโดยผู้ป่วย”
                        </span>
                    </h1>
                    <p className="text-slate-500 text-lg sm:text-xl font-medium mt-4">
                        (Patient Report Outcomes Measurement)
                    </p>
                    <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                        เพื่อใช้ในการพัฒนาระบบบริการแบบเน้นคุณค่าสำหรับผู้ป่วยเบาหวาน
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12 space-y-8">
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <Info className="w-6 h-6 text-sky-600 shrink-0 mt-1" />
                            <div className="space-y-2">
                                <p className="text-slate-700 leading-relaxed font-medium">
                                    ข้อมูลที่ได้จากการศึกษาครั้งนี้จะเป็นประโยชน์ในการพัฒนาเครื่องมือสำหรับการ
                                    รายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                                </p>
                            </div>
                        </div>

                        <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 text-center">
                            <p className="text-sky-800 font-medium text-lg">
                                ข้อมูลทั้งหมดจะปิดเป็นความลับ
                                <br />
                                และใช้เฉพาะสำหรับการวิจัยครั้งนี้เท่านั้น
                            </p>
                        </div>

                        <p className="text-slate-500 text-center leading-relaxed">
                            ผู้วิจัยขอขอบพระคุณ ทุกท่านเป็นอย่างสูง
                            <br />
                            ที่ท่านกรุณาสละเวลาร่วมตอบแบบสอบถามในครั้งนี้
                        </p>
                    </div>

                    <div className="pt-4 flex justify-center">
                        <button
                            onClick={onStart}
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-sky-600 rounded-2xl hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-200/50 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span>เริ่มทำแบบสอบถาม</span>
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
