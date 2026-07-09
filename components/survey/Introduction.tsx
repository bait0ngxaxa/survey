import { ArrowRight, Shield, Microscope, ClipboardList } from "lucide-react";

interface IntroductionProps {
    onStart: () => void;
}

export default function Introduction({ onStart }: IntroductionProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="relative proms-panel rounded-2xl overflow-hidden">
                <div className="relative p-6 sm:p-10">
                    <div className="flex flex-col items-center text-center space-y-7 mb-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
                            <Microscope className="w-4 h-4" aria-hidden="true" />
                            แบบสอบถามเพื่อการวิจัยและพัฒนาบริการ
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight tracking-tight thai-text break-words">
                                การวิจัยและพัฒนา
                                <span className="block text-sky-900">
                                    เครื่องมือรายงานโดยผู้ป่วย
                                </span>
                            </h1>
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-sky-700 font-bold text-base sm:text-lg">
                                    Patient Reported Outcomes
                                </p>
                                <div className="h-1 w-12 proms-primary-gradient rounded-full" />
                            </div>
                        </div>

                        <p className="max-w-2xl text-slate-700 text-base sm:text-lg leading-relaxed font-medium thai-text break-words">
                            เพื่อใช้ในการพัฒนาระบบบริการแบบเน้นคุณค่า
                            (Value-Based Care)
                            <span className="block text-slate-600 text-base mt-1">
                                สำหรับผู้ป่วยโรคเบาหวาน
                            </span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                        <div className="h-full rounded-2xl proms-panel-muted p-6">
                            <div className="space-y-5">
                                <div className="inline-flex p-3 rounded-2xl proms-primary-gradient">
                                    <ClipboardList
                                        className="w-7 h-7"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold text-slate-950 thai-text">
                                        วัตถุประสงค์การวิจัย
                                    </h2>
                                    <p className="text-slate-700 leading-relaxed thai-text break-words">
                                        ข้อมูลที่ได้จากการศึกษาครั้งนี้จะใช้พัฒนาเครื่องมือสำหรับรายงานผลลัพธ์
                                        เพื่อยกระดับการดูแลผู้ป่วยเบาหวาน
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-full rounded-2xl proms-panel-muted p-6">
                            <div className="space-y-5">
                                <div className="inline-flex p-3 rounded-2xl proms-success-gradient">
                                    <Shield
                                        className="w-7 h-7"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold text-slate-950 thai-text">
                                        ความปลอดภัยข้อมูล
                                    </h2>
                                    <p className="text-slate-700 leading-relaxed thai-text break-words">
                                        ข้อมูลของท่านจะถูกเก็บเป็นความลับและประมวลผลตามจริยธรรมการวิจัย
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-8">
                        <div className="rounded-full bg-sky-50 px-4 py-2 ring-1 ring-sky-100">
                            <p className="text-slate-600 text-sm font-medium thai-text">
                                ขอบพระคุณทุกท่านที่สละเวลาร่วมตอบแบบสอบถาม
                            </p>
                        </div>

                        <button
                            onClick={onStart}
                            className="min-h-12 w-full px-8 py-4 proms-primary-gradient font-bold rounded-2xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 sm:w-auto sm:px-12"
                            type="button"
                        >
                            <span className="flex items-center justify-center gap-3 thai-text">
                                เริ่มต้นทำแบบสอบถาม
                                <ArrowRight
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
