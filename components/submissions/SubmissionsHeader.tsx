export function SubmissionsHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight thai-text">
                    รายการแบบสอบถาม
                </h1>
                <p className="text-slate-600 text-sm mt-1 thai-text">
                    รายการแบบสอบถามและผลการประเมิน
                </p>
            </div>
        </div>
    );
}
