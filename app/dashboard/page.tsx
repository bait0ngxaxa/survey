import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LoginSuccessModal from "@/components/LoginSuccessModal";
import SubmissionHistory from "@/components/SubmissionHistory";
import { regions } from "@/config/surveyData";
import { getRegionColorStyles } from "@/config/regionStyles";
import { getUserSubmissions } from "@/lib/actions/survey";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";

async function DashboardHeader() {
    return (
        <div className="mb-12 text-center max-w-4xl mx-auto animate-in slide-in-from-bottom-5 fade-in duration-700">
            {/* Enhanced Title with Glow */}
            <div className="relative inline-block mb-6">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    <span className="relative text-slate-800">
                        ยินดีต้อนรับสู่ระบบ
                        <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-sky-200/50 via-blue-200/30 to-transparent rounded-full blur-sm" />
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500">
                        แบบสอบถาม PROMs
                    </span>
                    <span className="block text-xl md:text-3xl font-semibold text-sky-600 mt-3">
                        เครื่องมือการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                    </span>
                </h1>
            </div>

            {/* Glassmorphism Instruction Card */}
            <div className="relative group inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="relative text-lg text-slate-500 bg-white/70 backdrop-blur-md py-3 px-8 rounded-full border border-sky-100/80 shadow-[0_4px_20px_rgba(14,165,233,0.1),0_2px_8px_rgba(0,0,0,0.04)] inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15),0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
                    <Sparkles className="w-5 h-5 text-sky-500 animate-pulse" />
                    กรุณาเลือกพื้นที่ของท่านเพื่อเริ่มทำแบบสอบถาม
                </p>
            </div>
        </div>
    );
}

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Fetch user's submissions
    const submissionsResult = await getUserSubmissions(10);
    const submissions = submissionsResult.success ? submissionsResult.data : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 relative overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            {/* Multi-layered Background Elements */}
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
                <div className="absolute top-[15%] left-[5%] w-48 h-48 border border-sky-100/20 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
                <div className="absolute bottom-[20%] right-[5%] w-24 h-24 border border-blue-200/30 rounded-full animate-[spin_35s_linear_infinite_reverse]" />
                <div className="absolute bottom-[20%] right-[5%] w-40 h-40 border border-blue-100/20 rounded-full animate-[spin_50s_linear_infinite]" />

                {/* Floating Particles */}
                <div className="absolute top-[30%] left-[25%] w-2 h-2 bg-sky-400/40 rounded-full animate-pulse" />
                <div className="absolute top-[45%] right-[30%] w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse" />
                <div className="absolute bottom-[35%] left-[40%] w-2.5 h-2.5 bg-cyan-400/35 rounded-full animate-pulse" />

                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />
            </div>

            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Suspense fallback={null}>
                    <LoginSuccessModal />
                </Suspense>

                <DashboardHeader />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {regions.map((region, index) => {
                        const styles = getRegionColorStyles(region.color);

                        return (
                            <Link
                                key={region.id}
                                href={`/survey/${region.id}`}
                                className={`group relative rounded-3xl p-1 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${styles.shadow} border border-white/50 backdrop-blur-sm`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient Border Effect */}
                                <div
                                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 to-slate-100/60 transition-all duration-500 ${styles.border}`}
                                />

                                {/* Outer Glow on Hover */}
                                <div
                                    className={`absolute inset-[-2px] rounded-3xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 ${styles.blob}`}
                                />

                                {/* Card Content */}
                                <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-[1.4rem] p-8 flex flex-col items-center text-center overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                                    {/* Decorative Background Blob */}
                                    <div
                                        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ${styles.blob}`}
                                    />
                                    <div
                                        className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 delay-100 ${styles.blob}`}
                                    />

                                    {/* Icon with Enhanced Glow */}
                                    <div
                                        className={`relative mb-6 p-5 rounded-2xl transition-all duration-300 group-hover:scale-105 ${styles.iconBg}`}
                                    >
                                        <MapPin
                                            className={`w-10 h-10 transition-transform duration-300 group-hover:scale-110 ${styles.iconText}`}
                                        />
                                        <div
                                            className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.iconGlow}`}
                                        />
                                        {/* Pulse ring effect */}
                                        <div
                                            className={`absolute inset-[-4px] rounded-2xl border-2 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${styles.iconText} border-current`}
                                        />
                                    </div>

                                    {/* Text */}
                                    <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 relative z-10 transition-colors duration-300">
                                        {region.name}
                                    </h2>

                                    <p className="text-sm text-slate-500 mb-8 relative z-10">
                                        คลิกเพื่อเข้าสู่แบบสอบถาม
                                        <br />
                                        สำหรับพื้นที่นี้
                                    </p>

                                    {/* Button-like CTA with Enhanced Effects */}
                                    <div
                                        className={`mt-auto relative z-10 px-8 py-3 rounded-full bg-slate-50/80 backdrop-blur-sm text-slate-600 text-sm font-semibold group-hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm group-hover:shadow-lg ${styles.button}`}
                                    >
                                        เลือกพื้นที่นี้
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Submission History Section */}
                <div className="animate-in slide-in-from-bottom-10 fade-in duration-700 delay-500">
                    <SubmissionHistory submissions={submissions} />
                </div>
            </div>
        </div>
    );
}
