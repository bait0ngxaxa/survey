"use client";

import { UserButton, SignedIn } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav className="absolute top-0 right-0 p-4 z-50">
            <SignedIn>
                <UserButton />
            </SignedIn>
        </nav>
    );
}
