import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Sparkles } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50/30 selection:bg-sky-100 selection:text-sky-900 font-sans overflow-hidden">
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
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-linear-to-br from-sky-200/40 via-blue-100/30 to-transparent rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite]" />
                <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] bg-linear-to-bl from-cyan-200/30 via-sky-100/20 to-transparent rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-linear-to-tr from-blue-100/30 via-indigo-50/20 to-transparent rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite]" />

                {/* Decorative Circles */}
                <div className="absolute top-[15%] left-[10%] w-32 h-32 border border-sky-200/30 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute top-[15%] left-[10%] w-48 h-48 border border-sky-100/20 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
                <div className="absolute bottom-[20%] right-[10%] w-24 h-24 border border-blue-200/30 rounded-full animate-[spin_35s_linear_infinite_reverse]" />
                <div className="absolute bottom-[20%] right-[10%] w-40 h-40 border border-blue-100/20 rounded-full animate-[spin_50s_linear_infinite]" />

                {/* Floating Particles */}
                <div className="absolute top-[30%] left-[25%] w-2 h-2 bg-sky-400/40 rounded-full animate-[pulse_3s_ease-in-out_infinite]" />
                <div className="absolute top-[45%] right-[30%] w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
                <div className="absolute bottom-[35%] left-[40%] w-2.5 h-2.5 bg-cyan-400/35 rounded-full animate-[pulse_3.5s_ease-in-out_infinite_1s]" />

                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-linear-to-t from-white/80 via-transparent to-white/40" />
            </div>

            {/* Header Spacer */}
            <div className="h-2 md:h-4" />

            <main className="relative z-10 flex flex-col items-center justify-start grow px-6 pb-10 pt-2 md:pt-4 text-center">
                {/* Hero Section with Enhanced Depth */}
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
                    {/* Enhanced Logo with Multiple Glow Layers - Fade In Down */}
                    <div className="relative w-56 h-56 md:w-72 md:h-72 mb-4 group animate-fade-in-down">
                        {/* Outer glow ring */}
                        <div className="absolute inset-[-20%] bg-linear-to-br from-sky-200/20 via-blue-100/10 to-cyan-200/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />

                        {/* Middle glow */}
                        <div className="absolute inset-[-10%] bg-sky-100/40 blur-2xl rounded-full animate-[pulse_4s_ease-in-out_infinite_0.5s]" />

                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/80 to-sky-50/60 rounded-full blur-xl" />

                        {/* Logo container with glassmorphism */}
                        <div className="relative w-full h-full rounded-full bg-white/30 backdrop-blur-sm border border-white/50 shadow-[0_8px_32px_rgba(14,165,233,0.15),0_4px_16px_rgba(0,0,0,0.05)] animate-[float_6s_ease-in-out_infinite]">
                            <Image
                                src="/logo_h.png"
                                alt="HHI Logo"
                                fill
                                className="object-contain p-2 drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>

                    {/* Enhanced Badge with Glassmorphism - Fade In Left */}
                    <div className="relative group animate-fade-in-left">
                        <div className="absolute inset-0 bg-linear-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-sky-100/80 shadow-[0_4px_20px_rgba(14,165,233,0.1),0_2px_8px_rgba(0,0,0,0.04)] text-sky-700 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15),0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
                            <Sparkles className="w-4 h-4 text-sky-500 animate-[pulse_2s_ease-in-out_infinite]" />
                            <Award className="w-4 h-4 text-sky-500" />
                            Patient Reported Outcomes Measurement
                        </div>
                    </div>

                    {/* Text Content with Enhanced Typography - Title Fade In Right, Desc Fade In Up */}
                    <div className="space-y-6 max-w-3xl">
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] thai-text animate-fade-in-right">
                            <span className="relative inline-block text-slate-800">
                                การวิจัยและพัฒนา
                                {/* Subtle underline decoration */}
                                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-linear-to-r from-sky-200/50 via-blue-200/30 to-transparent rounded-full blur-sm" />
                            </span>
                            <span className="block mt-3 text-transparent bg-clip-text bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500 drop-shadow-sm animate-[shimmer_3s_ease-in-out_infinite]">
                                เครื่องมือ PROMs
                            </span>
                        </h1>

                        {/* Description Card with Depth - Fade In Up */}
                        <div className="relative group animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                            <div className="absolute inset-0 bg-linear-to-br from-sky-100/50 to-blue-50/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="relative text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] thai-text br-mobile-hide">
                                ระบบรวบรวมข้อมูลผลลัพธ์ที่รายงานโดยผู้ป่วย{" "}
                                <br />
                                <span className="text-sky-600/80 font-medium">
                                    (Patient Reported Outcomes Measurement)
                                </span>
                                <br />
                                เพื่อยกระดับการบริการและคุณภาพชีวิตสำหรับผู้ป่วยเบาหวาน
                            </p>
                        </div>
                    </div>

                    {/* Enhanced CTAs with Depth - Fade In Up with more delay */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full pt-4 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                        <SignedIn>
                            <Link
                                href="/dashboard"
                                className="group relative inline-flex items-center justify-center min-w-[220px] px-8 py-4 text-lg font-bold text-white transition-all duration-300 overflow-hidden rounded-full focus:outline-none focus:ring-4 focus:ring-sky-200/50"
                            >
                                {/* Button Background Layers */}
                                <div className="absolute inset-0 bg-linear-to-r from-sky-600 via-sky-500 to-blue-500" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500 transition-opacity duration-300" />

                                {/* Shine effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                                </div>

                                {/* Button Shadow */}
                                <div className="absolute inset-0 rounded-full shadow-[0_4px_20px_rgba(14,165,233,0.25),0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_30px_rgba(14,165,233,0.4),0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300" />

                                <span className="relative flex items-center group-hover:-translate-y-0.5 transition-transform duration-300">
                                    เริ่มทำแบบสอบถาม
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </SignedIn>

                        <SignedOut>
                            <SignInButton forceRedirectUrl="/dashboard?loggedIn=true">
                                <button className="group relative inline-flex items-center justify-center min-w-[220px] px-8 py-4 text-lg font-bold text-white transition-all duration-300 overflow-hidden rounded-full focus:outline-none focus:ring-4 focus:ring-sky-100/50">
                                    {/* Button Background Layers */}
                                    <div className="absolute inset-0 bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-cyan-500 via-sky-500 to-blue-500 transition-opacity duration-300" />

                                    {/* Animated border glow */}
                                    <div className="absolute inset-[-2px] bg-linear-to-r from-sky-400 via-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-300" />
                                    <div className="absolute inset-0 bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500 rounded-full" />

                                    {/* Shine effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-full">
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700" />
                                    </div>

                                    {/* Button Shadow */}
                                    <div className="absolute inset-0 rounded-full shadow-[0_4px_20px_rgba(59,130,246,0.3),0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.45),0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300" />

                                    <span className="relative flex items-center group-hover:-translate-y-0.5 transition-transform duration-300">
                                        เข้าสู่ระบบ
                                        <ArrowRight className="ml-2 w-5 h-5 opacity-90 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </main>

            {/* Enhanced Footer */}
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
