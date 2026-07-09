import { getAdminStats } from "@/lib/actions/admin";
import {
    DashboardHeader,
    TotalOverviewCard,
    RegionStatsGrid,
} from "@/components/dashboard";

export default async function AdminDashboard() {
    const statsResult = await getDashboardStats();

    return (
        <div className="space-y-8">
            <DashboardHeader />

            {!statsResult.success ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                    <h2 className="text-lg font-bold text-amber-950 thai-text">
                        ยังโหลดข้อมูลภาพรวมไม่ได้
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-amber-800 thai-text">
                        {statsResult.error}
                        กรุณารีเฟรชหน้าอีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ
                    </p>
                </div>
            ) : (
                <>
                    <TotalOverviewCard
                        totalCount={statsResult.data.totalSubmissions}
                    />

                    <RegionStatsGrid byRegion={statsResult.data.byRegion} />
                </>
            )}
        </div>
    );
}

async function getDashboardStats(): Promise<
    | { success: true; data: Awaited<ReturnType<typeof getAdminStats>> }
    | { success: false; error: string }
> {
    try {
        const data = await getAdminStats();
        return { success: true, data };
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
        return { success: false, error: message };
    }
}
