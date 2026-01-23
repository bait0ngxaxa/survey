import { SubmissionTableRow } from "./SubmissionTableRow";

interface Submission {
    id: string;
    createdAt: Date;
    region: string;
    patient: {
        firstName: string | null;
        lastName: string | null;
    } | null;
    interviewer?: string | null;
}

interface SubmissionsTableProps {
    submissions: Submission[];
    currentPage: number;
}

export function SubmissionsTable({
    submissions,
    currentPage,
}: SubmissionsTableProps) {
    return (
        <div className="hidden md:block relative group">
            {/* Outer glow effect */}
            <div className="absolute inset-[-1px] bg-gradient-to-br from-sky-200/40 via-blue-100/20 to-slate-200/40 rounded-2xl blur-sm opacity-60" />

            {/* Table container with depth */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_4px_24px_rgba(14,165,233,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/80 overflow-hidden">
                <table className="w-full text-left text-sm">
                    {/* Enhanced header with depth */}
                    <thead>
                        <tr className="bg-gradient-to-r from-slate-50 via-sky-50/50 to-slate-50 border-b border-slate-200/80">
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
