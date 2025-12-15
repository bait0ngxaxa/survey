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
    name,
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
                            type="checkbox"
                            name={name}
                            checked={values.includes(opt)}
                            onChange={() => handleChange(opt)}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-slate-900">{opt}</span>
                        {hasOther &&
                            opt === otherTriggerValue &&
                            values.includes(opt) && (
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
