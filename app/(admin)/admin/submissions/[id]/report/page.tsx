import { getSurveySubmission } from "@/lib/actions/survey";
import { Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrintButton from "@/components/PrintButton";
import BackToSubmissionsButton from "@/components/BackToSubmissionsButton";
import { asRawAnswers, ReportData } from "@/lib/types";

export default async function SubmissionReportPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { success, data: submission } = await getSurveySubmission(id);

    if (!success || !submission) {
        notFound();
    }

    // Parse report data from rawAnswers
    const rawAnswers = asRawAnswers(submission.rawAnswers);
    const reportData: ReportData | undefined = rawAnswers?.reportData;

    // Fallback if no report data (e.g. old submissions)
    if (!reportData) {
        return (
            <div className="p-8 text-center text-gray-500">
                <h1 className="text-xl font-bold mb-4">
                    ไม่พบข้อมูลรายงานสรุป (Report Data Not Found)
                </h1>
                <p>
                    ข้อมูลการประเมินนี้อาจถูกบันทึกก่อนที่จะมีการปรับปรุงระบบรายงาน
                </p>
                <Link
                    href="/admin/submissions"
                    className="text-blue-600 hover:underline mt-4 block"
                >
                    ย้อนกลับ
                </Link>
            </div>
        );
    }

    const CENTRAL_GROUPS = [
        {
            id: 1,
            questionsLabel: "1",
            label: "ข้อที่ 1\nความสามารถทำกิจวัตรประจำวัน",
            dimension: "การทำงาน\nของร่างกาย",
        },
        {
            id: 2,
            questionsLabel: "2-3",
            label: "ข้อที่ 2-3\nการเคลื่อนไหว / ความทนทาน",
            dimension: "การทำงาน\nของร่างกาย",
        },
        {
            id: 3,
            questionsLabel: "4-7",
            label: "ข้อที่ 4-7\nความรุนแรงของอาการ",
            dimension: "อาการของโรค",
        },
        {
            id: 4,
            questionsLabel: "8-10",
            label: "ข้อที่ 8-10\nความกังวล/ผลกระทบทางใจ",
            dimension: "สุขภาพจิตใจ",
        },
        {
            id: 5,
            questionsLabel: "11,12,14,16",
            label: "ข้อที่ 11, 12, 14, 16\nการจัดการโรค/พฤติกรรมสุขภาพ",
            dimension: "การดูแลตนเอง",
        },
        {
            id: 6,
            questionsLabel: "13,15",
            label: "ข้อที่ 13, 15\nการตัดสินใจ/การรับมือ",
            dimension: "การดูแลตนเอง",
        },
        {
            id: 7,
            questionsLabel: "17-20",
            label: "ข้อที่ 17-20\nบทบาททางสังคม/ความเครียด",
            dimension: "สังคม",
        },
        {
            id: 8,
            questionsLabel: "21-23",
            label: "ข้อที่ 21-23\nการประเมินสุขภาพตนเอง",
            dimension: "สุขภาพโดยรวม",
        },
        {
            id: 9,
            questionsLabel: "24-26",
            label: "ข้อที่ 24-26\nความเข้าใจ/ข้อมูลการรักษา",
            dimension: "ความพึงพอใจ",
        },
        {
            id: 10,
            questionsLabel: "27-29",
            label: "ข้อที่ 27-29\nการตัดสินใจ/ความยืดหยุ่น",
            dimension: "ความพึงพอใจ",
        },
    ];

    // Calculate rowspans
    const dimensionCounts: Record<string, number> = {};
    CENTRAL_GROUPS.forEach((g) => {
        dimensionCounts[g.dimension] = (dimensionCounts[g.dimension] || 0) + 1;
    });

    const renderedDimensions: Record<string, boolean> = {};

    return (
        <div className="max-w-5xl mx-auto py-8 pt-20 px-4 print:p-0">
            {/* Print Header - Hidden on Screen */}
            <div className="hidden print:block mb-6 text-center">
                <h1 className="text-2xl font-bold">
                    แบบรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
                </h1>
                <div className="mt-2 text-sm text-gray-600 flex justify-center gap-6">
                    <span>
                        วันที่:{" "}
                        {new Date(submission.createdAt).toLocaleDateString(
                            "th-TH"
                        )}
                    </span>
                    <span>
                        ชื่อ-นามสกุล: {submission.patient?.firstName}{" "}
                        {submission.patient?.lastName}
                    </span>
                    <span>HN: {submission.patient?.nationalId}</span>
                </div>
            </div>

            {/* Screen Header */}
            <div className="relative z-50 flex items-center gap-3 mb-6 print:hidden">
                <BackToSubmissionsButton />
                <PrintButton />
            </div>

            {/* Patient Info Card (Screen Only) */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6 print:hidden">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                    ข้อมูลแบบสอบถาม
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="block text-slate-500 mb-1">
                            ชื่อผู้ให้ข้อมูล
                        </span>
                        <span className="font-semibold text-slate-900">
                            {submission.patient?.firstName}{" "}
                            {submission.patient?.lastName}
                        </span>
                    </div>
                    <div>
                        <span className="block text-slate-500 mb-1">
                            HN / ID
                        </span>
                        <span className="font-semibold text-slate-900">
                            {submission.patient?.nationalId || "-"}
                        </span>
                    </div>
                    <div>
                        <span className="block text-slate-500 mb-1">
                            วันที่ทำแบบสอบถาม
                        </span>
                        <span className="font-semibold text-slate-900">
                            {new Date(submission.createdAt).toLocaleDateString(
                                "th-TH",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </span>
                    </div>
                    <div>
                        <span className="block text-slate-500 mb-1">
                            Region
                        </span>
                        <span className="font-semibold text-slate-900 capitalize">
                            {submission.region}
                        </span>
                    </div>
                    {rawAnswers?.part1?.interviewerName && (
                        <div className="col-span-2 md:col-span-4 mt-2 pt-4 border-t border-slate-100">
                            <span className="text-slate-500 mr-2">
                                ผู้สัมภาษณ์:
                            </span>
                            <span className="font-semibold text-slate-900">
                                {rawAnswers.part1.interviewerName}
                            </span>
                        </div>
                    )}
                </div>
            </div>

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

                                const isActionNeeded = rec.criteria === "1-2";
                                const isWatch = rec.criteria === "3";
                                const count = dimensionCounts[group.dimension];
                                const isFirstOfDimension =
                                    !renderedDimensions[group.dimension];

                                if (isFirstOfDimension) {
                                    renderedDimensions[group.dimension] = true;
                                }

                                return (
                                    <tr
                                        key={group.id}
                                        className="hover:bg-gray-50/30 print:hover:bg-transparent"
                                    >
                                        {isFirstOfDimension && (
                                            <td
                                                className="p-4 align-top font-bold text-gray-900 bg-gray-50/50 border-r border-b border-gray-100 print:border-black print:bg-transparent"
                                                rowSpan={count}
                                            >
                                                <div className="whitespace-pre-line">
                                                    {group.dimension}
                                                </div>
                                            </td>
                                        )}
                                        <td className="p-4 align-top text-center font-medium border-r border-gray-100 text-indigo-600 print:text-black print:border-black">
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
                                                } print:text-black`}
                                            >
                                                {rec.action}
                                            </div>
                                            {/* Show extra info if available */}
                                            {rec.additionalInfo && (
                                                <div className="text-xs text-gray-500 mt-1 print:text-black">
                                                    {rec.additionalInfo
                                                        .movementLimit && (
                                                        <div>
                                                            •
                                                            มีข้อจำกัดด้านการเคลื่อนไหว
                                                        </div>
                                                    )}
                                                    {rec.additionalInfo
                                                        .tired && (
                                                        <div>
                                                            • ออกแรงแล้วเหนื่อย
                                                        </div>
                                                    )}
                                                    {rec.additionalInfo
                                                        .topic && (
                                                        <div>
                                                            • ข้อมูลเพิ่มเติม :{" "}
                                                            {
                                                                rec
                                                                    .additionalInfo
                                                                    .topic
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 align-top text-gray-800 print:text-black">
                                            {rec.relatedUnit}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
