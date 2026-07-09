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
    const safeTotalSteps = Math.max(totalSteps, 1);
    const safeCurrentStep = Math.min(Math.max(currentStep + 1, 1), safeTotalSteps);
    const progressPercent = (safeCurrentStep / safeTotalSteps) * 100;

    return (
        <div className="relative">
            <div className="relative proms-panel rounded-2xl p-5 sm:p-6 overflow-hidden">
                <div className="relative mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1 w-full md:mr-4">
                        <h2 className="text-xl font-bold text-sky-900 thai-text leading-snug whitespace-pre-line break-words">
                            {title}
                        </h2>
                        <div className="text-slate-700 mt-3 text-base sm:text-lg whitespace-pre-line proms-header-gradient p-4 rounded-xl border border-sky-100 thai-text leading-relaxed break-words">
                            {description}
                        </div>
                    </div>
                    <span className="self-end md:self-start text-sm font-semibold text-slate-700 whitespace-nowrap bg-white px-4 py-1.5 rounded-full border border-slate-200">
                        ขั้นตอนที่ {safeCurrentStep} / {safeTotalSteps}
                    </span>
                </div>

                <div
                    className="relative h-3 bg-slate-100 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progressPercent)}
                    aria-label="ความคืบหน้าของแบบสอบถาม"
                >
                    <div
                        className="h-full proms-primary-gradient transition-[width] duration-300 ease-out rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
