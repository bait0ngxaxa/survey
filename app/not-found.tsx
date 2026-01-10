"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 selection:bg-sky-100 selection:text-sky-900 font-sans overflow-hidden">
            {/* Multi-layered Abstract Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
                <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] bg-gradient-to-bl from-sky-200/30 via-blue-100/20 to-transparent rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-gradient-to-tr from-violet-100/30 via-indigo-50/20 to-transparent rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite]" />

                {/* Decorative Circles */}
                <div className="absolute top-[15%] left-[10%] w-32 h-32 border border-sky-200/30 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute bottom-[20%] right-[10%] w-24 h-24 border border-sky-200/30 rounded-full animate-[spin_35s_linear_infinite_reverse]" />

                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />
            </div>

            <main className="relative z-10 flex flex-col items-center justify-center grow px-6 py-10 text-center">
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 animate-in slide-in-from-bottom-5 fade-in duration-1000">
                    {/* 404 Number with Glow Effect */}
                    <div className="relative group">
                        {/* Outer glow */}
                        <div className="absolute inset-[-30%] bg-gradient-to-br from-sky-200/20 via-blue-100/10 to-cyan-200/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />

                        {/* 404 Text */}
                        <h1 className="relative text-[120px] md:text-[180px] lg:text-[220px] font-bold leading-none tracking-tighter">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-300 via-slate-400 to-slate-300 drop-shadow-sm">
                                4
                            </span>
                            <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-400 animate-[float_4s_ease-in-out_infinite]">
                                    0
                                </span>
                                {/* Glow behind the 0 */}
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 to-blue-400/20 blur-2xl rounded-full" />
                            </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-300 via-slate-400 to-slate-300 drop-shadow-sm">
                                4
                            </span>
                        </h1>
                    </div>

                    {/* Search Icon with Glassmorphism */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-blue-50/30 rounded-full blur-xl" />
                        <div className="relative w-20 h-20 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_rgba(14,165,233,0.1),0_4px_16px_rgba(0,0,0,0.05)] flex items-center justify-center">
                            <Search className="w-10 h-10 text-slate-400" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4 max-w-lg">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                            ไม่พบหน้าที่ต้องการ
                        </h2>
                        <p className="text-lg text-slate-500 leading-relaxed">
                            หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ
                            หรือไม่เคยมีอยู่ในระบบ
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full pt-4">
                        {/* Primary Button - Go Home */}
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center min-w-[200px] px-8 py-4 text-lg font-bold text-white transition-all duration-300 overflow-hidden rounded-full focus:outline-none focus:ring-4 focus:ring-sky-200/50"
                        >
                            {/* Button Background Layers */}
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 transition-opacity duration-300" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                            </div>

                            {/* Button Shadow */}
                            <div className="absolute inset-0 rounded-full shadow-[0_4px_20px_rgba(14,165,233,0.25),0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_30px_rgba(14,165,233,0.4),0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300" />

                            <span className="relative flex items-center group-hover:-translate-y-0.5 transition-transform duration-300">
                                <Home className="mr-2 w-5 h-5" />
                                กลับหน้าหลัก
                            </span>
                        </Link>

                        {/* Secondary Button - Go Back */}
                        <button
                            onClick={() => history.back()}
                            className="group relative inline-flex items-center justify-center min-w-[200px] px-8 py-4 text-lg font-semibold text-slate-600 transition-all duration-300 overflow-hidden rounded-full bg-white/70 backdrop-blur-md border border-slate-200/80 hover:border-sky-200 focus:outline-none focus:ring-4 focus:ring-sky-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(14,165,233,0.1)]"
                        >
                            <span className="relative flex items-center group-hover:-translate-y-0.5 transition-transform duration-300">
                                <ArrowLeft className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                ย้อนกลับ
                            </span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8">
                <div className="text-center">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()}{" "}
                        <span className="text-slate-500">
                            สถาบันพัฒนาระบบบริการสุขภาพองค์รวม
                        </span>
                    </p>
                </div>
            </footer>
        </div>
    );
}
