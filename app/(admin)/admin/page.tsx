import { getAdminStats } from "@/lib/actions/admin";
import {
    DashboardHeader,
    TotalOverviewCard,
    RegionStatsGrid,
} from "@/components/dashboard";

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <DashboardHeader />

            <TotalOverviewCard totalCount={stats.totalSubmissions} />

            <RegionStatsGrid byRegion={stats.byRegion} />
        </div>
    );
}
