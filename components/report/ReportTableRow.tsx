import { CentralGroup } from "@/lib/constants/reportConstants";
import { ReportStepData } from "@/lib/types";

interface ReportTableRowProps {
    group: CentralGroup;
    reportStepData: ReportStepData;
    isFirstOfDimension: boolean;
    dimensionRowSpan: number;
}

export function ReportTableRow({
    group,
    reportStepData,
    isFirstOfDimension,
    dimensionRowSpan,
}: ReportTableRowProps) {
    const isActionNeeded = reportStepData.criteria === "1-2";
    const isWatch = reportStepData.criteria === "3";

    return (
        <tr className="hover:bg-gray-50/30 print:hover:bg-transparent">
            {isFirstOfDimension && (
                <td
                    className="p-4 align-top font-bold text-gray-900 bg-gray-50/50 border-r border-b border-gray-100 print:border-black print:bg-transparent"
                    rowSpan={dimensionRowSpan}
                >
                    <div className="whitespace-pre-line">{group.dimension}</div>
                </td>
            )}
            <td className="p-4 align-top text-center font-medium border-r border-gray-100 text-indigo-600 print:border-black">
                {group.questionsLabel}
            </td>
            <td className="p-4 align-top border-r border-gray-100 print:border-black">
                <div
                    className={`text-base ${
                        isActionNeeded
                            ? "text-red-600 font-bold"
                            : isWatch
                            ? "text-orange-600 font-semibold"
                            : "text-green-700 font-medium"
                    } `}
                >
                    {reportStepData.action}
                </div>
                {/* Show extra info if available */}
                {reportStepData.additionalInfo && (
                    <AdditionalInfoDisplay
                        additionalInfo={reportStepData.additionalInfo}
                    />
                )}
            </td>
            <td className="p-4 align-top text-gray-800">
                {reportStepData.relatedUnit}
            </td>
        </tr>
    );
}

interface AdditionalInfoDisplayProps {
    additionalInfo: ReportStepData["additionalInfo"];
}

/**
 * AdditionalInfoDisplay - แสดงข้อมูลเพิ่มเติมในแต่ละแถว
 */
function AdditionalInfoDisplay({ additionalInfo }: AdditionalInfoDisplayProps) {
    if (!additionalInfo) return null;

    return (
        <div className="text-xs text-gray-500 mt-1">
            {additionalInfo.movementLimit && (
                <div>• มีข้อจำกัดด้านการเคลื่อนไหว</div>
            )}
            {additionalInfo.tired && <div>• ออกแรงแล้วเหนื่อย</div>}
            {additionalInfo.topic && (
                <div>• ข้อมูลเพิ่มเติม : {additionalInfo.topic}</div>
            )}
        </div>
    );
}
