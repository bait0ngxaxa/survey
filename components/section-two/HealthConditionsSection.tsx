import { RadioGroup, TextInput, CheckboxGroup } from "@/components/ui/form";
import {
    OTHER_DISEASES_OPTIONS,
    COMPLICATION_OPTIONS,
    SCREENING_FREQUENCY_OPTIONS,
} from "@/config/sectionTwoData";
import { SectionTwoData } from "@/lib/types";

interface HealthConditionsSectionProps {
    formData: SectionTwoData;
    handleChange: (
        field: keyof SectionTwoData,
        value: string | string[]
    ) => void;
    handleScreeningChange: (field: string, value: string) => void;
}

const SCREENING_ITEMS = [
    { key: "physical", label: "1) ตรวจร่างกาย" },
    { key: "foot", label: "2) ตรวจเท้า" },
    { key: "eye", label: "3) ตรวจตา" },
    { key: "urine", label: "4) ตรวจปัสสาวะ" },
    { key: "lipid", label: "5) ตรวจไขมัน" },
    { key: "dental", label: "6) ตรวจฟัน" },
    { key: "hba1c", label: "7) ตรวจน้ำตาลสะสม (HbA1c)" },
];

export default function HealthConditionsSection({
    formData,
    handleChange,
    handleScreeningChange,
}: HealthConditionsSectionProps) {
    return (
        <>
            <div className="space-y-2">
                <RadioGroup
                    name="otherDiseases"
                    label="19. ท่านมีโรคอื่นร่วมด้วยหรือไม่"
                    value={formData.otherDiseases}
                    options={OTHER_DISEASES_OPTIONS}
                    onChange={(v) => handleChange("otherDiseases", v)}
                    layout="horizontal"
                />
                {formData.otherDiseases === "มี" && (
                    <TextInput
                        value={formData.otherDiseasesList}
                        onChange={(v) => handleChange("otherDiseasesList", v)}
                        placeholder="โปรดระบุโรค เช่น ความดันโลหิตสูง, ไขมัน"
                    />
                )}
            </div>

            <CheckboxGroup
                name="complications"
                label="20. ท่านมีภาวะแทรกซ้อนจากโรคเบาหวานหรือไม่ (เลือกได้หลายข้อ)"
                values={formData.complications}
                options={COMPLICATION_OPTIONS}
                onChange={(v) => handleChange("complications", v)}
                layout="grid"
                gridCols={2}
                hasOther
                otherValue={formData.complicationsOther}
                onOtherChange={(v) => handleChange("complicationsOther", v)}
            />

            <div className="space-y-4">
                <label className="font-semibold block text-slate-900">
                    21.
                    ท่านได้เข้ารับการตรวจประเมินภาวะแทรกซ้อนในเรื่องใดบ้างและบ่อยแค่ไหน
                </label>
                {SCREENING_ITEMS.map((item) => (
                    <RadioGroup
                        key={item.key}
                        name={`screening_${item.key}`}
                        label={item.label}
                        value={
                            formData.screenings[
                                item.key as keyof typeof formData.screenings
                            ] || ""
                        }
                        options={SCREENING_FREQUENCY_OPTIONS}
                        onChange={(v) => handleScreeningChange(item.key, v)}
                        layout="horizontal"
                        hasOther
                        otherValue={
                            formData.screenings[
                                `${item.key}Other` as keyof typeof formData.screenings
                            ] || ""
                        }
                        onOtherChange={(v) =>
                            handleScreeningChange(`${item.key}Other`, v)
                        }
                    />
                ))}
                <div className="space-y-2">
                    <label className="font-semibold block text-slate-900">
                        8) การตรวจอื่นๆ โปรดระบุ
                    </label>
                    <TextInput
                        value={formData.screenings.otherText || ""}
                        onChange={(v) => handleScreeningChange("otherText", v)}
                        placeholder="ระบุการตรวจอื่นๆ (ถ้ามี)"
                    />
                </div>
            </div>
        </>
    );
}
