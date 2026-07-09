/**
 * Skeleton fallback for submissions content while data streams in via Suspense.
 * Matches the visual structure of SubmissionsTable + SubmissionCardList.
 */
export function SubmissionsContentSkeleton() {
    return (
        <>
            <div className="hidden md:block relative">
                <div
                    className="relative proms-panel rounded-2xl overflow-hidden"
                    role="status"
                    aria-label="กำลังโหลดรายการแบบสอบถาม"
                >
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="proms-header-gradient border-b border-sky-100">
                                <th className="px-6 py-4 w-20 text-center text-slate-600 font-semibold text-xs">
                                    #
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs">
                                    ID แบบสอบถาม
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs">
                                    ผู้ให้ข้อมูล
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs">
                                    ผู้สัมภาษณ์
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs">
                                    วันที่บันทึก
                                </th>
                                <th className="px-6 py-4 text-slate-700 font-semibold text-xs">
                                    ภูมิภาค
                                </th>
                                <th className="px-6 py-4 text-right text-slate-700 font-semibold text-xs">
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

            <div
                className="md:hidden space-y-3"
                role="status"
                aria-label="กำลังโหลดรายการแบบสอบถาม"
            >
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse proms-panel rounded-xl p-4 space-y-3"
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
