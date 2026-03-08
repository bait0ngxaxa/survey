/**
 * Skeleton fallback for submissions content while data streams in via Suspense.
 * Matches the visual structure of SubmissionsTable + SubmissionCardList.
 */
export function SubmissionsContentSkeleton() {
    return (
        <>
            {/* Desktop Table Skeleton */}
            <div className="hidden md:block relative">
                <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-linear-to-r from-slate-50 via-sky-50/50 to-slate-50 border-b border-slate-200/80">
                                <th className="px-6 py-4 w-20 text-center text-slate-500 font-semibold text-xs uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                    ID แบบสอบถาม
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                    ผู้ให้ข้อมูล
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                    ผู้สัมภาษณ์
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                    วันที่บันทึก
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                    ภูมิภาค
                                </th>
                                <th className="px-6 py-4 text-right text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4 text-center">
                                        <div className="h-4 w-6 bg-slate-200 rounded mx-auto" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-24 bg-slate-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-28 bg-slate-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-28 bg-slate-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-20 bg-slate-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-16 bg-slate-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="h-4 w-12 bg-slate-200 rounded ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card Skeleton */}
            <div className="md:hidden space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse bg-white rounded-xl border border-slate-200 p-4 space-y-3"
                    >
                        <div className="flex justify-between">
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                            <div className="h-4 w-16 bg-slate-200 rounded" />
                        </div>
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                        <div className="h-4 w-20 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>
        </>
    );
}
