import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, FileSpreadsheet } from "lucide-react";
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
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="h-16 flex items-center justify-center border-b border-gray-200 px-6">
                    <h1 className="text-xl font-bold text-blue-600">
                        Admin Panel
                    </h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/submissions"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                        <FileSpreadsheet size={20} />
                        <span className="font-medium">Submissions</span>
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                            />
                        </svg>
                        <span className="font-medium">Users</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200 mt-auto">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <UserButton />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">
                                Admin
                            </span>
                            <span className="text-xs text-gray-500">
                                {user?.firstName} {user?.lastName}
                            </span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
        </div>
    );
}
