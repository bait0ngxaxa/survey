import { SubmissionTableRow } from "./SubmissionTableRow";

interface Submission {
    id: string;
    createdAt: Date;
    region: string;
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
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-sky-50/50 text-slate-900 font-semibold border-b border-sky-100">
                    <tr>
                        <th className="px-6 py-4 w-20 text-center">#</th>
                        <th className="px-6 py-4">ID แบบสอบถาม</th>
                        <th className="px-6 py-4">วันที่บันทึก</th>
                        <th className="px-6 py-4">ภูมิภาค</th>
                        <th className="px-6 py-4 text-right">จัดการ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
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
    );
}
