import { Suspense } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
            <Suspense fallback={null}>
                <SuccessModal />
            </Suspense>
            <h1 className="text-3xl font-bold">Welcome to Survey App</h1>

            <SignedIn>
                <div className="flex flex-col gap-4">
                    <Link
                        href="/dashboard"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg text-lg"
                    >
                        เริ่มทำแบบสอบถาม
                    </Link>
                </div>
            </SignedIn>

            <SignedOut>
                <div className="flex gap-4">
                    <SignInButton forceRedirectUrl="/?loggedIn=true">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg text-lg">
                            เข้าสู่ระบบ
                        </button>
                    </SignInButton>
                    <SignUpButton forceRedirectUrl="/?loggedIn=true">
                        <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full transition-all shadow-lg border-2 border-transparent text-lg">
                            ลงทะเบียน
                        </button>
                    </SignUpButton>
                </div>
            </SignedOut>
        </div>
    );
}
