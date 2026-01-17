interface LoadingOverlayProps {
    message?: string;
}

export default function LoadingOverlay({
    message = "กำลังบันทึกข้อมูล...",
}: LoadingOverlayProps) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                <span className="text-lg font-medium text-gray-700">
                    {message}
                </span>
            </div>
        </div>
    );
}
