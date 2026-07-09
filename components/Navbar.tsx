"use client";

import { UserButton, SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getRoleLabel = (role: unknown): string =>
    role === "admin" ? "Administrator" : "User";

export default function Navbar() {
    const { isLoaded, user } = useUser();
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    const isAdmin = user?.publicMetadata?.role === "admin";
    const displayName =
        user?.fullName || user?.primaryEmailAddress?.emailAddress || "ผู้ใช้งาน";

    if (isAdminRoute) return null;

    return (
        <nav
            className="relative sm:absolute top-0 right-0 w-full p-4 sm:p-6 z-50 flex justify-end bg-[linear-gradient(to_bottom,rgb(240,249,255),transparent)] sm:bg-none"
            aria-label="เมนูบัญชีผู้ใช้"
        >
            <SignedIn>
                <div className="group pointer-events-auto flex min-w-0 items-center rounded-full border border-sky-100 bg-white/90 p-1.5 pr-1.5 shadow-sm transition-colors duration-200 hover:bg-white hover:border-sky-200 sm:p-1.5 sm:hover:pr-4">
                    <div className="flex items-center overflow-hidden max-w-md opacity-100 sm:max-w-0 sm:opacity-0 sm:group-hover:max-w-md sm:group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap">
                        {/* Admin Link */}
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="relative mr-3 inline-flex min-h-10 items-center overflow-hidden rounded-full bg-linear-to-r from-sky-500 via-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white transition-colors duration-200 hover:from-sky-400 hover:via-blue-500 hover:to-cyan-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 sm:mr-4 sm:px-5"
                            >
                                Admin Board
                            </Link>
                        )}

                        <div className="mr-4 hidden max-w-56 min-w-0 flex-col text-right sm:flex">
                            <span className="truncate text-sm font-semibold leading-none text-slate-900">
                                {isLoaded ? displayName : "กำลังโหลดบัญชี"}
                            </span>
                            <span className="mt-1 truncate text-[10px] font-medium uppercase tracking-wider text-sky-700">
                                {getRoleLabel(user?.publicMetadata?.role)}
                            </span>
                        </div>
                    </div>

                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full ring-2 ring-white">
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
                    </div>
                </div>
            </SignedIn>
        </nav>
    );
}
