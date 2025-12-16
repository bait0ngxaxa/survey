"use client";

interface RadioGroupProps {
    name: string;
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;

    hasOther?: boolean;
    otherValue?: string;
    onOtherChange?: (value: string) => void;
    otherTriggerValues?: string[];

    layout?: "horizontal" | "vertical" | "grid";
    gridCols?: number;

    className?: string;
}

export default function RadioGroup({
    name,
    label,
    value,
    options,
    onChange,
    hasOther = false,
    otherValue = "",
    onOtherChange,
    otherTriggerValues = ["อื่น ๆ"],
    layout = "vertical",
    gridCols = 2,
    className = "",
}: RadioGroupProps) {
    const containerClass =
        layout === "horizontal"
            ? "flex flex-wrap gap-4"
            : layout === "grid"
            ? `grid grid-cols-1 md:grid-cols-${gridCols} gap-2`
            : "flex flex-col gap-2";

    return (
        <div className={`space-y-3 ${className}`}>
            <label className="font-semibold block text-slate-800 text-lg">
                {label}
            </label>
            <div className={containerClass}>
                {options.map((opt) => (
                    <label
                        key={opt}
                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-200 ${
                            value === opt
                                ? "bg-sky-50 border-sky-200 shadow-sm"
                                : "bg-white border-slate-200 hover:border-sky-200 hover:bg-slate-50"
                        }`}
                    >
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                name={name}
                                value={opt}
                                checked={value === opt}
                                onChange={(e) => onChange(e.target.value)}
                                className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                            />
                            <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span
                            className={`text-base ${
                                value === opt
                                    ? "text-sky-900 font-medium"
                                    : "text-slate-700"
                            }`}
                        >
                            {opt}
                        </span>
                        {hasOther &&
                            otherTriggerValues.includes(opt) &&
                            value === opt && (
                                <input
                                    type="text"
                                    placeholder="โปรดระบุ"
                                    value={otherValue}
                                    onChange={(e) =>
                                        onOtherChange?.(e.target.value)
                                    }
                                    className="border-b-2 border-sky-200 focus:border-sky-500 outline-none ml-2 flex-1 text-slate-900 placeholder-slate-400 bg-transparent py-1 transition-colors"
                                />
                            )}
                    </label>
                ))}
            </div>
        </div>
    );
}
