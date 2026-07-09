interface LoadingOverlayProps {
    message?: string;
}

export default function LoadingOverlay({
    message = "กำลังบันทึกข้อมูล...",
}: LoadingOverlayProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            role="status"
            aria-live="polite"
        >
            <div className="proms-panel p-6 rounded-2xl flex items-center gap-4 max-w-sm w-full">
                <div
                    className="h-8 w-8 shrink-0 animate-spin rounded-full border-2 border-sky-100 border-t-sky-700"
                    aria-hidden="true"
                />
                <span className="text-lg font-medium text-gray-800 thai-text break-words">
                    {message}
                </span>
            </div>
        </div>
    );
}
