import { getSubmissions } from "@/lib/actions/admin";
import ExportButton from "./export-button";
import SearchInput from "./search-input";
import Link from "next/link";
import { Suspense } from "react";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    FileText,
    MapPin,
    User,
    Search,
} from "lucide-react";

const getRegionLabel = (region: string) => {
    const labels: Record<string, string> = {
        central: "ทีมกลาง",
        phetchabun: "เพชรบูรณ์",
        satun: "สตูล",
        lopburi: "ลพบุรี",
    };
    return labels[region] || region;
};

export default async function SubmissionsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; region?: string; search?: string }>;
}) {
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;
    const regionFilter = params?.region || "";
    const searchQuery = params?.search || "";
    const { submissions, totalPages } = await getSubmissions(
        currentPage,
        10,
        regionFilter,
        searchQuery
    );

    const regions = ["", "central", "phetchabun", "satun", "lopburi"];
    const regionLabels: Record<string, string> = {
        "": "ทั้งหมด",
        central: "ทีมกลาง",
        phetchabun: "เพชรบูรณ์",
        satun: "สตูล",
        lopburi: "ลพบุรี",
    };

    return (
        <div className="space-y-6 pb-20 sm:pb-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Submissions
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        รายการแบบสอบถามและผลการประเมิน
                    </p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="w-full md:w-auto md:min-w-[300px]">
                    <Suspense
                        fallback={
                            <div className="w-full h-10 bg-slate-100 rounded-lg animate-pulse" />
                        }
                    >
                        <SearchInput />
                    </Suspense>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap hidden md:inline">
                        ภูมิภาค:
                    </span>
                    <div className="flex gap-2">
                        {regions.map((r) => (
                            <Link
                                key={r}
                                href={`/admin/submissions?page=1${
                                    r ? `&region=${r}` : ""
                                }${
                                    searchQuery ? `&search=${searchQuery}` : ""
                                }`}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                                    regionFilter === r
                                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                {regionLabels[r] || r}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            {submissions.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">
                        ไม่พบรายการที่ค้นหา
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                        ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองใหม่อีกครั้ง
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop View: Table */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 w-20 text-center">
                                        #
                                    </th>
                                    <th className="px-6 py-4">ID แบบสอบถาม</th>
                                    <th className="px-6 py-4">วันที่บันทึก</th>
                                    <th className="px-6 py-4">ภูมิภาค</th>
                                    <th className="px-6 py-4 text-right">
                                        จัดการ
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {submissions.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-center text-slate-400">
                                            {(currentPage - 1) * 10 + index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            <code className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-mono border border-slate-200">
                                                {item.id
                                                    .slice(0, 8)
                                                    .toUpperCase()}
                                                ...
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleDateString("th-TH", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "2-digit",
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {getRegionLabel(item.region)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/submissions/${item.id}/report`}
                                                className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-medium text-sm transition-colors"
                                            >
                                                <span>ดูรายงาน</span>
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View: Cards */}
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {submissions.map((item) => (
                            <Link
                                href={`/admin/submissions/${item.id}/report`}
                                key={item.id}
                                className="block bg-white p-5 rounded-xl shadow-sm border border-slate-200 active:scale-[0.99] transition-transform"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-slate-900 text-base">
                                            {item.patient?.firstName}{" "}
                                            {item.patient?.lastName}
                                        </h3>
                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            HN:{" "}
                                            {item.patient?.nationalId || "-"}
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                                        {getRegionLabel(item.region)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString("th-TH")}
                                    </div>
                                    <div className="flex items-center text-indigo-600 font-medium">
                                        ดูรายละเอียด{" "}
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-8 sm:pb-0">
                    <div className="text-sm text-slate-500">
                        หน้า{" "}
                        <span className="font-semibold text-slate-900">
                            {currentPage}
                        </span>{" "}
                        จาก {totalPages}
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Link
                            href={`/admin/submissions?page=${currentPage - 1}${
                                regionFilter ? `&region=${regionFilter}` : ""
                            }${searchQuery ? `&search=${searchQuery}` : ""}`}
                            className={`flex-1 sm:flex-none justify-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center gap-2 ${
                                currentPage <= 1
                                    ? "pointer-events-none opacity-50 border-slate-200 bg-slate-50 text-slate-400"
                                    : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400"
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            ก่อนหน้า
                        </Link>
                        <Link
                            href={`/admin/submissions?page=${currentPage + 1}${
                                regionFilter ? `&region=${regionFilter}` : ""
                            }${searchQuery ? `&search=${searchQuery}` : ""}`}
                            className={`flex-1 sm:flex-none justify-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center gap-2 ${
                                currentPage >= totalPages
                                    ? "pointer-events-none opacity-50 border-slate-200 bg-slate-50 text-slate-400"
                                    : "border-slate-900 text-white bg-slate-900 hover:bg-slate-800 hover:shadow-md"
                            }`}
                        >
                            ถัดไป
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Export Button - Fixed on mobile, Normal on desktop */}
            <div className="fixed bottom-6 right-6 z-20 md:static md:flex md:justify-center md:pt-4">
                <div className="shadow-lg md:shadow-none rounded-full md:rounded-lg overflow-hidden">
                    <ExportButton regionFilter={regionFilter} />
                </div>
            </div>
        </div>
    );
}
