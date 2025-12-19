"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import AlertModal from "./AlertModal";

export default function LoginSuccessModal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

    const shouldShow = searchParams.get("loggedIn") === "true";

    const handleClose = useCallback(() => {
        if (autoCloseTimerRef.current) {
            clearTimeout(autoCloseTimerRef.current);
            autoCloseTimerRef.current = null;
        }

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("loggedIn");
        const newUrl = newParams.toString()
            ? `${pathname}?${newParams.toString()}`
            : pathname;
        router.replace(newUrl);
    }, [searchParams, router, pathname]);

    useEffect(() => {
        if (!shouldShow) return;

        autoCloseTimerRef.current = setTimeout(handleClose, 3000);

        return () => {
            if (autoCloseTimerRef.current) {
                clearTimeout(autoCloseTimerRef.current);
            }
        };
    }, [shouldShow, handleClose]);

    return (
        <AlertModal
            isOpen={shouldShow}
            onClose={handleClose}
            title="เข้าสู่ระบบสำเร็จ"
            message="ยินดีต้อนรับเข้าสู่ระบบ"
            variant="success"
        />
    );
}
