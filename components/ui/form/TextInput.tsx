"use client";

interface TextInputProps {
    type?: "text" | "number" | "date" | "textarea";
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    rows?: number; // for textarea
    inline?: boolean; // for inline layout
    suffix?: string; // e.g., "ปี", "เดือน"
    prefix?: string;
}

export default function TextInput({
    type = "text",
    label,
    value,
    onChange,
    placeholder = "",
    className = "",
    inputClassName = "",
    rows = 2,
    inline = false,
    suffix,
    prefix,
}: TextInputProps) {
    const baseInputClass =
        "border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 bg-white hover:border-sky-200";

    const inlineInputClass =
        "border border-slate-200 rounded-lg p-2 text-center text-slate-800 focus:ring-4 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all duration-300 bg-white hover:border-sky-200";

    const inputClass = inline
        ? `${inlineInputClass} w-24 ${inputClassName}`
        : `w-full ${baseInputClass} ${inputClassName}`;

    const renderInput = () => {
        if (type === "textarea") {
            return (
                <textarea
                    className={`w-full ${baseInputClass} ${inputClassName}`}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            );
        }

        return (
            <input
                type={type}
                className={inputClass}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        );
    };

    if (inline) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {prefix && <span className="text-slate-900">{prefix}</span>}
                {renderInput()}
                {suffix && <span className="text-slate-900">{suffix}</span>}
            </div>
        );
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="font-semibold block text-slate-900">
                    {label}
                </label>
            )}
            {renderInput()}
        </div>
    );
}
