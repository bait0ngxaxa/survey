import { getSubmissions } from "@/lib/actions/admin";
import ExportButton from "./export-button";
import SearchInput from "./search-input";
import Link from "next/link";
import { Suspense } from "react";

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

    const regions = ["", "central"]; // "phetchabun", "satun", "lopburi" hidden
    const regionLabels: Record<string, string> = {
        "": "ทั้งหมด",
        // phetchabun: "เพชรบูรณ์",
        // satun: "สตูล",
        // lopburi: "ลพบุรี",
        central: "ทีมกลาง",
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Submissions
                    </h1>
                    <p className="text-gray-500 mt-1">
                        แบบสอบถามทั้งหมด และผลการรายงาน
                    </p>
                </div>

                {/* Region Filter */}
                <div className="flex items-center gap-4">
                    <Suspense
                        fallback={
                            <div className="w-64 h-10 bg-gray-100 rounded-lg animate-pulse" />
                        }
                    >
                        <SearchInput />
                    </Suspense>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">
                            กรองตาม:
                        </label>
                        <div className="flex gap-1">
                            {regions.map((r) => (
                                <Link
                                    key={r}
                                    href={`/admin/submissions?page=1${
                                        r ? `&region=${r}` : ""
                                    }${
                                        searchQuery
                                            ? `&search=${searchQuery}`
                                            : ""
                                    }`}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                        regionFilter === r
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {regionLabels[r]}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-4 w-16 text-center">
                                    #
                                </th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">รหัสแบบสอบถาม</th>
                                <th className="px-6 py-4">Region</th>

                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No submissions found
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-center text-gray-500 font-medium">
                                            {(currentPage - 1) * 10 + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString("th-TH")}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                                                {item.id
                                                    .slice(0, 8)
                                                    .toUpperCase()}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {item.region}
                                        </td>

                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/submissions/${item.id}/report`}
                                                className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                                            >
                                                View Report
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50/50">
                    <span className="text-base font-semibold text-gray-700">
                        หน้า{" "}
                        <span className="text-blue-600">{currentPage}</span> จาก{" "}
                        <span className="text-blue-600">{totalPages}</span>
                    </span>
                    <div className="flex gap-3">
                        <Link
                            href={`/admin/submissions?page=${currentPage - 1}${
                                regionFilter ? `&region=${regionFilter}` : ""
                            }${searchQuery ? `&search=${searchQuery}` : ""}`}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all duration-200 flex items-center gap-2 ${
                                currentPage <= 1
                                    ? "pointer-events-none opacity-40 border-gray-200 text-gray-400 bg-gray-100"
                                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm active:scale-95"
                            }`}
                        >
                            ← ก่อนหน้า
                        </Link>
                        <Link
                            href={`/admin/submissions?page=${currentPage + 1}${
                                regionFilter ? `&region=${regionFilter}` : ""
                            }${searchQuery ? `&search=${searchQuery}` : ""}`}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all duration-200 flex items-center gap-2 ${
                                currentPage >= totalPages
                                    ? "pointer-events-none opacity-40 border-gray-200 text-gray-400 bg-gray-100"
                                    : "border-blue-500 text-white bg-blue-600 hover:bg-blue-700 hover:border-blue-600 hover:shadow-md active:scale-95"
                            }`}
                        >
                            ถัดไป →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Export Button - Bottom Center */}
            <div className="flex justify-center pt-4">
                <ExportButton regionFilter={regionFilter} />
            </div>
        </div>
    );
}
