import { Suspense } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
            <Suspense fallback={null}>
                <SuccessModal />
            </Suspense>

            {/* Hero Section */}
            <main className="grow flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
                    <div className="mb-8 flex justify-center">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600"
                            >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <path d="M16 13H8" />
                                <path d="M16 17H8" />
                                <path d="M10 9H8" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-relaxed">
                        การวิจัยและพัฒนาเครื่องมือรายงานโดยผู้ป่วย
                        <br />
                        <span className="text-blue-600 block mt-2 text-xl md:text-2xl">
                            (Patient Report Outcomes Measurement)
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        เพื่อใช้ในการพัฒนาระบบบริการแบบเน้นคุณค่าสำหรับผู้ป่วยเบาหวาน
                    </p>

                    <SignedIn>
                        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Link
                                href="/dashboard"
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            >
                                <span>เริ่มทำแบบสอบถาม</span>
                                <svg
                                    className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1"
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
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SignInButton forceRedirectUrl="/?loggedIn=true">
                                <button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all shadow-blue-500/20">
                                    เข้าสู่ระบบ
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} สถาบันพัฒนาระบบบริการสุขภาพองค์รวม.
                สงวนลิขสิทธิ์.
            </footer>
        </div>
    );
}
