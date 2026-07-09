export default function Loading() {
    return (
        <div
            className="min-h-[400px] space-y-6"
            role="status"
            aria-live="polite"
            aria-label="กำลังโหลดข้อมูลผู้ดูแลระบบ"
        >
            <div className="space-y-3">
                <div className="h-9 w-56 rounded-xl bg-slate-200" />
                <div className="h-5 w-80 max-w-full rounded-xl bg-slate-100" />
            </div>
            <div className="h-36 rounded-2xl proms-panel p-6">
                <div className="h-10 w-40 rounded-xl bg-slate-200" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-32 rounded-2xl proms-panel p-6"
                    >
                        <div className="mb-4 h-8 w-8 rounded-xl bg-slate-200" />
                        <div className="h-6 w-2/3 rounded-xl bg-slate-100" />
                    </div>
                ))}
            </div>
        </div>
    );
}
