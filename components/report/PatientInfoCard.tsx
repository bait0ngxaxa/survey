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
                        {patientFirstName} {patientLastName}
                    </span>
                </div>
                <div>
                    <span className="block text-slate-500 mb-1">HN / ID</span>
                    <span className="font-semibold text-slate-900">
                        {patientHN || "-"}
                    </span>
                </div>
                <div>
                    <span className="block text-slate-500 mb-1">
                        วันที่ทำแบบสอบถาม
                    </span>
                    <span className="font-semibold text-slate-900">
                        {submissionDate.toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
                <div>
                    <span className="block text-slate-500 mb-1">Region</span>
                    <span className="font-semibold text-slate-900 capitalize">
                        {region}
                    </span>
                </div>
                {interviewerName && (
                    <div className="col-span-2 md:col-span-4 mt-2 pt-4 border-t border-slate-100">
                        <span className="text-slate-500 mr-2">
                            ผู้สัมภาษณ์:
                        </span>
                        <span className="font-semibold text-slate-900">
                            {interviewerName}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
