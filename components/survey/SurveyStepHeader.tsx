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
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-sky-100/50 border border-slate-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div className="flex-1 w-full md:mr-4">
                    <span className="text-xl font-bold text-sky-600 tracking-wide uppercase whitespace-pre-line block">
                        {title}
                    </span>
                    <div className="text-slate-600 mt-3 text-lg whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {description}
                    </div>
                </div>
                <span className="self-end md:self-start text-sm font-medium text-slate-500 whitespace-nowrap bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    ขั้นตอนที่ {currentStep + 1} / {totalSteps}
                </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-sky-500 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}
