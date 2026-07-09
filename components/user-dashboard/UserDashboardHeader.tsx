export function UserDashboardHeader() {
    return (
        <header className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="max-w-3xl space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight thai-text leading-tight text-slate-950">
                        <span className="text-slate-900 block">
                            ยินดีต้อนรับสู่ระบบ
                        </span>
                        <span className="block proms-gradient-text">
                            แบบสอบถาม PROMs
                        </span>
                    </h1>

                    <p className="max-w-2xl text-base sm:text-lg text-slate-600 font-medium thai-text leading-relaxed">
                        เลือกเขตสุขภาพเพื่อเริ่มทำแบบสอบถาม
                        และตรวจประวัติการบันทึกล่าสุดของคุณ
                    </p>
                </div>
            </div>

            <div className="mt-8 h-px w-full bg-linear-to-r from-sky-200 via-blue-200 to-transparent" />
        </header>
    );
}
