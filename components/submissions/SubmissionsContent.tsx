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
    const result = await getSubmissionResult({
        currentPage,
        regionFilter,
        searchQuery,
    });

    if (!result.success) {
        return (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <h2 className="text-lg font-bold text-amber-950 thai-text">
                    ยังโหลดรายการแบบสอบถามไม่ได้
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-amber-800 thai-text">
                    {result.error}
                    กรุณารีเฟรชหน้าอีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ
                </p>
            </div>
        );
    }

    const { submissions, totalPages } = result.data;

    return (
        <>
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/admin/submissions"
                searchParams={{
                    region: regionFilter,
                    search: searchQuery,
                }}
            />

            <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-2 md:static md:flex-row md:justify-center md:gap-3 md:pt-4">
                <PrintAllButton />
                <ExportButton regionFilter={regionFilter} />
            </div>
        </>
    );
}

async function getSubmissionResult({
    currentPage,
    regionFilter,
    searchQuery,
}: SubmissionsContentProps): Promise<
    | {
          success: true;
          data: Awaited<ReturnType<typeof getSubmissions>>;
      }
    | { success: false; error: string }
> {
    try {
        const data = await getSubmissions({
            page: currentPage,
            pageSize: DEFAULT_PAGE_SIZE,
            regionFilter,
            searchQuery,
        });

        if (data.error) {
            return { success: false, error: data.error };
        }

        return { success: true, data };
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
        return { success: false, error: message };
    }
}
