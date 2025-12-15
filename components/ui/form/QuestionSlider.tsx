"use client";

interface QuestionSliderProps {
    id: number;
    text: string;
    value: number | undefined;
    onChange: (score: number) => void;
}

export default function QuestionSlider({
    id,
    text,
    value,
    onChange,
}: QuestionSliderProps) {
    const isAnswered = value !== undefined;
    const hasUnanswered = !isAnswered;

    return (
        <div
            className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                hasUnanswered
                    ? "bg-red-50 border border-red-200"
                    : "bg-white border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/10"
            }`}
        >
            <div className="flex flex-col gap-6 sm:gap-8">
                {/* Question Header */}
                <div className="flex gap-3 sm:gap-5 items-start">
                    <div className="flex-none pt-1">
                        <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-base sm:text-lg shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            {id}
                        </span>
                    </div>
                    <p className="text-gray-800 font-medium text-base sm:text-xl leading-relaxed">
                        {text}
                    </p>
                </div>

                {/* Slider */}
                <div className="px-2 sm:px-8 pb-4">
                    <div className="relative py-4">
                        <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-100 rounded-full -translate-y-1/2 shadow-inner"></div>

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
                                border: 4px solid #4f46e5;
                                cursor: pointer;
                                margin-top: -12px;
                                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
                                transition: transform 0.15s ease,
                                    box-shadow 0.15s ease;
                            }
                            input[type="range"]::-webkit-slider-thumb:hover {
                                transform: scale(1.1);
                                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                                    0 4px 6px -2px rgba(0, 0, 0, 0.05);
                            }
                            input[type="range"]::-webkit-slider-thumb:active {
                                transform: scale(0.95);
                                border-color: #3730a3;
                            }
                            input[type="range"]::-moz-range-thumb {
                                height: 32px;
                                width: 32px;
                                border-radius: 50%;
                                background: #ffffff;
                                border: 4px solid #4f46e5;
                                cursor: pointer;
                            }
                            input[type="range"]::-webkit-slider-runnable-track {
                                height: 8px;
                                background: transparent;
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
                            className="w-full relative z-20 cursor-pointer"
                        />

                        {/* Clickable Dots */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-[2px] z-10">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => onChange(num)}
                                    className={`w-5 h-5 rounded-full transition-all duration-200 border-2 hover:scale-125 hover:shadow-lg ${
                                        value === num
                                            ? "bg-indigo-600 border-indigo-600 scale-110 shadow-md"
                                            : value && value > num
                                            ? "bg-indigo-400 border-indigo-400"
                                            : "bg-white border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
                                    }`}
                                    aria-label={`เลือกคะแนน ${num}`}
                                />
                            ))}
                        </div>

                        {/* Progress indicator */}
                        <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 flex gap-1 pointer-events-none">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={`flex-1 h-full rounded-full transition-all duration-300 ${
                                        value && value > i
                                            ? "bg-indigo-400"
                                            : "bg-gray-200"
                                    } z-0`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Score Display */}
                    <div className="flex justify-between mt-6 text-sm font-medium">
                        <span className="text-gray-400">1 (น้อยที่สุด)</span>
                        <div
                            className={`flex flex-col items-center transition-all duration-300 ${
                                isAnswered
                                    ? "opacity-100 -translate-y-1"
                                    : "opacity-0"
                            }`}
                        >
                            <span className="text-3xl font-black text-indigo-600">
                                {value}
                            </span>
                            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                                คะแนนที่เลือก
                            </span>
                        </div>
                        <span className="text-gray-400">6 (มากที่สุด)</span>
                    </div>

                    {/* Quick Select Buttons */}
                    <div className="flex justify-between px-0.5 mt-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => onChange(num)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 cursor-pointer ${
                                    value === num
                                        ? "bg-indigo-100 text-indigo-700 font-bold shadow-inner ring-2 ring-indigo-500 ring-offset-2 scale-110"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 hover:scale-110 hover:shadow-md border border-transparent hover:border-gray-200"
                                }`}
                                aria-label={`Select score ${num}`}
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
