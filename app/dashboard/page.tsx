import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";
import { regions } from "@/config/surveyData";
import { MapPin } from "lucide-react";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <Suspense fallback={null}>
                <SuccessModal />
            </Suspense>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        ยินดีต้อนรับสู่ระบบแบบสอบถาม
                        <br />
                        การรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                        <br />
                        โดยผู้ป่วยเป็นคนรายงาน
                    </h1>
                    <p className="text-lg text-gray-600">
                        กรุณาเลือกพื้นที่ของท่านเพื่อเริ่มทำแบบสอบถาม
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {regions.map((region) => (
                        <Link
                            key={region.id}
                            href={`/survey/${region.id}`}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 w-full max-w-md"
                        >
                            <div className={`h-2 ${region.color}`} />
                            <div className="p-8 flex items-center gap-6">
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center ${region.color} bg-opacity-10 text-white group-hover:scale-110 transition-transform`}
                                >
                                    <MapPin
                                        className={`w-8 h-8 ${region.color.replace(
                                            "bg-",
                                            "text-"
                                        )}`}
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {region.name}
                                    </h2>
                                    <p className="text-gray-500 mt-1">
                                        คลิกเพื่อเริ่มทำแบบสอบถาม
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
