import { auth, currentUser } from "@clerk/nextjs/server";
import { ERROR_UNAUTHORIZED } from "@/lib/constants/errors";

export type AuthorizationResult =
    | { authorized: true; userId: string }
    | { authorized: false; error: typeof ERROR_UNAUTHORIZED };

export async function requireAuthenticatedUser(): Promise<AuthorizationResult> {
    const { userId } = await auth();

    if (!userId) {
        return { authorized: false, error: ERROR_UNAUTHORIZED };
    }

    return { authorized: true, userId };
}

export async function requireAdminUser(): Promise<AuthorizationResult> {
    const user = await currentUser();

    if (!user || user.publicMetadata?.role !== "admin") {
        return { authorized: false, error: ERROR_UNAUTHORIZED };
    }

    return { authorized: true, userId: user.id };
}
