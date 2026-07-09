"use client";

interface QuestionSliderProps {
    id: number;
    text: string;
    value: number | undefined;
    onChange: (score: number) => void;
    minLabel?: string;
    maxLabel?: string;
}

export default function QuestionSlider({
    id,
    text,
    value,
    onChange,
    minLabel = "1 (น้อยที่สุด)",
    maxLabel = "6 (มากที่สุด)",
}: QuestionSliderProps) {
    const isAnswered = value !== undefined;
    const hasUnanswered = !isAnswered;
    const questionLabelId = `question-${id}-label`;

    return (
        <div
            className={`group p-4 sm:p-6 rounded-2xl transition-colors duration-200 ${
                hasUnanswered
                    ? "bg-rose-50 border border-rose-200"
                    : "proms-panel-muted hover:border-sky-200"
            }`}
        >
            <div className="flex flex-col gap-6 sm:gap-8">
                {/* Question Header */}
                <div className="flex gap-3 sm:gap-5 items-start">
                    <div className="flex-none pt-1">
                        <span
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm transition-all duration-300 ${
                                hasUnanswered
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-sky-50 text-sky-700 group-hover:bg-linear-to-r group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white"
                            }`}
                        >
                            {id}
                        </span>
                    </div>
                    <p
                        id={questionLabelId}
                        className="min-w-0 text-slate-900 font-medium text-base sm:text-xl leading-relaxed thai-text break-words"
                    >
                        {text}
                    </p>
                </div>

                <div className="px-2 sm:px-8 pb-4">
                    <div className="relative py-4">
                        <div className="absolute top-1/2 left-0 right-0 h-3 bg-slate-100 rounded-full -translate-y-1/2 shadow-inner" />

                        <style jsx>{`
                            input[type="range"] {
                                -webkit-appearance: none;
                                width: 100%;
                                background: transparent;
                            }
                            input[type="range"]::-webkit-slider-thumb {
                                -webkit-appearance: none;
                                height: 32px;
                                width: 32px;
                                border-radius: 50%;
                                background: #ffffff;
                                border: 4px solid #0284c7; /* sky-600 */
                                cursor: pointer;
                                margin-top: -12px;
                                box-shadow:
                                    0 4px 6px -1px rgba(0, 0, 0, 0.1),
                                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
                                transition:
                                    transform 0.15s ease,
                                    box-shadow 0.15s ease;
                            }
                            input[type="range"]::-webkit-slider-thumb:hover {
                                transform: scale(1.1);
                                box-shadow:
                                    0 10px 15px -3px rgba(14, 165, 233, 0.2),
                                    0 4px 6px -2px rgba(14, 165, 233, 0.1);
                            }
                            input[type="range"]::-webkit-slider-thumb:active {
                                transform: scale(0.95);
                                border-color: #0369a1; /* sky-700 */
                            }
                            input[type="range"]::-moz-range-thumb {
                                height: 32px;
                                width: 32px;
                                border-radius: 50%;
                                background: #ffffff;
                                border: 4px solid #0284c7;
                                cursor: pointer;
                            }
                            input[type="range"]::-webkit-slider-runnable-track {
                                height: 8px;
                                background: transparent;
                            }
                            @media (prefers-reduced-motion: reduce) {
                                input[type="range"]::-webkit-slider-thumb,
                                input[type="range"]::-webkit-slider-thumb:hover,
                                input[type="range"]::-webkit-slider-thumb:active {
                                    transform: none;
                                }
                            }
                        `}</style>

                        <input
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            value={value || 1}
                            onChange={(e) => onChange(parseInt(e.target.value))}
                            onClick={(e) =>
                                onChange(parseInt(e.currentTarget.value))
                            }
                            onTouchEnd={(e) =>
                                onChange(parseInt(e.currentTarget.value))
                            }
                            className="w-full relative z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 rounded-full"
                            aria-labelledby={questionLabelId}
                            aria-valuemin={1}
                            aria-valuemax={6}
                            aria-valuenow={value ?? 1}
                            aria-valuetext={
                                isAnswered
                                    ? `เลือกคะแนน ${value}`
                                    : "ยังไม่ได้เลือกคะแนน"
                            }
                            aria-invalid={hasUnanswered}
                        />

                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-[2px] z-10">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => onChange(num)}
                                    className={`h-5 w-5 rounded-full border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${
                                        value === num
                                            ? "bg-linear-to-r from-sky-500 to-blue-600 border-sky-600 ring-2 ring-white"
                                            : value && value > num
                                              ? "bg-sky-300 border-sky-300"
                                              : "bg-white border-slate-300 hover:border-sky-400 hover:bg-sky-50"
                                    }`}
                                    aria-label={`เลือกคะแนน ${num}`}
                                />
                            ))}
                        </div>

                        <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 flex gap-1 pointer-events-none">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={`flex-1 h-full rounded-full transition-all duration-300 ${
                                        value && value > i
                                            ? "bg-sky-300"
                                            : "bg-slate-200/50"
                                    } z-0`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3 mt-6 text-sm font-medium">
                        <span className="text-slate-600 thai-text break-words">
                            {minLabel}
                        </span>
                        <div
                            className={`flex flex-col items-center transition-opacity duration-200 ${
                                isAnswered
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <span className="text-3xl font-black text-sky-600">
                                {value}
                            </span>
                            <span className="text-xs text-sky-700 font-semibold thai-text">
                                คะแนนที่เลือก
                            </span>
                        </div>
                        <span className="text-right text-slate-600 thai-text break-words">
                            {maxLabel}
                        </span>
                    </div>

                    <div className="flex justify-between px-0.5 mt-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => onChange(num)}
                                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 sm:h-10 sm:w-10 ${
                                    value === num
                                        ? "bg-linear-to-r from-sky-100 to-blue-100 text-sky-800 font-bold ring-2 ring-sky-500 ring-offset-2"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                                }`}
                                aria-label={`เลือกคะแนน ${num}`}
                                title={`เลือกคะแนน ${num}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
