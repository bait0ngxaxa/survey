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
    title: "พิมพ์รายงานทั้งหมด - ผู้ดูแลระบบ",
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
        <div className="min-h-screen proms-page-bg pt-16">
            <div className="no-print proms-header-gradient border-b border-sky-100 px-6 py-6">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-4">
                        <BackToSubmissionsButton />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-bold proms-gradient-text thai-text">
                            พิมพ์รายงานทั้งหมด
                            <span className="ml-2 text-lg font-normal text-slate-500">
                                ({validSubmissions.length} รายการ)
                            </span>
                        </h1>
                        <PrintButton label="พิมพ์ทั้งหมด" />
                    </div>
                </div>
            </div>

            <div className="no-print max-w-2xl mx-auto py-12 px-4 text-center">
                {validSubmissions.length > 0 ? (
                    <div className="proms-panel rounded-2xl p-8">
                        <div className="w-16 h-16 proms-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200/70">
                            <FileText
                                size={32}
                                className="text-white"
                                aria-hidden="true"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 thai-text">
                            พร้อมพิมพ์ {validSubmissions.length} รายการ
                        </h2>
                        <p className="text-slate-600 mb-6 thai-text">
                            กดปุ่มพิมพ์ทั้งหมดด้านบนเพื่อพิมพ์รายงานทั้งหมด
                        </p>
                        <div className="text-sm text-slate-500 thai-text">
                            แต่ละรายงานจะแยกหน้าโดยอัตโนมัติ
                        </div>
                    </div>
                ) : (
                    <div className="proms-panel rounded-2xl p-8">
                        <p className="font-bold text-amber-950 thai-text">
                            ไม่พบข้อมูลแบบสอบถามที่สามารถพิมพ์ได้
                        </p>
                        <p className="text-sm text-amber-800 mt-2 thai-text">
                            กรุณาตรวจสอบว่ามีแบบสอบถามที่มีข้อมูลรายงานสรุปแล้ว
                        </p>
                    </div>
                )}
            </div>

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
