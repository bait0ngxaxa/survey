"use client";

import { useState, useEffect, useCallback } from "react";

interface UseExitConfirmationOptions {
    enabled: boolean;

    skipConfirmation?: boolean;
}

interface UseExitConfirmationReturn {
    isModalOpen: boolean;

    closeModal: () => void;

    confirmExit: (redirectUrl?: string) => void;
}

export function useExitConfirmation({
    enabled,
    skipConfirmation = false,
}: UseExitConfirmationOptions): UseExitConfirmationReturn {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!enabled || skipConfirmation) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
            return "";
        };

        // Push a dummy state to history to intercept back button
        window.history.pushState({ exitConfirmation: true }, "");

        const handlePopState = () => {
            // User pressed back button, show confirmation modal
            setIsModalOpen(true);
            // Push state again to prevent immediate navigation
            window.history.pushState({ exitConfirmation: true }, "");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [enabled, skipConfirmation]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const confirmExit = useCallback((redirectUrl: string = "/dashboard") => {
        setIsModalOpen(false);

        window.location.href = redirectUrl;
    }, []);

    return {
        isModalOpen,
        closeModal,
        confirmExit,
    };
}

export default useExitConfirmation;
