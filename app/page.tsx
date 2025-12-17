import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900 font-sans">
            {/* Abstract Background Elements - Lighter/Cleaner Blue Tones */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-linear-to-b from-sky-50/60 to-white rounded-full blur-3xl opacity-70" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            {/* Header Spacer (Navbar is absolute) - Reduced height */}
            <div className="h-10" />

            <main className="relative z-10 flex flex-col items-center justify-start grow px-6 pb-10 pt-4 md:pt-10 text-center">
                {/* Single Hero Section */}
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 animate-in slide-in-from-bottom-5 fade-in duration-1000">
                    {/* Logo */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64 mb-4 drop-shadow-xl">
                        <div className="absolute inset-0 bg-sky-100/50 blur-3xl rounded-full scale-110" />
                        <Image
                            src="/logo_h.png"
                            alt="HHI Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 shadow-sm text-sky-700 text-sm font-semibold tracking-wide uppercase">
                        <Award className="w-4 h-4 text-sky-500" />
                        Patient Reported Outcomes Measurement
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6 max-w-3xl">
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-800 leading-[1.1]">
                            การวิจัยและพัฒนา
                            <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500">
                                เครื่องมือ PROMs
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                            ระบบรวบรวมข้อมูลผลลัพธ์ที่รายงานโดยผู้ป่วย <br />
                            (Patient Reported Outcomes Measurement)
                            เพื่อยกระดับการบริการ <br />
                            และคุณภาพชีวิตสำหรับผู้ป่วยเบาหวาน
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full pt-4">
                        <SignedIn>
                            <Link
                                href="/dashboard"
                                className="group relative inline-flex items-center justify-center min-w-[200px] px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-sky-600 rounded-full hover:bg-sky-500 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-sky-200"
                            >
                                เริ่มทำแบบสอบถาม
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </SignedIn>

                        <SignedOut>
                            <SignInButton forceRedirectUrl="/dashboard?loggedIn=true">
                                <button className="group relative inline-flex items-center justify-center min-w-[200px] px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-linear-to-r from-sky-500 to-blue-500 rounded-full hover:shadow-xl hover:shadow-blue-400/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-sky-100">
                                    เข้าสู่ระบบ
                                    <ArrowRight className="ml-2 w-5 h-5 opacity-90 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-slate-400 text-sm relative z-10">
                <p>
                    © {new Date().getFullYear()}{" "}
                    สถาบันพัฒนาระบบบริการสุขภาพองค์รวม
                </p>
            </footer>
        </div>
    );
}
