import { type ReactNode } from "react";

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
            <div className="proms-panel rounded-2xl overflow-hidden">
                <div className="proms-header-gradient border-b border-sky-100 px-5 py-6 sm:px-8">
                    <h1 className="relative mb-3 text-2xl font-bold leading-snug text-sky-950 thai-text break-words sm:text-3xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="relative text-sky-800 text-base sm:text-lg font-medium thai-text leading-relaxed break-words">
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
