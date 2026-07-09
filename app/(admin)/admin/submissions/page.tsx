import { Suspense } from "react";
import {
    SubmissionsHeader,
    RegionFilter,
    SearchInput,
} from "@/components/submissions";
import { SubmissionsContent } from "@/components/submissions/SubmissionsContent";
import { SubmissionsContentSkeleton } from "@/components/submissions/SubmissionsContentSkeleton";

export default async function SubmissionsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; region?: string; search?: string }>;
}) {
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;
    const regionFilter = params?.region || "";
    const searchQuery = params?.search || "";

    return (
        <div className="space-y-6 pb-20 sm:pb-8">
            <SubmissionsHeader />

            <div className="flex flex-col md:flex-row gap-4 proms-panel p-4 rounded-2xl">
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

            <Suspense fallback={<SubmissionsContentSkeleton />}>
                <SubmissionsContent
                    currentPage={currentPage}
                    regionFilter={regionFilter}
                    searchQuery={searchQuery}
                />
            </Suspense>
        </div>
    );
}
