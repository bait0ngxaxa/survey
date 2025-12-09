import { getSubmissions } from "@/lib/actions/admin";
import ExportButton from "./export-button";
import Link from "next/link";

export default async function SubmissionsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams; // Await the searchParams promise
    const currentPage = Number(params?.page) || 1;
    const { submissions, totalPages } = await getSubmissions(currentPage);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Submissions
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage and view survey results
                    </p>
                </div>
                <ExportButton />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Patient ID</th>
                                <th className="px-6 py-4">Region</th>
                                <th className="px-6 py-4">Hospital</th>
                                <th className="px-6 py-4">Result</th>
                                {/* <th className="px-6 py-4 text-right">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No submissions found
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString("th-TH")}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {item.patient?.nationalId ||
                                                item.patientId.slice(0, 8)}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {item.region}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.hospital || "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.interpretationResult ? (
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        item.interpretationResult.includes(
                                                            "สูง"
                                                        ) ||
                                                        item.interpretationResult.includes(
                                                            "High"
                                                        )
                                                            ? "bg-red-50 text-red-700"
                                                            : "bg-green-50 text-green-700"
                                                    }`}
                                                >
                                                    {item.interpretationResult}
                                                </span>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/submissions?page=${currentPage - 1}`}
                            className={`px-3 py-1 text-sm border rounded hover:bg-gray-50 ${
                                currentPage <= 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }`}
                        >
                            Previous
                        </Link>
                        <Link
                            href={`/admin/submissions?page=${currentPage + 1}`}
                            className={`px-3 py-1 text-sm border rounded hover:bg-gray-50 ${
                                currentPage >= totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }`}
                        >
                            Next
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
