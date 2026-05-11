import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LoginSuccessModal from "@/components/LoginSuccessModal";
import SubmissionHistory from "@/components/user-dashboard/SubmissionHistory";
import { getUserSubmissions } from "@/lib/actions/survey/queries";
import {
    BackgroundEffects,
    UserDashboardHeader,
    RegionCardsGrid,
} from "@/components/user-dashboard";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const submissionsResult = await getUserSubmissions(10);
    const submissions = submissionsResult.success ? submissionsResult.data : [];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50/30 relative overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            <BackgroundEffects />

            <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
                <Suspense fallback={null}>
                    <LoginSuccessModal />
                </Suspense>

                <UserDashboardHeader />

                <RegionCardsGrid />

                {/* Submission History Section */}
                <div className="animate-in slide-in-from-bottom-10 fade-in duration-700 delay-500">
                    <SubmissionHistory submissions={submissions} />
                </div>
            </div>
        </div>
    );
}
