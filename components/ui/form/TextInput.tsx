"use client";

import { useId } from "react";

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
    maxLength?: number;
    inputMode?: "text" | "numeric" | "decimal";
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
    maxLength,
    inputMode,
}: TextInputProps) {
    const generatedId = useId();
    const inputId = `text-input-${generatedId}`;
    const baseInputClass =
        "border border-slate-300 rounded-xl p-3 focus:ring-4 focus:ring-sky-100 focus:border-sky-600 outline-none transition-colors duration-200 text-slate-900 placeholder-slate-500 bg-white hover:border-sky-300 thai-text break-words";

    const inlineInputClass =
        "border border-slate-300 rounded-lg p-2 text-center text-slate-900 focus:ring-4 focus:ring-sky-100 focus:border-sky-600 outline-none transition-colors duration-200 bg-white hover:border-sky-300";

    const inputClass = inline
        ? `${inlineInputClass} w-24 ${inputClassName}`
        : `w-full ${baseInputClass} ${inputClassName}`;

    const renderInput = () => {
        if (type === "textarea") {
            return (
                <textarea
                    id={label ? inputId : undefined}
                    className={`w-full ${baseInputClass} ${inputClassName}`}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
            );
        }

        return (
            <input
                id={label ? inputId : undefined}
                type={type}
                className={inputClass}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                inputMode={inputMode}
            />
        );
    };

    if (inline) {
        return (
            <div className={`flex min-w-0 flex-wrap items-center gap-2 ${className}`}>
                {prefix && <span className="text-slate-900">{prefix}</span>}
                {renderInput()}
                {suffix && <span className="text-slate-900">{suffix}</span>}
            </div>
        );
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="font-semibold block text-slate-900 thai-text break-words"
                >
                    {label}
                </label>
            )}
            {renderInput()}
        </div>
    );
}
