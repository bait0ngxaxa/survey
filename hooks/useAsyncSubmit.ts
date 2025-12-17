"use client";

import { useState, useCallback } from "react";

interface UseAsyncSubmitOptions<T> {
    onSuccess?: (result: T) => void;
    onError?: (error: Error) => void;
}

interface UseAsyncSubmitReturn<T> {
    isSubmitting: boolean;
    error: Error | null;
    execute: (asyncFn: () => Promise<T>) => Promise<T | undefined>;
    reset: () => void;
}

export function useAsyncSubmit<T = unknown>(
    options: UseAsyncSubmitOptions<T> = {}
): UseAsyncSubmitReturn<T> {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(
        async (asyncFn: () => Promise<T>): Promise<T | undefined> => {
            if (isSubmitting) return undefined;

            setIsSubmitting(true);
            setError(null);

            try {
                const result = await asyncFn();
                options.onSuccess?.(result);
                return result;
            } catch (err) {
                const error =
                    err instanceof Error ? err : new Error(String(err));
                setError(error);
                options.onError?.(error);
                return undefined;
            } finally {
                setIsSubmitting(false);
            }
        },
        [isSubmitting, options]
    );

    const reset = useCallback(() => {
        setError(null);
        setIsSubmitting(false);
    }, []);

    return {
        isSubmitting,
        error,
        execute,
        reset,
    };
}

export default useAsyncSubmit;
