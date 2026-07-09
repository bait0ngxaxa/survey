export default function DashboardLoading() {
    return (
        <main className="min-h-screen proms-page-bg px-4 py-10 sm:px-6 lg:px-8">
            <div
                className="mx-auto max-w-7xl space-y-10"
                role="status"
                aria-live="polite"
                aria-label="กำลังโหลดแดชบอร์ด"
            >
                <div className="space-y-4">
                    <div className="h-7 w-56 rounded-full bg-slate-200" />
                    <div className="h-12 w-full max-w-2xl rounded-2xl bg-slate-200" />
                    <div className="h-6 w-full max-w-xl rounded-xl bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-56 rounded-2xl proms-panel p-6"
                        >
                            <div className="mb-6 h-14 w-14 rounded-2xl bg-slate-200" />
                            <div className="mb-3 h-7 w-3/4 rounded-xl bg-slate-200" />
                            <div className="h-5 w-2/3 rounded-xl bg-slate-100" />
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl proms-panel p-6">
                    <div className="mb-6 h-8 w-64 rounded-xl bg-slate-200" />
                    <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-12 rounded-xl bg-slate-100"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
