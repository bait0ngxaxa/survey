import { Suspense } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/40 blur-3xl animate-pulse delay-1000" />
                <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-slate-200/40 blur-3xl" />
            </div>

            <Suspense fallback={null}>
                <SuccessModal />
            </Suspense>

            {/* Hero Section */}
            <main className="grow flex flex-col items-center justify-center p-6 text-center relative z-10">
                <div className="max-w-4xl w-full bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-8 md:p-16 border border-white/60 animate-in fade-in zoom-in-95 duration-700">
                    <div className="mb-10 flex justify-center">
                        <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl shadow-inner border border-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="56"
                                height="56"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600 drop-shadow-sm"
                            >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <path d="M16 13H8" />
                                <path d="M16 17H8" />
                                <path d="M10 9H8" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                        การวิจัยและพัฒนาเครื่องมือ
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 mt-2 pb-2">
                            รายงานโดยผู้ป่วย
                        </span>
                        <span className="text-xl md:text-2xl font-medium text-slate-500 block mt-2">
                            (Patient Report Outcomes Measurement)
                            <br className="hidden md:block" />
                            เพื่อใช้ในการพัฒนาระบบบริการแบบเน้นคุณค่าสำหรับผู้ป่วยเบาหวาน
                        </span>
                    </h1>

                    <SignedIn>
                        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            <Link
                                href="/dashboard"
                                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white transition-all duration-300 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            >
                                <span className="relative z-10">
                                    เริ่มทำแบบสอบถาม
                                </span>
                                <div className="absolute inset-0 h-full w-full rounded-full bg-linear-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <svg
                                    className="relative z-10 w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </SignedIn>

                    <SignedOut>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            <SignInButton forceRedirectUrl="/?loggedIn=true">
                                <button className="w-full sm:w-auto px-10 py-3.5 text-lg font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
                                    เข้าสู่ระบบ
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-slate-400 text-sm relative z-10">
                <p>
                    © {new Date().getFullYear()}{" "}
                    สถาบันพัฒนาระบบบริการสุขภาพองค์รวม
                </p>
                <p className="mt-1 opacity-60">สงวนลิขสิทธิ์</p>
            </footer>
        </div>
    );
}
