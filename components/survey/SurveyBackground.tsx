export function SurveyBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Animated Floating Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-sky-200/40 via-blue-100/30 to-transparent rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite]" />
            <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] bg-gradient-to-bl from-cyan-200/30 via-sky-100/20 to-transparent rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]" />
            <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-gradient-to-tr from-blue-100/30 via-indigo-50/20 to-transparent rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite]" />

            {/* Decorative Circles */}
            <div className="absolute top-[15%] left-[5%] w-32 h-32 border border-sky-200/30 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute bottom-[20%] right-[5%] w-24 h-24 border border-blue-200/30 rounded-full animate-[spin_35s_linear_infinite_reverse]" />

            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />
        </div>
    );
}
