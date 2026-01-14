"use client";

import { UserButton, SignedIn, useUser } from "@clerk/nextjs";

export default function Navbar() {
    const { user } = useUser();

    return (
        <nav className="relative sm:absolute top-0 right-0 w-full p-4 sm:p-6 z-50 flex justify-end bg-[linear-gradient(to_bottom,rgb(240,249,255),transparent)] sm:bg-none">
            <SignedIn>
                <div className="pointer-events-auto flex items-center gap-4 bg-white/70 backdrop-blur-xl px-2 py-2 pr-5 rounded-full shadow-sm border border-white/50 transition-all hover:bg-white/90 hover:shadow-md hover:scale-[1.02]">
                    {/* Admin Link */}
                    {user?.publicMetadata?.role === "admin" && (
                        <a
                            href="/admin"
                            className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:from-sky-400 hover:via-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105"
                        >
                            Admin Board
                        </a>
                    )}

                    <div className="flex flex-col text-right mr-2 hidden sm:block">
                        <span className="text-slate-900 font-semibold text-sm leading-none">
                            {user?.firstName}
                        </span>
                        <span className="text-slate-500 text-[10px] uppercase tracking-wider font-medium ml-2">
                            {user?.publicMetadata?.role === "admin"
                                ? "Administrator"
                                : "User"}
                        </span>
                    </div>

                    <div className="ring-2 ring-white rounded-full shadow-sm">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9",
                                },
                            }}
                        />
                    </div>
                </div>
            </SignedIn>
        </nav>
    );
}
