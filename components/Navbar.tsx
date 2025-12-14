"use client";

import { UserButton, SignedIn, useUser } from "@clerk/nextjs";

export default function Navbar() {
    const { user } = useUser();

    return (
        <nav className="absolute top-0 right-0 p-4 z-50">
            <SignedIn>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-1 py-1 pr-4 rounded-full shadow-sm border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                    {/* Admin Link */}
                    {user?.publicMetadata?.role === "admin" && (
                        <a
                            href="/admin"
                            className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors mr-2"
                        >
                            Admin
                        </a>
                    )}

                    <span className="text-gray-700 font-medium text-sm pl-2">
                        {user?.fullName}
                    </span>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8",
                            },
                        }}
                    />
                </div>
            </SignedIn>
        </nav>
    );
}
