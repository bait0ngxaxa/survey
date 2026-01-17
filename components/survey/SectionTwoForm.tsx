"use client";

import AlertModal from "@/components/AlertModal";
import { useAlert, useFormField } from "@/hooks";
import { FormSection, FormNavigation } from "@/components/ui/form";
import { validateSectionTwo } from "@/lib/validation";
import { type SectionTwoData } from "@/lib/types";
import {
    DemographicsSection,
    DiabetesInfoSection,
    LivingSupportSection,
    LifestyleSection,
    HealthConditionsSection,
} from "@/components/survey";

interface SectionTwoFormProps {
    formData: SectionTwoData;
    onChange: (data: SectionTwoData) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function SectionTwoForm({
    formData,
    onChange,
    onNext,
    onBack,
}: SectionTwoFormProps) {
    const {
        isOpen: isAlertOpen,
        message: alertMessage,
        showAlert,
        closeAlert,
    } = useAlert();
    const { handleChange } = useFormField(formData, onChange);

    const handleScreeningChange = (field: string, value: string): void => {
        onChange({
            ...formData,
            screenings: { ...formData.screenings, [field]: value },
        });
    };

    const handleNext = (): void => {
        const validation = validateSectionTwo(formData);
        if (!validation.isValid) {
            showAlert(validation.errors[0]);
            return;
        }
        onNext();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 relative z-10">
            <AlertModal
                isOpen={isAlertOpen}
                onClose={closeAlert}
                message={alertMessage}
            />

            <FormSection
                title="ตอนที่ 1 ข้อมูลทั่วไป (ส่วนที่ 1)"
                description="ตามความเป็นจริงเกี่ยวกับตัวของผู้ตอบแบบสอบถาม"
            >
                <DemographicsSection
                    formData={formData}
                    handleChange={handleChange}
                />
                <DiabetesInfoSection
                    formData={formData}
                    handleChange={handleChange}
                />
                <LivingSupportSection
                    formData={formData}
                    handleChange={handleChange}
                />
                <LifestyleSection
                    formData={formData}
                    handleChange={handleChange}
                />
                <HealthConditionsSection
                    formData={formData}
                    handleChange={handleChange}
                    handleScreeningChange={handleScreeningChange}
                />

                <FormNavigation
                    onBack={onBack}
                    onNext={handleNext}
                    showBack={true}
                />
            </FormSection>
        </div>
    );
}
