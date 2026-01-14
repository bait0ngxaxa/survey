import BackToSubmissionsButton from "@/components/BackToSubmissionsButton";
import PrintButton from "@/components/PrintButton";

export function ReportScreenHeader() {
    return (
        <div className="relative z-50 flex items-center gap-3 mb-6 print:hidden">
            <BackToSubmissionsButton />
            <PrintButton />
        </div>
    );
}
