import { getAdminStats } from "@/lib/actions/admin";

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">
                    Overview of survey submissions
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Total Submissions
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                        {stats.totalSubmissions}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Region Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        By Region
                    </h3>
                    <div className="space-y-4">
                        {stats.byRegion.map((item) => (
                            <div
                                key={item.region}
                                className="flex items-center justify-between"
                            >
                                <span className="text-gray-700 capitalize">
                                    {item.region}
                                </span>
                                <span className="font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                    {item.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hospital Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        By Hospital
                    </h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {stats.byHospital.map((item) => (
                            <div
                                key={item.hospital || "Unknown"}
                                className="flex items-center justify-between"
                            >
                                <span className="text-gray-700 truncate max-w-[70%]">
                                    {item.hospital || "Unknown"}
                                </span>
                                <span className="font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                                    {item.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
