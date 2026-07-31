import { getSurveySubmission } from "@/lib/actions/survey/queries";
import { notFound } from "next/navigation";
import { asRawAnswers, type ReportData } from "@/lib/types";
import {
    getSubmissionNationalId,
    getSubmissionSnapshot,
} from "@/lib/utils/submissionSnapshot";
import {
    ReportNotFound,
    ReportPrintHeader,
    ReportScreenHeader,
    PatientInfoCard,
    ReportTable,
} from "@/components/report";

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
    const snapshot = getSubmissionSnapshot(submission);
    const patientNationalId = getSubmissionNationalId(submission);

    // Fallback if no report data (e.g. old submissions)
    if (!reportData) {
        return <ReportNotFound />;
    }

    const submissionDate = new Date(submission.createdAt);

    return (
        <div className="max-w-5xl mx-auto py-8 pt-20 px-4 print:p-0">
            {/* Print Header - Hidden on Screen */}
            <ReportPrintHeader
                submissionDate={submissionDate}
                respondentName={snapshot.respondentName}
                patientHN={patientNationalId}
            />

            {/* Screen Header */}
            <ReportScreenHeader />

            {/* Patient Info Card (Screen Only) */}
            <PatientInfoCard
                respondentName={snapshot.respondentName}
                patientHN={patientNationalId}
                submissionDate={submissionDate}
                region={submission.region}
                interviewerName={rawAnswers?.part1?.interviewerName}
            />

            {/* Report Table */}
            <ReportTable reportData={reportData} />
        </div>
    );
}
