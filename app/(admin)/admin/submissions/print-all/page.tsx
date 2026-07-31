import { getAllSubmissionsForAdmin } from "@/lib/actions/admin";
import { redirect } from "next/navigation";
import { asRawAnswers } from "@/lib/types";
import { hasCompleteReportData } from "@/lib/utils/reportGenerator";
import {
    getSubmissionNationalId,
    getSubmissionSnapshot,
} from "@/lib/utils/submissionSnapshot";
import { ReportPrintHeader, ReportTable } from "@/components/report";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import PrintButton from "@/components/PrintButton";
import BackToSubmissionsButton from "@/components/BackToSubmissionsButton";

export const metadata = {
    title: "พิมพ์รายงานทั้งหมด - ผู้ดูแลระบบ",
};

function formatCount(count: number): string {
    return count.toLocaleString("th-TH");
}

export default async function PrintAllReportsPage() {
    // Check admin access
    const user = await currentUser();
    const role = user?.publicMetadata?.role;
    if (role !== "admin") {
        redirect("/");
    }

    const result = await getAllSubmissionsForAdmin();
    if (!result.success) {
        return (
            <div className="min-h-screen proms-page-bg pt-16">
                <div className="no-print proms-header-gradient border-b border-sky-100 px-6 py-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-4">
                            <BackToSubmissionsButton />
                        </div>
                        <div
                            className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-950"
                            role="alert"
                        >
                            <h1 className="text-lg font-bold thai-text">
                                ไม่สามารถเตรียมรายงานสำหรับพิมพ์ได้
                            </h1>
                            <p className="mt-1 text-sm thai-text">
                                {result.error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { data: submissions, total } = result;

    const submissionsWithData = submissions.map((submission) => {
        const rawAnswers = asRawAnswers(submission.rawAnswers);
        const reportData = rawAnswers?.reportData;

        if (!hasCompleteReportData(reportData)) return null;

        const snapshot = getSubmissionSnapshot(submission);

        return {
            id: submission.id,
            createdAt: new Date(submission.createdAt),
            respondentName: snapshot.respondentName,
            patientHN: getSubmissionNationalId(submission),
            reportData,
            rawAnswers,
        };
    });

    // Filter out null submissions with proper typing
    const validSubmissions = submissionsWithData.filter(
        (s): s is NonNullable<typeof s> => s !== null
    );
    const incompleteReportCount = submissions.length - validSubmissions.length;
    const notFetchedCount = Math.max(total - submissions.length, 0);
    const notPrintedCount = incompleteReportCount + notFetchedCount;
    const hasUnprintedSubmissions = notPrintedCount > 0;

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
                                ({formatCount(validSubmissions.length)}
                                {hasUnprintedSubmissions
                                    ? " จาก " + formatCount(total)
                                    : ""} รายการ)
                            </span>
                        </h1>
                        <PrintButton
                            label={
                                hasUnprintedSubmissions
                                    ? "พิมพ์รายการที่พร้อม"
                                    : "พิมพ์ทั้งหมด"
                            }
                        />
                    </div>
                </div>
            </div>

            {hasUnprintedSubmissions && (
                <div className="no-print mx-auto max-w-5xl px-4 pt-4 sm:px-6">
                    <div
                        className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950"
                        role="status"
                    >
                        <p className="font-semibold thai-text">
                            พิมพ์ได้ {formatCount(validSubmissions.length)} จากทั้งหมด{" "}
                            {formatCount(total)} รายการ
                        </p>
                        <p className="mt-1 text-sm leading-relaxed thai-text">
                            ไม่ได้พิมพ์ {formatCount(notPrintedCount)} รายการ
                            {incompleteReportCount > 0
                                ? " เนื่องจากไม่มีข้อมูลรายงานสรุปครบถ้วน " +
                                  formatCount(incompleteReportCount) +
                                  " รายการ"
                                : ""}
                            {notFetchedCount > 0
                                ? " และยังดึงข้อมูลมาไม่ครบ " +
                                  formatCount(notFetchedCount) +
                                  " รายการ"
                                : ""}{" "}
                            กรุณาตรวจสอบข้อมูลก่อนพิมพ์
                        </p>
                    </div>
                </div>
            )}

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
                            {hasUnprintedSubmissions
                                ? "กดปุ่มด้านบนเพื่อพิมพ์เฉพาะรายการที่มีข้อมูลรายงานครบถ้วน"
                                : "กดปุ่มพิมพ์ทั้งหมดด้านบนเพื่อพิมพ์รายงานทั้งหมด"}
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
                            respondentName={submission.respondentName}
                            patientHN={submission.patientHN}
                        />
                        <ReportTable reportData={submission.reportData} />
                    </div>
                ))}
            </div>
        </div>
    );
}
