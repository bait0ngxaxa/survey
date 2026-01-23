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
        <nav className="p-4 space-y-2 grow">
            {navItems.map((item) => {
                const isActive = item.exact
                    ? pathname === item.href
                    : pathname?.startsWith(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium overflow-hidden transition-all duration-300 ${
                            isActive
                                ? "text-sky-700 shadow-[0_2px_12px_rgba(14,165,233,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)]"
                                : "text-slate-600 hover:text-sky-700"
                        }`}
                    >
                        {/* Active State Background - Dimensional Effect */}
                        {isActive && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-sky-50 opacity-100" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sky-500 rounded-r-full shadow-[2px_0_8px_rgba(14,165,233,0.4)]" />
                            </>
                        )}

                        {/* Hover Effect - Subtle Glow */}
                        {!isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-50/50 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}

                        {/* Icon Container with depth */}
                        <div
                            className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${
                                isActive
                                    ? "bg-sky-100/80 text-sky-600 shadow-inner"
                                    : "bg-white/0 group-hover:bg-white/60 group-hover:shadow-[0_2px_8px_rgba(14,165,233,0.06)] group-hover:-translate-y-0.5"
                            }`}
                        >
                            <item.icon
                                size={20}
                                className={`transition-transform duration-300 ${
                                    isActive
                                        ? "scale-110"
                                        : "group-hover:scale-110"
                                }`}
                            />
                        </div>

                        {/* Label */}
                        <span className="relative z-10  font-semibold tracking-wide">
                            {item.label}
                        </span>

                        {/* Active Indicator Chevron (Optional detail) */}
                        {isActive && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400/40 shadow-sm" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
