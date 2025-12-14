"use client";

interface RadioGroupProps {
    name: string;
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    // For "other" option with text input
    hasOther?: boolean;
    otherValue?: string;
    onOtherChange?: (value: string) => void;
    otherTriggerValues?: string[]; // Which option values trigger the other input
    // Layout
    layout?: "horizontal" | "vertical" | "grid";
    gridCols?: number;
    // Styling
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
    const showOtherInput = hasOther && otherTriggerValues.includes(value);

    const containerClass =
        layout === "horizontal"
            ? "flex flex-wrap gap-4"
            : layout === "grid"
            ? `grid grid-cols-1 md:grid-cols-${gridCols} gap-2`
            : "flex flex-col gap-2";

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="font-semibold block text-slate-900">
                {label}
            </label>
            <div className={containerClass}>
                {options.map((opt) => (
                    <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name={name}
                            value={opt}
                            checked={value === opt}
                            onChange={(e) => onChange(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-slate-900">{opt}</span>
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
                                    className="border-b border-slate-300 focus:border-blue-500 outline-none ml-2 flex-1 text-slate-900 placeholder-slate-400"
                                />
                            )}
                    </label>
                ))}
            </div>
        </div>
    );
}
