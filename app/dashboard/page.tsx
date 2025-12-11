import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";
import SubmissionHistory from "@/components/SubmissionHistory";
import { regions } from "@/config/surveyData";
import { getUserSubmissions } from "@/lib/actions/survey";
import { MapPin } from "lucide-react";

async function DashboardHeader() {
    return (
        <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                ยินดีต้อนรับสู่ระบบแบบสอบถาม
                <span className="block text-xl md:text-2xl font-medium text-slate-500 mt-2">
                    การรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                </span>
            </h1>
            <p className="text-lg text-slate-600 bg-white/50 inline-block py-2 px-6 rounded-full border border-slate-200 backdrop-blur-sm">
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
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Suspense fallback={null}>
                    <SuccessModal />
                </Suspense>

                <DashboardHeader />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {regions.map((region) => (
                        <Link
                            key={region.id}
                            href={`/survey/${region.id}`}
                            className="group relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 border border-slate-100 overflow-hidden flex flex-col h-full"
                        >
                            <div
                                className={`h-3 w-full ${region.color} transition-all duration-300 group-hover:h-4`}
                            />

                            <div className="p-8 flex flex-col items-center text-center grow">
                                <div
                                    className={`w-20 h-20 rounded-2xl flex items-center justify-center ${region.color} bg-opacity-10 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out`}
                                >
                                    <MapPin
                                        className={`w-10 h-10 ${region.color.replace(
                                            "bg-",
                                            "text-"
                                        )} Drop-shadow-sm`}
                                    />
                                </div>

                                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                    {region.name}
                                </h2>

                                <div className="mt-auto">
                                    <span className="inline-flex items-center text-sm font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                                        คลิกเพื่อทำแบบสอบถาม
                                        <svg
                                            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div
                                className={`absolute inset-0 ${region.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`}
                            />
                        </Link>
                    ))}
                </div>

                {/* Submission History Section */}
                <div className="mt-12">
                    <SubmissionHistory submissions={submissions} />
                </div>
            </div>
        </div>
    );
}
