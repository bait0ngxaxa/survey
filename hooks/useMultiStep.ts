"use client";

import { useState, useCallback } from "react";

interface UseMultiStepOptions {
    initialStep?: number;
    totalSteps: number;
    onStepChange?: (step: number) => void;
}

interface UseMultiStepReturn {
    step: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    next: () => void;
    back: () => void;
    goTo: (step: number) => void;
    reset: () => void;
}

export function useMultiStep({
    initialStep = 0,
    totalSteps,
    onStepChange,
}: UseMultiStepOptions): UseMultiStepReturn {
    const [step, setStep] = useState(initialStep);

    const isFirstStep = step === 0;
    const isLastStep = step === totalSteps - 1;

    const goTo = useCallback(
        (newStep: number) => {
            if (newStep < 0 || newStep >= totalSteps) return;
            setStep(newStep);
            onStepChange?.(newStep);
        },
        [totalSteps, onStepChange]
    );

    const next = useCallback(() => {
        if (!isLastStep) {
            const newStep = step + 1;
            setStep(newStep);
            onStepChange?.(newStep);
        }
    }, [step, isLastStep, onStepChange]);

    const back = useCallback(() => {
        if (!isFirstStep) {
            const newStep = step - 1;
            setStep(newStep);
            onStepChange?.(newStep);
        }
    }, [step, isFirstStep, onStepChange]);

    const reset = useCallback(() => {
        setStep(initialStep);
        onStepChange?.(initialStep);
    }, [initialStep, onStepChange]);

    return {
        step,
        isFirstStep,
        isLastStep,
        next,
        back,
        goTo,
        reset,
    };
}

export default useMultiStep;
