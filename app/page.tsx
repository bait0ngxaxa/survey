import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Microscope } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen proms-page-bg selection:bg-sky-100 selection:text-sky-900 font-sans overflow-hidden">
            {/* --- Advanced Technical Background --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Precision Grid Layer */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(to right, #0ea5e9 0.5px, transparent 0.5px), linear-gradient(to bottom, #0ea5e9 0.5px, transparent 0.5px)`,
                        backgroundSize: "40px 40px, 200px 200px, 200px 200px",
                    }}
                />

                {/* Abstract Data Waveforms */}
                <svg
                    className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] text-sky-500"
                    viewBox="0 0 400 800"
                    fill="none"
                >
                    <path
                        d="M400 0C350 100 450 200 400 300C350 400 450 500 400 600C350 700 450 800 400 900"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                    <path
                        d="M450 0C400 100 500 200 450 300C400 400 500 500 450 600C400 700 500 800 450 900"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                    <circle
                        cx="380"
                        cy="150"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="0.5"
                    />
                    <circle
                        cx="420"
                        cy="450"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="0.5"
                    />
                </svg>

                {/* Light Diffusion Orbs (Subtle) */}
                <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-sky-100/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px]" />
            </div>

            {/* --- Main Interface --- */}
            <main className="relative z-10 flex flex-col items-center justify-center grow px-6 pt-12 pb-20">
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Branding & Visuals */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-8 animate-fade-in-left">
                        {/* The "Microscope" Logo Container */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-sky-400/10 rounded-3xl blur-2xl group-hover:bg-sky-400/20 transition-all duration-700" />
                            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-transform duration-500 hover:scale-[1.02]">
                                <div className="absolute inset-4 border border-slate-100 rounded-[2rem] pointer-events-none" />
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src="/logo_h.png"
                                        alt="RHHSDI Logo"
                                        fill
                                        className="object-contain p-4 drop-shadow-md"
                                        priority
                                    />
                                </div>
                                {/* Corner Accents */}
                                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-sky-500/30 rounded-tl-lg" />
                                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-sky-500/30 rounded-br-lg" />
                            </div>
                        </div>

                        {/* Research Focus Statement */}
                        <div className="relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500 rounded-full" />
                            <div className="pl-5 py-1">
                                <span className="block text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                                    Affiliated Research
                                </span>
                                <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-xs thai-text">
                                    มุ่งเน้นการวิจัยเชิงลึกเพื่อพัฒนาระบบบริการสุขภาพ{" "}
                                    <br />
                                    สู่ความเป็นเลิศ
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Content */}
                    <div className="lg:col-span-7 flex flex-col space-y-10 text-center lg:text-left animate-fade-in-right">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-sm font-bold tracking-tight uppercase">
                                <Microscope className="w-4 h-4" />
                                Patient Reported Outcomes
                            </div>
                            <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] thai-text">
                                <span className="block">การวิจัยและพัฒนา</span>
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-blue-600">
                                    เครื่องมือ PROMs
                                </span>
                            </h1>
                        </div>

                        <div className="relative pl-0 lg:pl-8">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-sky-500 to-transparent rounded-full hidden lg:block" />
                            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl thai-text">
                                ระบบรวบรวมข้อมูลผลลัพธ์ที่รายงานโดยผู้ป่วย
                                เพื่อยกระดับการบริการและคุณภาพชีวิตสำหรับผู้ป่วยเบาหวาน
                                <span className="block mt-2 text-sky-600/80 font-semibold italic text-base">
                                    (Integrated Health Care System Development)
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 items-center lg:items-start">
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="group relative inline-flex items-center justify-center min-w-[240px] px-8 py-4.5 proms-primary-gradient text-lg font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:-translate-y-1"
                                >
                                    <span className="relative z-10 flex items-center">
                                        เริ่มทำแบบสอบถาม
                                        <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                    </span>
                                    <div className="absolute inset-0 bg-linear-to-r from-sky-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                            </SignedIn>

                            <SignedOut>
                                <SignInButton forceRedirectUrl="/dashboard?loggedIn=true">
                                    <button className="group relative inline-flex items-center justify-center min-w-[240px] px-8 py-4.5 bg-white text-sky-800 text-lg font-bold rounded-2xl border-2 border-sky-200 overflow-hidden transition-all duration-300 hover:border-sky-500 hover:text-sky-700 hover:shadow-xl hover:-translate-y-1">
                                        <span className="relative z-10 flex items-center">
                                            เข้าสู่ระบบใช้งาน
                                            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                        </span>
                                        <div className="absolute inset-0 bg-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </button>
                                </SignInButton>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- Technical Footer --- */}
            <footer className="relative z-10 border-t border-slate-200 bg-white/50 backdrop-blur-md py-8">
                <div className="max-w-6xl mx-auto px-6 flex justify-center items-center">
                    <span className="text-slate-500 text-sm font-semibold thai-text">
                        สถาบันพัฒนาระบบบริการสุขภาพองค์รวม
                    </span>
                </div>
            </footer>
        </div>
    );
}
