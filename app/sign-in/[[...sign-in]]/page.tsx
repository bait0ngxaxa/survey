import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-white">
            <SignIn
                forceRedirectUrl="/dashboard?loggedIn=true"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-white shadow-2xl border-0 rounded-2xl",
                        headerTitle: "text-2xl font-bold text-blue-900",
                        headerSubtitle: "text-gray-500",
                        socialButtonsBlockButton:
                            "border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all",
                        socialButtonsBlockButtonText:
                            "text-gray-600 font-medium",
                        dividerLine: "bg-gray-200",
                        dividerText: "text-gray-400",
                        formFieldLabel: "text-gray-700 font-medium",
                        formFieldInput:
                            "border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg",
                        formButtonPrimary:
                            "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all",
                        footerActionLink:
                            "text-blue-600 hover:text-blue-800 font-medium",
                        identityPreviewEditButton:
                            "text-blue-600 hover:text-blue-800",
                        formFieldAction: "text-blue-600 hover:text-blue-800",
                    },
                    variables: {
                        colorPrimary: "#2563eb",
                        colorBackground: "#ffffff",
                        colorText: "#1e3a5f",
                        colorTextSecondary: "#64748b",
                        colorInputBackground: "#ffffff",
                        colorInputText: "#1f2937",
                        borderRadius: "0.75rem",
                        fontFamily: "inherit",
                    },
                }}
            />
        </div>
    );
}
