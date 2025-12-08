import { ArrowRight } from "lucide-react";

interface IntroductionProps {
    onStart: () => void;
}

export default function Introduction({ onStart }: IntroductionProps) {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-linear-to-r from-blue-900 to-indigo-900 py-12 px-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-3xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                            การวิจัยเรื่อง
                            <br />
                            “การวิจัยและพัฒนาเครื่องมือรายงานโดยผู้ป่วย
                            <br />
                            <span className="text-blue-200 text-2xl md:text-3xl mt-2 block font-normal">
                                (Patient Report Outcomes Measurement)
                            </span>
                        </h1>
                        <p className="text-blue-100 text-xl font-medium">
                            เพื่อใช้ในการพัฒนาระบบบริการแบบเน้นคุณค่าสำหรับผู้ป่วยเบาหวาน
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-8 text-center">
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            ข้อมูลที่ได้จากการศึกษาครั้งนี้จะเป็นประโยชน์ในการพัฒนาเครื่องมือสำหรับการ
                            รายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                        </p>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <p className="text-blue-800 font-medium text-lg">
                                โดยข้อมูลทั้งหมดจะปิดเป็นความลับ
                                <br />
                                และใช้เฉพาะสำหรับการวิจัยครั้งนี้เท่านั้น
                            </p>
                        </div>

                        <p className="text-gray-600 text-lg">
                            ผู้วิจัยขอขอบพระคุณ ทุกท่านเป็นอย่างสูง
                            <br />
                            ที่ท่านกรุณาสละเวลาร่วมตอบแบบสอบถามในครั้งนี้
                        </p>
                    </div>

                    <div className="pt-8">
                        <button
                            onClick={onStart}
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
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
