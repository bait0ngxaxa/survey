import { RadioGroup, TextInput } from "@/components/ui/form";
import { ALCOHOL_OPTIONS, SMOKING_OPTIONS } from "@/config/sectionTwoData";
import { type SectionTwoData } from "@/lib/types";

interface LifestyleSectionProps {
    formData: SectionTwoData;
    handleChange: (
        field: keyof SectionTwoData,
        value: string | string[]
    ) => void;
}

export default function LifestyleSection({
    formData,
    handleChange,
}: LifestyleSectionProps) {
    return (
        <>
            <div className="space-y-2">
                <RadioGroup
                    name="alcohol"
                    label="17. พฤติกรรมการดื่มสุรา"
                    value={formData.alcohol}
                    options={ALCOHOL_OPTIONS}
                    onChange={(v) => handleChange("alcohol", v)}
                    layout="horizontal"
                />
                {formData.alcohol === "เลิกดื่มแล้ว" && (
                    <TextInput
                        type="number"
                        value={formData.alcoholYears}
                        onChange={(v) => handleChange("alcoholYears", v)}
                        inline
                        prefix="เลิกมาแล้ว"
                        suffix="ปี"
                    />
                )}
                {formData.alcohol === "ดื่มเป็นประจำ" && (
                    <TextInput
                        type="number"
                        value={formData.alcoholDays}
                        onChange={(v) => handleChange("alcoholDays", v)}
                        inline
                        prefix="ดื่ม"
                        suffix="วัน/สัปดาห์"
                    />
                )}
            </div>

            <div className="space-y-2">
                <RadioGroup
                    name="smoking"
                    label="18. พฤติกรรมการสูบบุหรี่"
                    value={formData.smoking}
                    options={SMOKING_OPTIONS}
                    onChange={(v) => handleChange("smoking", v)}
                    layout="horizontal"
                />
                {formData.smoking === "เลิกสูบแล้ว" && (
                    <TextInput
                        type="number"
                        value={formData.smokingYears}
                        onChange={(v) => handleChange("smokingYears", v)}
                        inline
                        prefix="เลิกมาแล้ว"
                        suffix="ปี"
                    />
                )}
                {formData.smoking === "สูบเป็นประจำ" && (
                    <TextInput
                        type="number"
                        value={formData.smokingAmount}
                        onChange={(v) => handleChange("smokingAmount", v)}
                        inline
                        prefix="สูบ"
                        suffix="มวน/วัน"
                    />
                )}
            </div>
        </>
    );
}
