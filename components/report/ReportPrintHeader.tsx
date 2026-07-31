import { formatDate } from "@/lib/utils/formatDate";

interface ReportPrintHeaderProps {
    submissionDate: Date;
    respondentName?: string | null;
    patientHN?: string | null;
}

export function ReportPrintHeader({
    submissionDate,
    respondentName,
    patientHN,
}: ReportPrintHeaderProps) {
    return (
        <div className="hidden print:block mb-6 text-center">
            <h1 className="text-2xl font-bold">
                แบบรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2
            </h1>
            <div className="mt-2 text-sm text-gray-600 flex flex-wrap justify-center gap-6">
                <span>วันที่: {formatDate(submissionDate)}</span>
                <span>
                    ชื่อ-นามสกุล: {respondentName || "-"}
                </span>
                <span>HN: {patientHN || "-"}</span>
            </div>
        </div>
    );
}
