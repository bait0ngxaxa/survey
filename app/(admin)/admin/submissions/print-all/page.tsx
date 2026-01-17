import { getSubmissions } from "@/lib/actions/admin";
import { getSurveySubmission } from "@/lib/actions/survey/queries";
import { redirect } from "next/navigation";
import { asRawAnswers, type ReportData } from "@/lib/types";
import { ReportPrintHeader, ReportTable } from "@/components/report";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import PrintButton from "@/components/PrintButton";
import BackToSubmissionsButton from "@/components/BackToSubmissionsButton";

export const metadata = {
    title: "Print All Reports - Admin",
};

export default async function PrintAllReportsPage() {
    // Check admin access
    const user = await currentUser();
    const role = user?.publicMetadata?.role;
    if (role !== "admin") {
        redirect("/");
    }

    // Fetch all submissions using admin action (same as submissions page)
    const { submissions } = await getSubmissions({
        page: 1,
        pageSize: 500,
    });

    // Fetch full data for each submission
    const submissionsWithData = await Promise.all(
        submissions.map(async (submission) => {
            const fullData = await getSurveySubmission(submission.id);
            if (!fullData.success || !fullData.data) return null;

            const rawAnswers = asRawAnswers(fullData.data.rawAnswers);
            const reportData: ReportData | undefined = rawAnswers?.reportData;

            if (!reportData) return null;

            return {
                id: submission.id,
                createdAt: new Date(submission.createdAt),
                patient: fullData.data.patient,
                reportData,
                rawAnswers,
            };
        })
    );

    // Filter out null submissions with proper typing
    const validSubmissions = submissionsWithData.filter(
        (s): s is NonNullable<typeof s> => s !== null
    );

    return (
        <div className="min-h-screen bg-white pt-16">
            {/* Screen-only header - with spacing for navbar */}
            <div className="no-print bg-gradient-to-r from-slate-50 to-sky-50/30 border-b border-slate-200 px-6 py-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back link */}
                    <div className="mb-4">
                        <BackToSubmissionsButton />
                    </div>

                    {/* Title and Print button */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Print All Reports
                            <span className="ml-2 text-lg font-normal text-slate-500">
                                ({validSubmissions.length} รายการ)
                            </span>
                        </h1>
                        <PrintButton label="Print All" />
                    </div>
                </div>
            </div>

            {/* Screen-only summary (not shown when printing) */}
            <div className="no-print max-w-2xl mx-auto py-12 px-4 text-center">
                {validSubmissions.length > 0 ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText size={32} className="text-sky-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            พร้อม Print {validSubmissions.length} รายการ
                        </h2>
                        <p className="text-slate-500 mb-6">
                            กดปุ่ม Print All ด้านบนเพื่อ print reports ทั้งหมด
                        </p>
                        <div className="text-sm text-slate-400">
                            แต่ละ report จะแยกหน้าโดยอัตโนมัติ
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <p className="text-slate-500">
                            ไม่พบข้อมูล submissions ที่สามารถ print ได้
                        </p>
                        <p className="text-sm text-slate-400 mt-2">
                            (ตรวจสอบให้แน่ใจว่ามี submissions ที่มี reportData)
                        </p>
                    </div>
                )}
            </div>

            {/* Print-only reports (hidden on screen, shown when printing) */}
            <div className="hidden print:block">
                {validSubmissions.map((submission, index) => (
                    <div
                        key={submission.id}
                        className={`${
                            index < validSubmissions.length - 1
                                ? "page-break-after"
                                : ""
                        }`}
                    >
                        <ReportPrintHeader
                            submissionDate={submission.createdAt}
                            patientFirstName={submission.patient?.firstName}
                            patientLastName={submission.patient?.lastName}
                            patientHN={submission.patient?.nationalId}
                        />
                        <ReportTable reportData={submission.reportData} />
                    </div>
                ))}
            </div>
        </div>
    );
}
