interface SurveyStepHeaderProps {
    title: string;
    description: string;
    currentStep: number;
    totalSteps: number;
}

export default function SurveyStepHeader({
    title,
    description,
    currentStep,
    totalSteps,
}: SurveyStepHeaderProps) {
    const progressPercent = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute inset-[-2px] bg-gradient-to-br from-sky-200/30 via-blue-200/20 to-cyan-200/30 rounded-[1.625rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-sky-100/50 border border-white/80 overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-sky-100/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-30%] left-[-10%] w-40 h-40 bg-blue-100/20 rounded-full blur-3xl" />

                <div className="relative flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div className="flex-1 w-full md:mr-4">
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 tracking-wide uppercase whitespace-pre-line block">
                            {title}
                        </span>
                        <div className="text-slate-600 mt-3 text-lg whitespace-pre-line bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-100/80 shadow-sm">
                            {description}
                        </div>
                    </div>
                    <span className="self-end md:self-start text-sm font-medium text-slate-500 whitespace-nowrap bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
                        ขั้นตอนที่ {currentStep + 1} / {totalSteps}
                    </span>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="relative h-3 bg-slate-100/80 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    />
                    {/* Shine effect on progress bar */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
            </div>
        </div>
    );
}
