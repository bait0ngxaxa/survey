import { SubmissionCard } from "./SubmissionCard";

interface Submission {
    id: string;
    createdAt: Date;
    region: string;
    patient?: {
        firstName?: string | null;
        lastName?: string | null;
        nationalId?: string | null;
    } | null;
    interviewer?: string | null;
}

interface SubmissionCardListProps {
    submissions: Submission[];
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
