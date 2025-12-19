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

            {/* Sidebar */}
            <aside className="relative z-20 w-full md:w-64 bg-white/70 backdrop-blur-xl border-r border-white/50 shadow-lg shadow-sky-100/20 shrink-0 flex flex-col">
                <div className="h-16 flex items-center justify-center border-b border-sky-100 px-6 bg-white/50">
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-blue-600">
                        Admin Panel
                    </h1>
                </div>
                <nav className="p-4 space-y-2 grow">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-all duration-200 font-medium group"
                    >
                        <LayoutDashboard
                            size={20}
                            className="group-hover:scale-110 transition-transform"
                        />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/submissions"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-all duration-200 font-medium group"
                    >
                        <FileSpreadsheet
                            size={20}
                            className="group-hover:scale-110 transition-transform"
                        />
                        <span>Submissions</span>
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-all duration-200 font-medium group"
                    >
                        <Users
                            size={20}
                            className="group-hover:scale-110 transition-transform"
                        />
                        <span>Users</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-sky-100 bg-white/50">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox:
                                        "w-9 h-9 border-2 border-white shadow-sm ring-2 ring-sky-100",
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
            </aside>

            {/* Main Content */}
            <main className="relative z-10 flex-1 p-6 md:p-8 overflow-y-auto">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
        </div>
    );
}
