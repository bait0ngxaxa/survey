import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// Routes that require login
const isProtectedRoute = createRouteMatcher([
    "/admin(.*)",
    "/survey(.*)",
    "/dashboard(.*)",
]);

// // Routes that are login/signup pages (for role-based redirect)
// const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // const { userId, sessionClaims } = await auth();
    // const url = req.nextUrl;

    // // If user is logged in and accessing auth routes, redirect based on role
    // if (userId && isAuthRoute(req)) {
    //     const role = sessionClaims?.metadata?.role as string | undefined;
    //     if (role === "admin") {
    //         return NextResponse.redirect(new URL("/admin", req.url));
    //     }
    //     return NextResponse.redirect(new URL("/dashboard", req.url));
    // }

    // // After login redirect (from Clerk's forceRedirectUrl), check role and redirect admin
    // if (userId && url.pathname === "/dashboard" && url.searchParams.get("loggedIn") === "true") {
    //     const role = sessionClaims?.metadata?.role as string | undefined;
    //     if (role === "admin") {
    //         return NextResponse.redirect(new URL("/admin", req.url));
    //     }
    // }

    // Protect all routes that require login
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
