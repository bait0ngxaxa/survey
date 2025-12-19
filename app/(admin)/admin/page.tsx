import { getAdminStats } from "@/lib/actions/admin";
import { Users, MapPin, Activity } from "lucide-react";

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    const totalCount = stats.totalSubmissions;

    const regions = [
        {
            id: "central",
            name: "บริบทคนไทยทีมกลาง",
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
            hoverutils:
                "group-hover:border-blue-300 group-hover:shadow-blue-500/20",
            iconBg: "bg-blue-100 group-hover:bg-blue-200",
        },
        {
            id: "phetchabun",
            name: "บริบทพื้นที่เพชรบูรณ์",
            color: "text-teal-600",
            bg: "bg-teal-50",
            border: "border-teal-100",
            hoverutils:
                "group-hover:border-teal-300 group-hover:shadow-teal-500/20",
            iconBg: "bg-teal-100 group-hover:bg-teal-200",
        },
        {
            id: "satun",
            name: "บริบทพื้นที่สตูล",
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-100",
            hoverutils:
                "group-hover:border-orange-300 group-hover:shadow-orange-500/20",
            iconBg: "bg-orange-100 group-hover:bg-orange-200",
        },
        {
            id: "lopburi",
            name: "บริบทพื้นที่ลพบุรี",
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-100",
            hoverutils:
                "group-hover:border-purple-300 group-hover:shadow-purple-500/20",
            iconBg: "bg-purple-100 group-hover:bg-purple-200",
        },
    ];

    const getCount = (regionId: string) => {
        const found = stats.byRegion.find((r) => r.region === regionId);
        return found ? found.count : 0;
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-2">
                    ยอดผู้ตอบแบบสอบถามแยกตามเขตสุขภาพ
                </p>
            </div>

            {/* Hero Card: Total Overview */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-sky-100 flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-700" />

                <div className="relative z-10">
                    <h2 className="text-lg font-semibold text-slate-600 uppercase tracking-wide">
                        ภาพรวมผู้ตอบแบบสอบถามทั้งหมด
                    </h2>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-5xl font-extrabold text-slate-800">
                            {totalCount}
                        </p>
                        <p className="text-slate-500 font-medium">คน</p>
                    </div>
                </div>
                <div className="relative z-10 p-4 bg-sky-100 text-sky-600 rounded-2xl group-hover:bg-sky-200 transition-colors duration-300">
                    <Users size={32} />
                </div>
            </div>

            {/* Region Stats Grid */}
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Activity size={24} className="text-sky-500" />
                    แยกรายเขตสุขภาพ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {regions.map((region) => (
                        <div
                            key={region.id}
                            className={`group p-6 rounded-3xl shadow-sm border bg-white/60 backdrop-blur-sm transition-all hover:-translate-y-1 duration-300 ${region.border} ${region.hoverutils}`}
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <h3
                                        className={`text-sm font-bold uppercase tracking-wider ${region.color}`}
                                    >
                                        {region.name}
                                    </h3>
                                    <div
                                        className={`p-2.5 rounded-xl transition-colors duration-300 ${region.iconBg}`}
                                    >
                                        <MapPin
                                            className={`w-5 h-5 ${region.color}`}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span
                                        className={`text-4xl font-extrabold ${region.color}`}
                                    >
                                        {getCount(region.id)}
                                    </span>
                                    <span className="text-sm text-slate-500 font-medium">
                                        คน
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
