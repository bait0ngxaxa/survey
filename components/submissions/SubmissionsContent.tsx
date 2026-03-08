import { getSubmissions } from "@/lib/actions/admin";
import {
    EmptyState,
    SubmissionsTable,
    SubmissionCardList,
    ExportButton,
    PrintAllButton,
} from "@/components/submissions";
import { Pagination } from "@/components/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants/submissionsConstants";

interface SubmissionsContentProps {
    currentPage: number;
    regionFilter: string;
    searchQuery: string;
}

/**
 * Async server component that fetches and renders submission data.
 * Designed to be wrapped in a Suspense boundary so the parent page
 * can render Header/Filters immediately while this streams in.
 */
export async function SubmissionsContent({
    currentPage,
    regionFilter,
    searchQuery,
}: SubmissionsContentProps) {
    const { submissions, totalPages } = await getSubmissions({
        page: currentPage,
        pageSize: DEFAULT_PAGE_SIZE,
        regionFilter,
        searchQuery,
    });

    return (
        <>
            {/* Content Section */}
            {submissions.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <SubmissionsTable
                        submissions={submissions}
                        currentPage={currentPage}
                    />
                    <SubmissionCardList submissions={submissions} />
                </>
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/admin/submissions"
                searchParams={{
                    region: regionFilter,
                    search: searchQuery,
                }}
            />

            {/* Action Buttons */}
            <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-2 md:static md:flex-row md:justify-center md:gap-3 md:pt-4">
                <div className="shadow-lg md:shadow-none rounded-xl overflow-hidden">
                    <PrintAllButton />
                </div>
                <div className="shadow-lg md:shadow-none rounded-xl overflow-hidden">
                    <ExportButton regionFilter={regionFilter} />
                </div>
            </div>
        </>
    );
}
