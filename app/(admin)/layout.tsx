import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SidebarNav from "@/components/admin/SidebarNav";
import Loading from "./admin/loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ผู้ดูแลระบบ PROMs",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    const role = user?.publicMetadata?.role;
    const adminName =
        user?.fullName ||
        user?.primaryEmailAddress?.emailAddress ||
        "ผู้ดูแลระบบ";

    if (role !== "admin") {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row proms-page-bg relative overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <aside className="relative z-20 w-full md:w-64 shrink-0 flex flex-col">
                <div className="absolute inset-0 proms-admin-shell border-r border-sky-100" />

                <div className="relative flex flex-col h-full">
                    <div className="h-16 flex items-center justify-center px-6 proms-header-gradient border-b border-sky-100">
                        <h1 className="text-xl font-bold proms-gradient-text thai-text">
                            ผู้ดูแลระบบ PROMs
                        </h1>
                    </div>

                    <SidebarNav />

                    <div className="p-4 border-t border-sky-100 bg-sky-50/40">
                        <div className="flex min-w-0 items-center gap-3 rounded-xl proms-panel px-3 py-3">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonTrigger:
                                            "rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200",
                                        avatarBox:
                                            "w-10 h-10 border border-sky-100",
                                        userButtonPopoverCard:
                                            "rounded-2xl border border-sky-100 shadow-lg",
                                        userButtonPopoverActionButton:
                                            "text-slate-700 hover:bg-sky-50",
                                    },
                                }}
                            />
                            <div className="flex min-w-0 flex-col">
                                <span className="text-sm font-bold text-slate-900 thai-text">
                                    ผู้ดูแลระบบ
                                </span>
                                <span className="truncate text-xs text-slate-600">
                                    {adminName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="relative z-10 flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
        </div>
    );
}
