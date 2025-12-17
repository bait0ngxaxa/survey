"use client";

import { useState, useCallback } from "react";

interface UseAlertReturn {
    isOpen: boolean;
    message: string;
    showAlert: (message: string) => void;
    closeAlert: () => void;
}

export function useAlert(): UseAlertReturn {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showAlert = useCallback((msg: string) => {
        setMessage(msg);
        setIsOpen(true);
    }, []);

    const closeAlert = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        message,
        showAlert,
        closeAlert,
    };
}

export default useAlert;
