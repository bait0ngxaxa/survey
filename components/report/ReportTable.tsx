import { Check } from "lucide-react";
import { ReportData } from "@/lib/types";
import {
    CENTRAL_GROUPS,
    getDimensionCounts,
} from "@/lib/constants/reportConstants";
import { ReportTableRow } from "./ReportTableRow";

interface ReportTableProps {
    reportData: ReportData;
}

export function ReportTable({ reportData }: ReportTableProps) {
    const dimensionCounts = getDimensionCounts(CENTRAL_GROUPS);
    const renderedDimensions: Record<string, boolean> = {};

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 print:shadow-none print:border-none print:p-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 print:hidden">
                <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                    <Check size={28} />
                </span>
                สรุปผลการประเมิน 7 มิติ
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-xs print:border-black print:rounded-none">
                <table className="w-full text-left text-sm text-gray-600 border-collapse min-w-[600px]">
                    <thead className="bg-gray-50 text-gray-900 font-semibold text-center print:bg-gray-200">
                        <tr>
                            <th className="p-4 border-b border-gray-200 border-r w-1/5 print:border-black">
                                มิติ
                            </th>
                            <th className="p-4 border-b border-gray-200 border-r w-[10%] print:border-black">
                                ข้อที่
                            </th>
                            <th className="p-4 border-b border-gray-200 border-r w-2/5 print:border-black">
                                ผลการประเมิน
                            </th>
                            <th className="p-4 border-b border-gray-200 w-1/5 print:border-black">
                                หน่วยงานที่เกี่ยวข้อง
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white print:divide-black">
                        {CENTRAL_GROUPS.map((group) => {
                            const rec = reportData[`step_${group.id}`];
                            if (!rec) return null;

                            const isFirstOfDimension =
                                !renderedDimensions[group.dimension];

                            if (isFirstOfDimension) {
                                renderedDimensions[group.dimension] = true;
                            }

                            return (
                                <ReportTableRow
                                    key={group.id}
                                    group={group}
                                    reportStepData={rec}
                                    isFirstOfDimension={isFirstOfDimension}
                                    dimensionRowSpan={
                                        dimensionCounts[group.dimension]
                                    }
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
