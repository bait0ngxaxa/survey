import { getAdminStats } from "@/lib/actions/admin";

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    const totalCount = stats.totalSubmissions;

    const regions = [
        {
            id: "central",
            name: "บริบทคนไทยทีมกลาง",
            color: "text-blue-600 bg-blue-50 border-blue-200",
            iconBg: "bg-blue-100",
        },
        {
            id: "phetchabun",
            name: "บริบทพื้นที่เพชรบูรณ์",
            color: "text-teal-600 bg-teal-50 border-teal-200",
            iconBg: "bg-teal-100",
        },
        {
            id: "satun",
            name: "บริบทพื้นที่สตูล",
            color: "text-orange-600 bg-orange-50 border-orange-200",
            iconBg: "bg-orange-100",
        },
        {
            id: "lopburi",
            name: "บริบทพื้นที่ลพบุรี",
            color: "text-purple-600 bg-purple-50 border-purple-200",
            iconBg: "bg-purple-100",
        },
    ];

    const getCount = (regionId: string) => {
        const found = stats.byRegion.find((r) => r.region === regionId);
        return found ? found.count : 0;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">
                    ยอดผู้ตอบแบบสอบถามแยกตามเขตสุขภาพ
                </p>
            </div>

            {/* Hero Card: Total Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
                        ภาพรวมผู้ตอบแบบสอบถามทั้งหมด
                    </h2>
                    <p className="text-5xl font-extrabold text-gray-900 mt-2">
                        {totalCount}
                    </p>
                    <p className="text-gray-500 mt-1">คน</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-full text-gray-600">
                    <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Region Stats Grid */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    แยกรายเขตสุขภาพ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {regions.map((region) => (
                        <div
                            key={region.id}
                            className={`p-6 rounded-xl shadow-sm border ${region.color} bg-white transition-all hover:shadow-lg hover:-translate-y-1 duration-200`}
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <h3
                                        className={`text-sm font-bold uppercase tracking-wider ${
                                            region.color.split(" ")[0]
                                        }`}
                                    >
                                        {region.name}
                                    </h3>
                                    <div
                                        className={`p-2 rounded-lg ${region.iconBg}`}
                                    >
                                        <svg
                                            className={`w-5 h-5 ${
                                                region.color.split(" ")[0]
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span
                                        className={`text-4xl font-extrabold ${
                                            region.color.split(" ")[0]
                                        }`}
                                    >
                                        {getCount(region.id)}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">
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
