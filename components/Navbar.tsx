"use client";

import { UserButton, SignedIn, useUser } from "@clerk/nextjs";

export default function Navbar() {
    const { user } = useUser();

    return (
        <nav className="relative sm:absolute top-0 right-0 w-full p-4 sm:p-6 z-50 flex justify-end bg-[linear-gradient(to_bottom,rgb(240,249,255),transparent)] sm:bg-none">
            <SignedIn>
                <div className="group pointer-events-auto flex items-center bg-white/70 backdrop-blur-xl p-1.5 rounded-full shadow-sm border border-white/50 transition-all duration-500 ease-in-out hover:bg-white/90 hover:shadow-md pl-4 pr-1.5 sm:p-1.5 sm:group-hover:pl-5 sm:group-hover:pr-6 sm:group-hover:py-2">
                    <div className="flex items-center overflow-hidden max-w-md opacity-100 sm:max-w-0 sm:opacity-0 sm:group-hover:max-w-md sm:group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap">
                        {/* Admin Link */}
                        {user?.publicMetadata?.role === "admin" && (
                            <a
                                href="/admin"
                                className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white text-[10px] sm:text-xs font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full hover:from-sky-400 hover:via-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 mr-3 sm:mr-5"
                            >
                                Admin Board
                            </a>
                        )}

                        <div className="flex flex-col text-right mr-5 hidden sm:flex">
                            <span className="text-slate-900 font-semibold text-sm leading-none">
                                {user?.fullName}
                            </span>
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider font-medium mt-1">
                                {user?.publicMetadata?.role === "admin"
                                    ? "Administrator"
                                    : "User"}
                            </span>
                        </div>
                    </div>

                    <div className="ring-2 ring-white rounded-full shadow-sm flex-shrink-0">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 sm:w-10 sm:h-10",
                                },
                            }}
                        />
                    </div>
                </div>
            </SignedIn>
        </nav>
    );
}
