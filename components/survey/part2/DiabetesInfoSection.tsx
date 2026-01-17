import { RadioGroup, TextInput } from "@/components/ui/form";
import {
    TREATMENT_TYPE_OPTIONS,
    MEDICATION_COUNT_OPTIONS,
    PAYMENT_METHOD_OPTIONS,
} from "@/config/sectionTwoData";
import { type SectionTwoData } from "@/lib/types";

interface DiabetesInfoSectionProps {
    formData: SectionTwoData;
    handleChange: (
        field: keyof SectionTwoData,
        value: string | string[]
    ) => void;
}

export default function DiabetesInfoSection({
    formData,
    handleChange,
}: DiabetesInfoSectionProps) {
    return (
        <>
            <div className="space-y-2">
                <label className="font-semibold block text-slate-900">
                    9. ระยะเวลาที่ทราบว่าเป็นเบาหวานจากการวินิจฉัยจากแพทย์
                </label>
                <div className="flex flex-wrap gap-4 items-center">
                    <TextInput
                        type="number"
                        value={formData.diabetesDuration}
                        onChange={(v) => handleChange("diabetesDuration", v)}
                        inline
                        suffix="ปี"
                    />
                    <span className="text-slate-900">
                        หรือเริ่มเป็นเบาหวานตั้งแต่อายุเท่าไร
                    </span>
                    <TextInput
                        type="number"
                        value={formData.diabetesAge}
                        onChange={(v) => handleChange("diabetesAge", v)}
                        inline
                        prefix="อายุ"
                        suffix="ปี"
                    />
                </div>
            </div>

            <RadioGroup
                name="treatmentType"
                label="10. รูปแบบการรักษา"
                value={formData.treatmentType}
                options={TREATMENT_TYPE_OPTIONS}
                onChange={(v) => handleChange("treatmentType", v)}
                hasOther
                otherValue={formData.treatmentOther}
                onOtherChange={(v) => handleChange("treatmentOther", v)}
            />

            <RadioGroup
                name="medicationCount"
                label="11. จำนวนยาที่ได้รับ"
                value={formData.medicationCount}
                options={MEDICATION_COUNT_OPTIONS}
                onChange={(v) => handleChange("medicationCount", v)}
                layout="horizontal"
            />

            <RadioGroup
                name="paymentMethod"
                label="12. ท่านจ่ายค่ารักษาพยาบาลในการรักษาโรคเบาหวานด้วยวิธีใด (สิทธิการรักษาของผู้ป่วย)"
                value={formData.paymentMethod}
                options={PAYMENT_METHOD_OPTIONS}
                onChange={(v) => handleChange("paymentMethod", v)}
                layout="grid"
                gridCols={2}
                hasOther
                otherValue={formData.paymentMethodOther}
                onOtherChange={(v) => handleChange("paymentMethodOther", v)}
            />
        </>
    );
}
