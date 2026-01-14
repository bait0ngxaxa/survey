import { getSubmissions } from "@/lib/actions/admin";
import { Suspense } from "react";
import {
    SubmissionsHeader,
    RegionFilter,
    EmptyState,
    SubmissionsTable,
    SubmissionCardList,
    Pagination,
    ExportButton,
    PrintAllButton,
    SearchInput,
} from "@/components/submissions";

export default async function SubmissionsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; region?: string; search?: string }>;
}) {
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;
    const regionFilter = params?.region || "";
    const searchQuery = params?.search || "";

    const { submissions, totalPages } = await getSubmissions({
        page: currentPage,
        pageSize: 10,
        regionFilter,
        searchQuery,
    });

    return (
        <div className="space-y-6 pb-20 sm:pb-8">
            {/* Header Section */}
            <SubmissionsHeader />

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="w-full md:w-auto md:min-w-[300px]">
                    <Suspense
                        fallback={
                            <div className="w-full h-10 bg-slate-100 rounded-lg animate-pulse" />
                        }
                    >
                        <SearchInput />
                    </Suspense>
                </div>
                <RegionFilter
                    currentRegion={regionFilter}
                    searchQuery={searchQuery}
                />
            </div>

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
                regionFilter={regionFilter}
                searchQuery={searchQuery}
            />

            {/* Action Buttons - Stacked on mobile, Row on desktop */}
            <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-2 md:static md:flex-row md:justify-center md:gap-3 md:pt-4">
                <div className="shadow-lg md:shadow-none rounded-xl overflow-hidden">
                    <PrintAllButton />
                </div>
                <div className="shadow-lg md:shadow-none rounded-xl overflow-hidden">
                    <ExportButton regionFilter={regionFilter} />
                </div>
            </div>
        </div>
    );
}
