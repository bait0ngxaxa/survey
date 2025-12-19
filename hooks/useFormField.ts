"use client";

import { useCallback } from "react";

interface FieldProps<T, K extends keyof T> {
    value: T[K];
    onChange: (value: T[K]) => void;
}

interface UseFormFieldReturn<T extends object> {
    handleChange: <K extends keyof T>(field: K, value: T[K]) => void;
    getFieldProps: <K extends keyof T>(field: K) => FieldProps<T, K>;
}

export function useFormField<T extends object>(
    formData: T,
    onChange: (data: T) => void
): UseFormFieldReturn<T> {
    const handleChange = useCallback(
        <K extends keyof T>(field: K, value: T[K]) => {
            onChange({ ...formData, [field]: value });
        },
        [formData, onChange]
    );

    const getFieldProps = useCallback(
        <K extends keyof T>(field: K): FieldProps<T, K> => ({
            value: formData[field],
            onChange: (value: T[K]) => handleChange(field, value),
        }),
        [formData, handleChange]
    );

    return { handleChange, getFieldProps };
}

export default useFormField;
