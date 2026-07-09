"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileSpreadsheet, Users } from "lucide-react";

const navItems = [
    {
        href: "/admin",
        label: "ภาพรวม",
        icon: LayoutDashboard,
        exact: true,
    },
    {
        href: "/admin/submissions",
        label: "แบบสอบถาม",
        icon: FileSpreadsheet,
    },
    {
        href: "/admin/users",
        label: "ผู้ใช้งาน",
        icon: Users,
    },
];

export default function SidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="p-4 space-y-2 grow" aria-label="เมนูผู้ดูแลระบบ">
            {navItems.map((item) => {
                const isActive = item.exact
                    ? pathname === item.href
                    : pathname?.startsWith(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${
                            isActive
                                ? "proms-primary-gradient shadow-md shadow-sky-200/60"
                                : "text-slate-700 hover:bg-slate-50 hover:text-sky-800"
                        }`}
                    >
                        <div
                            className={`p-2 rounded-xl transition-colors duration-200 ${
                                isActive
                                    ? "bg-white/20 text-white"
                                    : "text-slate-500 group-hover:bg-white"
                            }`}
                        >
                            <item.icon size={20} aria-hidden="true" />
                        </div>

                        <span className="font-semibold thai-text">
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
