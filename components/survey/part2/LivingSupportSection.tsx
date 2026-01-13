import { RadioGroup, TextInput } from "@/components/ui/form";
import {
    LIVING_ARRANGEMENT_OPTIONS,
    FAMILY_SUPPORT_OPTIONS,
    WORK_SUPPORT_OPTIONS,
} from "@/config/sectionTwoData";
import { SectionTwoData } from "@/lib/types";

interface LivingSupportSectionProps {
    formData: SectionTwoData;
    handleChange: (
        field: keyof SectionTwoData,
        value: string | string[]
    ) => void;
}

export default function LivingSupportSection({
    formData,
    handleChange,
}: LivingSupportSectionProps) {
    return (
        <>
            <div className="space-y-2">
                <RadioGroup
                    name="livingArrangement"
                    label="13. ท่านอาศัยอยู่กับใคร"
                    value={formData.livingArrangement}
                    options={LIVING_ARRANGEMENT_OPTIONS}
                    onChange={(v) => handleChange("livingArrangement", v)}
                    hasOther
                    otherValue={formData.livingArrangementOther}
                    onOtherChange={(v) =>
                        handleChange("livingArrangementOther", v)
                    }
                />
                {(formData.livingArrangement === "อยู่กับคู่สมรสและบุตร/หลาน" ||
                    formData.livingArrangement === "อยู่กับญาติ/เพื่อน") && (
                    <div className="ml-6">
                        <TextInput
                            type="number"
                            value={formData.livingMembers}
                            onChange={(v) => handleChange("livingMembers", v)}
                            inline
                            prefix="จำนวน"
                            suffix="คน"
                        />
                    </div>
                )}
            </div>

            <RadioGroup
                name="familySupport"
                label="14. คนในครอบครัว/ญาติ/เพื่อนมีการดูแลเรื่องอาหารการกิน คอยระวังเรื่องอาหาร/ทานยา ให้ท่านหรือไม่"
                value={formData.familySupport}
                options={FAMILY_SUPPORT_OPTIONS}
                onChange={(v) => handleChange("familySupport", v)}
                layout="horizontal"
            />

            <RadioGroup
                name="workSupport"
                label="15. กรณีที่ท่านยังทำงานอยู่ เพื่อนร่วมงานมีการดูแลเรื่องอาหาร/ทานยา เช่น คอยเตือนเมื่อได้เวลาทานยา หรือเตือนเมื่อจะกินอาหารที่มีความเสี่ยงให้ท่านหรือไม่"
                value={formData.workSupport}
                options={WORK_SUPPORT_OPTIONS}
                onChange={(v) => handleChange("workSupport", v)}
                layout="horizontal"
            />

            <div className="space-y-4">
                <label className="font-semibold block text-slate-900">
                    16.
                    อาหาร/ของว่าง/เครื่องดื่มที่ท่านรับประทานบ่อยที่สุดในช่วง 1
                    เดือนที่ผ่านมา
                </label>
                <TextInput
                    label="อาหาร 3 อย่างที่รับประทานบ่อยที่สุด"
                    value={formData.dietFood}
                    onChange={(v) => handleChange("dietFood", v)}
                    placeholder="เช่น ข้าวผัด, ก๋วยเตี๋ยว, ต้มยำ"
                />
                <TextInput
                    label="ของว่าง 3 อย่างที่รับประทานบ่อยที่สุด"
                    value={formData.dietSnack}
                    onChange={(v) => handleChange("dietSnack", v)}
                    placeholder="เช่น ขนมปัง, ผลไม้, ขนมหวาน"
                />
                <TextInput
                    label="เครื่องดื่ม 3 อย่างที่ดื่มบ่อยที่สุด"
                    value={formData.dietDrink}
                    onChange={(v) => handleChange("dietDrink", v)}
                    placeholder="เช่น น้ำเปล่า, กาแฟ, ชา"
                />
            </div>
        </>
    );
}
