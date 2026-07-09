import { SubmissionTableRow } from "./SubmissionTableRow";
import { type AdminSubmission } from "@/lib/types";

interface SubmissionsTableProps {
    submissions: AdminSubmission[];
    currentPage: number;
}

export function SubmissionsTable({
    submissions,
    currentPage,
}: SubmissionsTableProps) {
    return (
        <div className="hidden md:block relative">
            <div className="relative proms-panel rounded-2xl overflow-hidden">
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
                        {submissions.map((item, index) => (
                            <SubmissionTableRow
                                key={item.id}
                                submission={item}
                                index={index}
                                currentPage={currentPage}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
