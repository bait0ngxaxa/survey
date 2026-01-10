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
        <div className={`relative ${className}`}>
            <div className="bg-white rounded-4xl shadow-xl shadow-sky-100/50 border border-slate-100/80 overflow-hidden transition-shadow duration-200 hover:shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-b from-white to-slate-50/30 py-8 px-8 border-b border-slate-100/80">
                    <h1 className="relative text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                        {title}
                    </h1>
                    {description && (
                        <p className="relative text-sky-600 text-lg font-medium bg-gradient-to-r from-sky-50 to-blue-50/50 inline-block px-5 py-2 rounded-full border border-sky-100/80 shadow-sm">
                            {description}
                        </p>
                    )}
                </div>
                <div className="p-4 sm:p-10 space-y-8 sm:space-y-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
