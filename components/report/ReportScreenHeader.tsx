import BackToSubmissionsButton from "@/components/BackToSubmissionsButton";
import PrintButton from "@/components/PrintButton";

export function ReportScreenHeader() {
    return (
        <div className="relative z-50 flex flex-col gap-3 mb-6 print:hidden sm:flex-row sm:items-center">
            <BackToSubmissionsButton />
            <PrintButton />
        </div>
    );
}
