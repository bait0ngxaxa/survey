export default function SurveyLoading() {
    return (
        <main className="min-h-screen proms-page-bg px-4 py-10 sm:px-6 lg:px-8">
            <div
                className="mx-auto max-w-4xl space-y-8"
                role="status"
                aria-live="polite"
                aria-label="กำลังโหลดแบบสอบถาม"
            >
                <div className="rounded-2xl proms-panel p-6">
                    <div className="mb-4 h-8 w-3/4 rounded-xl bg-slate-200" />
                    <div className="h-5 w-full max-w-lg rounded-xl bg-slate-100" />
                </div>

                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl proms-panel p-6"
                    >
                        <div className="mb-5 h-6 w-5/6 rounded-xl bg-slate-200" />
                        <div className="h-12 rounded-full bg-slate-100" />
                    </div>
                ))}
            </div>
        </main>
    );
}
