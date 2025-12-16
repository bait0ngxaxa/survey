"use client";

interface CheckboxGroupProps {
    name: string;
    label: string;
    values: string[];
    options: string[];
    onChange: (values: string[]) => void;
    // For "other" option with text input
    hasOther?: boolean;
    otherValue?: string;
    onOtherChange?: (value: string) => void;
    otherTriggerValue?: string;
    // Layout
    layout?: "vertical" | "grid";
    gridCols?: number;
    className?: string;
}

export default function CheckboxGroup({
    label,
    values,
    options,
    onChange,
    hasOther = false,
    otherValue = "",
    onOtherChange,
    otherTriggerValue = "อื่น ๆ",
    layout = "vertical",
    gridCols = 2,
    className = "",
}: CheckboxGroupProps) {
    const handleChange = (opt: string) => {
        if (values.includes(opt)) {
            onChange(values.filter((v) => v !== opt));
        } else {
            onChange([...values, opt]);
        }
    };

    const containerClass =
        layout === "grid"
            ? `grid grid-cols-1 md:grid-cols-${gridCols} gap-3`
            : "space-y-3";

    return (
        <div className={`space-y-3 ${className}`}>
            <label className="font-semibold block text-slate-800 text-lg">
                {label}
            </label>
            <div className={containerClass}>
                {options.map((opt) => {
                    const isSelected = values.includes(opt);
                    return (
                        <div
                            key={opt}
                            onClick={() => handleChange(opt)}
                            className={`
                                relative flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200
                                ${
                                    isSelected
                                        ? "bg-sky-50 border-sky-200 shadow-sm"
                                        : "bg-white border-slate-200 hover:border-sky-200 hover:bg-slate-50"
                                }
                            `}
                        >
                            <div
                                className={`
                                    w-5 h-5 rounded border flex items-center justify-center transition-colors
                                    ${
                                        isSelected
                                            ? "bg-sky-600 border-sky-600"
                                            : "border-slate-300 bg-white"
                                    }
                                `}
                            >
                                {isSelected && (
                                    <svg
                                        className="w-3.5 h-3.5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="text-slate-700 font-medium">
                                {opt}
                            </span>
                        </div>
                    );
                })}
            </div>
            {hasOther && values.includes(otherTriggerValue) && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                    <input
                        type="text"
                        placeholder="โปรดระบุรายละเอียดเพิ่มเติม"
                        value={otherValue}
                        onChange={(e) => onOtherChange?.(e.target.value)}
                        className="w-full border-b-2 border-slate-200 focus:border-sky-500 bg-transparent py-2 px-1 text-slate-900 placeholder-slate-400 outline-none transition-colors"
                    />
                </div>
            )}
        </div>
    );
}
