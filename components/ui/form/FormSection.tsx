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
            className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}
        >
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-6 px-4 sm:py-8 sm:px-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {title}
                </h1>
                {description && (
                    <p className="text-blue-100 text-base sm:text-lg">
                        {description}
                    </p>
                )}
            </div>
            <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">{children}</div>
        </div>
    );
}
