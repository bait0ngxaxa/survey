export function BackgroundEffects() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Precision Grid Layer */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(to right, #0ea5e9 0.5px, transparent 0.5px), linear-gradient(to bottom, #0ea5e9 0.5px, transparent 0.5px)`,
                    backgroundSize: "40px 40px, 200px 200px, 200px 200px",
                }}
            />

            {/* Structured Lighting */}
            <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-sky-100/20 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[500px] bg-blue-50/30 rounded-full blur-[100px] translate-y-1/2" />

            {/* Technical Detail: Minimalist SVG Line */}
            <svg className="absolute top-0 right-0 w-full h-full opacity-[0.015] text-sky-500" viewBox="0 0 1000 1000" fill="none">
                <path d="M0 200L1000 200M0 500L1000 500M0 800L1000 800" stroke="currentColor" strokeWidth="0.5" />
                <path d="M200 0L200 1000M500 0L500 1000M800 0L800 1000" stroke="currentColor" strokeWidth="0.5" />
            </svg>
        </div>
    );
}
