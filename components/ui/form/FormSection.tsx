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
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-8 px-8">
                <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                {description && (
                    <p className="text-blue-100 text-lg">{description}</p>
                )}
            </div>
            <div className="p-8 space-y-8">{children}</div>
        </div>
    );
}
