import { useState } from "react";

export function useSectionFourState() {
    const [currentStep, setCurrentStep] = useState(0);

    return {
        currentStep,
        setCurrentStep,
    };
}
