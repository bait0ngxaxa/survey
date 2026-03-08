import { SubmissionCard } from "./SubmissionCard";
import { type AdminSubmission } from "@/lib/types";

interface SubmissionCardListProps {
    submissions: AdminSubmission[];
}

export function SubmissionCardList({ submissions }: SubmissionCardListProps) {
    return (
        <div className="md:hidden grid grid-cols-1 gap-4">
            {submissions.map((item) => (
                <SubmissionCard key={item.id} submission={item} />
            ))}
        </div>
    );
}
