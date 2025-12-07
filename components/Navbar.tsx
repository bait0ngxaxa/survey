"use client";

import { UserButton, SignedIn, useUser } from "@clerk/nextjs";

export default function Navbar() {
    const { user } = useUser();

    return (
        <nav className="absolute top-0 right-0 p-4 z-50">
            <SignedIn>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                    <span className="text-gray-700 font-medium text-sm">
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
