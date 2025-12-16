import { ReactNode } from "react";

interface FormSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export default function FormSection({
    title,
    description,
    children,
    className = "",
}: FormSectionProps) {
    return (
        <div
            className={`bg-white rounded-4xl shadow-xl shadow-sky-100/50 border border-slate-100 overflow-hidden ${className}`}
        >
            <div className="bg-white py-8 px-8 border-b border-slate-100">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    {title}
                </h1>
                {description && (
                    <p className="text-sky-600 text-lg font-medium bg-sky-50 inline-block px-4 py-1.5 rounded-full">
                        {description}
                    </p>
                )}
            </div>
            <div className="p-4 sm:p-10 space-y-8 sm:space-y-10">
                {children}
            </div>
        </div>
    );
}
