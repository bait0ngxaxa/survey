import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";
import SubmissionHistory from "@/components/SubmissionHistory";
import { regions } from "@/config/surveyData";
import { getUserSubmissions } from "@/lib/actions/survey";
import { MapPin, ArrowRight } from "lucide-react";

async function DashboardHeader() {
    return (
        <div className="mb-12 text-center max-w-4xl mx-auto animate-in slide-in-from-bottom-5 fade-in duration-700">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                ยินดีต้อนรับสู่ระบบแบบสอบถาม
                <span className="block text-xl md:text-3xl font-semibold text-sky-600 mt-2">
                    การรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                </span>
            </h1>
            <p className="text-lg text-slate-500 bg-white/80 inline-block py-2 px-6 rounded-full border border-sky-100 shadow-sm backdrop-blur-sm">
                กรุณาเลือกพื้นที่ของท่านเพื่อเริ่มทำแบบสอบถาม
            </p>
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
        <div className="min-h-screen bg-white relative overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            {/* Background Elements - Consistent with Homepage */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-sky-50/60 rounded-full blur-3xl opacity-70" />
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-60" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Suspense fallback={null}>
                    <SuccessModal />
                </Suspense>

                <DashboardHeader />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {regions.map((region, index) => {
                        // Define explicit styles for each color to prevent Tailwind purging
                        // and ensure contrast correctness
                        interface ColorStyleConfig {
                            border: string;
                            shadow: string;
                            blob: string;
                            iconBg: string;
                            iconText: string;
                            iconGlow: string;
                            button: string;
                        }
                        const colorStyles: Record<string, ColorStyleConfig> = {
                            "bg-blue-500": {
                                border: "group-hover:to-blue-400 group-hover:from-blue-200",
                                shadow: "hover:shadow-blue-500/20",
                                blob: "bg-blue-50",
                                iconBg: "bg-blue-50 group-hover:bg-blue-100",
                                iconText: "text-blue-600",
                                iconGlow: "bg-blue-200/30",
                                button: "group-hover:bg-blue-600",
                            },
                            "bg-teal-500": {
                                border: "group-hover:to-teal-400 group-hover:from-teal-200",
                                shadow: "hover:shadow-teal-500/20",
                                blob: "bg-teal-50",
                                iconBg: "bg-teal-50 group-hover:bg-teal-100",
                                iconText: "text-teal-600",
                                iconGlow: "bg-teal-200/30",
                                button: "group-hover:bg-teal-600",
                            },
                            "bg-orange-500": {
                                border: "group-hover:to-orange-400 group-hover:from-orange-200",
                                shadow: "hover:shadow-orange-500/20",
                                blob: "bg-orange-50",
                                iconBg: "bg-orange-50 group-hover:bg-orange-100",
                                iconText: "text-orange-600",
                                iconGlow: "bg-orange-200/30",
                                button: "group-hover:bg-orange-600",
                            },
                            "bg-purple-500": {
                                border: "group-hover:to-purple-400 group-hover:from-purple-200",
                                shadow: "hover:shadow-purple-500/20",
                                blob: "bg-purple-50",
                                iconBg: "bg-purple-50 group-hover:bg-purple-100",
                                iconText: "text-purple-600",
                                iconGlow: "bg-purple-200/30",
                                button: "group-hover:bg-purple-600",
                            },
                        };

                        const styles =
                            colorStyles[region.color] ||
                            colorStyles["bg-blue-500"];

                        return (
                            <Link
                                key={region.id}
                                href={`/survey/${region.id}`}
                                className={`group relative rounded-3xl p-1 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${styles.shadow} border border-slate-200`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient Border Effect */}
                                <div
                                    className={`absolute inset-0 rounded-3xl bg-linear-to-br from-slate-200 to-slate-100 transition-colors duration-500 ${styles.border}`}
                                />

                                {/* Card Content */}
                                <div className="relative h-full bg-white rounded-[1.4rem] p-8 flex flex-col items-center text-center overflow-hidden">
                                    {/* Decorative Background Blob */}
                                    <div
                                        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ${styles.blob}`}
                                    />
                                    <div
                                        className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 delay-100 ${styles.blob}`}
                                    />

                                    {/* Icon */}
                                    <div
                                        className={`relative mb-6 p-5 rounded-2xl transition-colors duration-300 ${styles.iconBg}`}
                                    >
                                        <MapPin
                                            className={`w-10 h-10 transition-transform duration-300 group-hover:scale-110 ${styles.iconText}`}
                                        />
                                        <div
                                            className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.iconGlow}`}
                                        />
                                    </div>

                                    {/* Text */}
                                    <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 relative z-10">
                                        {region.name}
                                    </h2>

                                    <p className="text-sm text-slate-500 mb-8 relative z-10">
                                        คลิกเพื่อเข้าสู่แบบสอบถาม
                                        <br />
                                        สำหรับพื้นที่นี้
                                    </p>

                                    {/* Button-like CTA */}
                                    <div
                                        className={`mt-auto relative z-10 px-8 py-3 rounded-full bg-slate-50 text-slate-600 text-sm font-semibold group-hover:text-white transition-all duration-300 flex items-center gap-2 ${styles.button}`}
                                    >
                                        เลือกพื้นที่นี้
                                        <ArrowRight className="w-4 h-4" />
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
