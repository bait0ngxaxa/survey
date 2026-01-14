import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, FileSpreadsheet, Users } from "lucide-react";
import { Suspense } from "react";
import Loading from "./admin/loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel PROMs",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    const role = user?.publicMetadata?.role;

    if (role !== "admin") {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white relative overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            {/* Background Elements - Consistent with Homepage */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[0%] w-[1000px] h-[1000px] bg-sky-50/60 rounded-full blur-3xl opacity-70" />
                <div className="absolute bottom-[-10%] right-[0%] w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl opacity-60" />
            </div>

            {/* Sidebar with Enhanced Depth */}
            <aside className="relative z-20 w-full md:w-64 shrink-0 flex flex-col">
                {/* Sidebar outer glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white/90 to-slate-50/80 border-r border-slate-200/60 shadow-[4px_0_24px_rgba(14,165,233,0.08),1px_0_8px_rgba(0,0,0,0.03)]" />

                {/* Sidebar content container */}
                <div className="relative flex flex-col h-full">
                    {/* Header with inner shadow effect */}
                    <div className="h-16 flex items-center justify-center px-6 bg-gradient-to-r from-white/80 via-sky-50/40 to-white/80 border-b border-slate-200/60 shadow-[inset_0_-8px_16px_rgba(14,165,233,0.03)]">
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-600 via-blue-600 to-sky-700 drop-shadow-sm">
                            Admin Panel
                        </h1>
                    </div>

                    {/* Navigation with depth */}
                    <nav className="p-4 space-y-1.5 grow bg-gradient-to-b from-transparent via-white/30 to-transparent">
                        <Link
                            href="/admin"
                            className="group relative flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl font-medium overflow-hidden hover:text-sky-700 transition-colors duration-200"
                        >
                            {/* Hover background with depth */}
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-100/80 via-sky-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl shadow-[inset_0_1px_2px_rgba(14,165,233,0.1)]" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_2px_8px_rgba(14,165,233,0.12)] rounded-xl" />
                            <LayoutDashboard
                                size={20}
                                className="relative z-10 group-hover:text-sky-600 transition-colors"
                            />
                            <span className="relative z-10">Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/submissions"
                            className="group relative flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl font-medium overflow-hidden hover:text-sky-700 transition-colors duration-200"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-100/80 via-sky-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl shadow-[inset_0_1px_2px_rgba(14,165,233,0.1)]" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_2px_8px_rgba(14,165,233,0.12)] rounded-xl" />
                            <FileSpreadsheet
                                size={20}
                                className="relative z-10 group-hover:text-sky-600 transition-colors"
                            />
                            <span className="relative z-10">Submissions</span>
                        </Link>
                        <Link
                            href="/admin/users"
                            className="group relative flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl font-medium overflow-hidden hover:text-sky-700 transition-colors duration-200"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-100/80 via-sky-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl shadow-[inset_0_1px_2px_rgba(14,165,233,0.1)]" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_2px_8px_rgba(14,165,233,0.12)] rounded-xl" />
                            <Users
                                size={20}
                                className="relative z-10 group-hover:text-sky-600 transition-colors"
                            />
                            <span className="relative z-10">Users</span>
                        </Link>
                    </nav>

                    {/* User section with elevated card effect */}
                    <div className="p-4 border-t border-slate-200/60 bg-gradient-to-t from-slate-50/80 via-white/60 to-transparent">
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/80 rounded-xl border border-slate-100/80 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_1px_4px_rgba(14,165,233,0.06)]">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox:
                                            "w-10 h-10 border-2 border-white shadow-md ring-2 ring-sky-100/80",
                                    },
                                }}
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-800">
                                    Admin
                                </span>
                                <span className="text-xs text-slate-500">
                                    {user?.firstName} {user?.lastName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="relative z-10 flex-1 p-6 md:p-8 overflow-y-auto">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
        </div>
    );
}
