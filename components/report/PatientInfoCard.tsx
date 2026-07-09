import { formatDateFull } from "@/lib/utils/formatDate";

interface PatientInfoCardProps {
    patientFirstName?: string | null;
    patientLastName?: string | null;
    patientHN?: string | null;
    submissionDate: Date;
    region: string;
    interviewerName?: string | null;
}

export function PatientInfoCard({
    patientFirstName,
    patientLastName,
    patientHN,
    submissionDate,
    region,
    interviewerName,
}: PatientInfoCardProps) {
    return (
        <div className="proms-panel rounded-2xl p-6 mb-6 print:hidden">
            <h2 className="text-lg font-bold text-slate-900 mb-4 thai-text">
                ข้อมูลแบบสอบถาม
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="min-w-0">
                    <span className="block text-slate-500 mb-1">
                        ชื่อผู้ให้ข้อมูล
                    </span>
                    <span className="font-semibold text-slate-900 thai-text break-words">
                        {patientFirstName} {patientLastName}
                    </span>
                </div>
                <div className="min-w-0">
                    <span className="block text-slate-500 mb-1">HN / ID</span>
                    <span className="font-semibold text-slate-900 break-all">
                        {patientHN || "-"}
                    </span>
                </div>
                <div className="min-w-0">
                    <span className="block text-slate-500 mb-1">
                        วันที่ทำแบบสอบถาม
                    </span>
                    <span className="font-semibold text-slate-900 thai-text break-words">
                        {formatDateFull(submissionDate)}
                    </span>
                </div>
                <div className="min-w-0">
                    <span className="block text-slate-500 mb-1">ภูมิภาค</span>
                    <span className="font-semibold text-slate-900 break-words">
                        {region}
                    </span>
                </div>
                {interviewerName && (
                    <div className="sm:col-span-2 md:col-span-4 mt-2 pt-4 border-t border-slate-100">
                        <span className="text-slate-500 mr-2">
                            ผู้สัมภาษณ์:
                        </span>
                        <span className="font-semibold text-slate-900 thai-text break-words">
                            {interviewerName}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
