import { RadioGroup, TextInput, ThaiDatePicker } from "@/components/ui/form";
import {
    GENDER_OPTIONS,
    EDUCATION_OPTIONS,
    MARITAL_STATUS_OPTIONS,
    OCCUPATION_OPTIONS,
    INCOME_OPTIONS,
    SUPPORT_SOURCE_OPTIONS,
    FINANCIAL_STATUS_OPTIONS,
} from "@/config/sectionTwoData";
import { type SectionTwoData } from "@/lib/types";

interface DemographicsSectionProps {
    formData: SectionTwoData;
    handleChange: (
        field: keyof SectionTwoData,
        value: string | string[]
    ) => void;
}

export default function DemographicsSection({
    formData,
    handleChange,
}: DemographicsSectionProps) {
    return (
        <>
            <RadioGroup
                name="gender"
                label="1. เพศ"
                value={formData.gender}
                options={GENDER_OPTIONS}
                onChange={(v) => handleChange("gender", v)}
                layout="horizontal"
            />

            <div className="space-y-2">
                <label className="font-semibold block text-slate-900">
                    2. อายุ
                </label>
                <div className="flex flex-wrap gap-4 items-center">
                    <TextInput
                        type="number"
                        value={formData.age}
                        onChange={(v) => handleChange("age", v)}
                        placeholder="อายุ (ปี)"
                        inline
                        suffix="ปี"
                    />
                    <span className="text-slate-900 w-full sm:w-auto">
                        หรือ วัน/เดือน/ปี พ.ศ. เกิด
                    </span>
                    <ThaiDatePicker
                        value={formData.birthDate}
                        onChange={(v) => handleChange("birthDate", v)}
                    />
                </div>
            </div>

            <RadioGroup
                name="education"
                label="3. ระดับการศึกษา"
                value={formData.education}
                options={EDUCATION_OPTIONS}
                onChange={(v) => handleChange("education", v)}
                layout="grid"
                gridCols={2}
                hasOther
                otherValue={formData.educationOther}
                onOtherChange={(v) => handleChange("educationOther", v)}
                otherTriggerValues={["สูงกว่าปริญญาตรี", "อื่น ๆ"]}
            />

            <RadioGroup
                name="maritalStatus"
                label="4. สถานภาพสมรส"
                value={formData.maritalStatus}
                options={MARITAL_STATUS_OPTIONS}
                onChange={(v) => handleChange("maritalStatus", v)}
                layout="horizontal"
            />

            <RadioGroup
                name="occupation"
                label="5. อาชีพ"
                value={formData.occupation}
                options={OCCUPATION_OPTIONS}
                onChange={(v) => handleChange("occupation", v)}
                layout="grid"
                gridCols={2}
                hasOther
                otherValue={formData.occupationOther}
                onOtherChange={(v) => handleChange("occupationOther", v)}
            />

            <RadioGroup
                name="income"
                label="6. รายได้เฉลี่ยต่อเดือน"
                value={formData.income}
                options={INCOME_OPTIONS}
                onChange={(v) => handleChange("income", v)}
                layout="grid"
                gridCols={2}
            />

            {formData.occupation === "ไม่ได้ประกอบอาชีพ" && (
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                    <RadioGroup
                        name="supportSource"
                        label="7. ถ้าท่านไม่ได้ทำงาน ท่านได้รับการส่งเสียเลี้ยงดูจากใคร"
                        value={formData.supportSource}
                        options={SUPPORT_SOURCE_OPTIONS}
                        onChange={(v) => handleChange("supportSource", v)}
                        layout="grid"
                        gridCols={2}
                        hasOther
                        otherValue={formData.supportSourceOther}
                        onOtherChange={(v) =>
                            handleChange("supportSourceOther", v)
                        }
                    />
                </div>
            )}

            <RadioGroup
                name="financialStatus"
                label="8. เศรษฐกิจโดยรวมของครอบครัว"
                value={formData.financialStatus}
                options={FINANCIAL_STATUS_OPTIONS}
                onChange={(v) => handleChange("financialStatus", v)}
                layout="horizontal"
            />
        </>
    );
}
