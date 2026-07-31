"use client";

interface RadioGroupProps {
    name: string;
    label: string;
    value: string;
    options: readonly string[];
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
            ? `grid grid-cols-1 md:grid-cols-${gridCols} gap-3`
            : "flex flex-col gap-2";

    return (
        <div className={`space-y-3 ${className}`}>
            <label className="font-semibold block text-slate-900 text-lg thai-text break-words">
                {label}
            </label>
            <div className={containerClass}>
                {options.map((opt) => (
                    <label
                        key={opt}
                        className={`flex min-w-0 items-start gap-3 cursor-pointer p-3 rounded-xl border transition-colors duration-200 ${
                            value === opt
                                ? "bg-sky-50 border-sky-300"
                                : "bg-white border-slate-200 hover:border-sky-200 hover:bg-slate-50"
                        }`}
                    >
                        <div className="relative flex items-center justify-center pt-0.5">
                            <input
                                type="radio"
                                name={name}
                                value={opt}
                                checked={value === opt}
                                onChange={(e) => onChange(e.target.value)}
                                className="peer h-5 w-5 appearance-none rounded-full border-2 border-slate-400 transition-colors checked:border-sky-600 checked:bg-sky-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                            />
                            <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span
                            className={`text-base thai-text break-words ${
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
                                    className="ml-0 min-w-0 flex-1 border-b-2 border-sky-200 bg-transparent py-1 text-slate-900 placeholder-slate-500 outline-none transition-colors focus:border-sky-600 focus-visible:ring-4 focus-visible:ring-sky-100 sm:ml-2 sm:min-w-40"
                                />
                            )}
                    </label>
                ))}
            </div>
        </div>
    );
}
