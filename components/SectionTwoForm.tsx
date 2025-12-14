"use client";

import { useState } from "react";
import AlertModal from "@/components/AlertModal";
import {
    RadioGroup,
    TextInput,
    CheckboxGroup,
    FormSection,
    FormNavigation,
} from "@/components/ui/form";
import { validateSectionTwo } from "@/lib/validation";
import {
    GENDER_OPTIONS,
    EDUCATION_OPTIONS,
    MARITAL_STATUS_OPTIONS,
    OCCUPATION_OPTIONS,
    INCOME_OPTIONS,
    SUPPORT_SOURCE_OPTIONS,
    FINANCIAL_STATUS_OPTIONS,
    TREATMENT_TYPE_OPTIONS,
    MEDICATION_COUNT_OPTIONS,
    PAYMENT_METHOD_OPTIONS,
    LIVING_ARRANGEMENT_OPTIONS,
    FAMILY_SUPPORT_OPTIONS,
    WORK_SUPPORT_OPTIONS,
    ALCOHOL_OPTIONS,
    SMOKING_OPTIONS,
    OTHER_DISEASES_OPTIONS,
    COMPLICATION_OPTIONS,
    SCREENING_FREQUENCY_OPTIONS,
} from "@/config/sectionTwoData";
import { SectionTwoData } from "@/lib/types";

interface SectionTwoFormProps {
    formData: SectionTwoData;
    onChange: (data: SectionTwoData) => void;
    onNext: () => void;
    onBack: () => void;
    region: string;
}

export default function SectionTwoForm({
    formData,
    onChange,
    onNext,
    onBack,
    region,
}: SectionTwoFormProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (field: keyof SectionTwoData, value: any) => {
        onChange({ ...formData, [field]: value });
    };

    const handleScreeningChange = (field: string, value: string) => {
        onChange({
            ...formData,
            screenings: { ...formData.screenings, [field]: value },
        });
    };

    const handleAdviceSourceChange = (field: string, value: string) => {
        onChange({
            ...formData,
            adviceSources: { ...formData.adviceSources, [field]: value },
        });
    };

    const handleNext = () => {
        const validation = validateSectionTwo(formData);
        if (!validation.isValid) {
            setAlertMessage(validation.errors[0]);
            setIsAlertOpen(true);
            return;
        }
        onNext();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />

            <FormSection
                title="ตอนที่ 1 ข้อมูลทั่วไป (ส่วนที่ 1)"
                description="ตามความเป็นจริงเกี่ยวกับตัวของผู้ตอบแบบสอบถาม"
            >
                {/* 1. Gender */}
                <RadioGroup
                    name="gender"
                    label="1. เพศ"
                    value={formData.gender}
                    options={GENDER_OPTIONS}
                    onChange={(v) => handleChange("gender", v)}
                    layout="horizontal"
                />

                {/* 2. Age */}
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
                        <span className="text-slate-900">
                            หรือ วัน/เดือน/ปี พ.ศ. เกิด
                        </span>
                        <input
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) =>
                                handleChange("birthDate", e.target.value)
                            }
                            className="border rounded p-2 text-slate-900 border-slate-300"
                        />
                    </div>
                </div>

                {/* 3. Education */}
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

                {/* 4. Marital Status */}
                <RadioGroup
                    name="maritalStatus"
                    label="4. สถานภาพสมรส"
                    value={formData.maritalStatus}
                    options={MARITAL_STATUS_OPTIONS}
                    onChange={(v) => handleChange("maritalStatus", v)}
                    layout="horizontal"
                />

                {/* 5. Occupation */}
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

                {/* 6. Income */}
                <RadioGroup
                    name="income"
                    label="6. รายได้เฉลี่ยต่อเดือน"
                    value={formData.income}
                    options={INCOME_OPTIONS}
                    onChange={(v) => handleChange("income", v)}
                    layout="grid"
                    gridCols={2}
                />

                {/* 7. Support Source (Conditional) */}
                {formData.occupation === "ไม่ได้ประกอบอาชีพ" && (
                    <div className="bg-blue-50 p-4 rounded-lg">
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

                {/* 8. Financial Status */}
                <RadioGroup
                    name="financialStatus"
                    label="8. เศรษฐกิจโดยรวมของครอบครัว"
                    value={formData.financialStatus}
                    options={FINANCIAL_STATUS_OPTIONS}
                    onChange={(v) => handleChange("financialStatus", v)}
                    layout="horizontal"
                />

                {/* 9. Diabetes Duration */}
                <div className="space-y-2">
                    <label className="font-semibold block text-slate-900">
                        9. ระยะเวลาที่ทราบว่าเป็นเบาหวานจากการวินิจฉัยจากแพทย์
                    </label>
                    <div className="flex flex-wrap gap-4 items-center">
                        <TextInput
                            type="number"
                            value={formData.diabetesDuration}
                            onChange={(v) =>
                                handleChange("diabetesDuration", v)
                            }
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

                {/* 10. Treatment Type */}
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

                {/* 11. Medication Count */}
                <RadioGroup
                    name="medicationCount"
                    label="11. จำนวนยาที่ได้รับ"
                    value={formData.medicationCount}
                    options={MEDICATION_COUNT_OPTIONS}
                    onChange={(v) => handleChange("medicationCount", v)}
                    layout="horizontal"
                />

                {/* 12. Payment Method */}
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

                {/* 13. Living Arrangement */}
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
                    {(formData.livingArrangement ===
                        "อยู่กับคู่สมรสและบุตร/หลาน" ||
                        formData.livingArrangement ===
                            "อยู่กับญาติ/เพื่อน") && (
                        <div className="ml-6">
                            <TextInput
                                type="number"
                                value={formData.livingMembers}
                                onChange={(v) =>
                                    handleChange("livingMembers", v)
                                }
                                inline
                                prefix="จำนวน"
                                suffix="คน"
                            />
                        </div>
                    )}
                </div>

                {/* 14. Family Support */}
                <RadioGroup
                    name="familySupport"
                    label="14. คนในครอบครัว/ญาติ/เพื่อนมีการดูแลเรื่องอาหารการกิน คอยระวังเรื่องอาหาร/ทานยา ให้ท่านหรือไม่"
                    value={formData.familySupport}
                    options={FAMILY_SUPPORT_OPTIONS}
                    onChange={(v) => handleChange("familySupport", v)}
                    layout="horizontal"
                />

                {/* 15. Work Support */}
                <RadioGroup
                    name="workSupport"
                    label="15. กรณีที่ท่านยังทำงานอยู่ เพื่อนร่วมงานมีการดูแลเรื่องอาหาร/ทานยา เช่น คอยเตือนเมื่อได้เวลาทานยา หรือเตือนเมื่อจะกินอาหารที่มีความเสี่ยงให้ท่านหรือไม่"
                    value={formData.workSupport}
                    options={WORK_SUPPORT_OPTIONS}
                    onChange={(v) => handleChange("workSupport", v)}
                    layout="horizontal"
                />

                {/* 16. Diet */}
                <div className="space-y-4">
                    <label className="font-semibold block text-slate-900">
                        16.
                        อาหาร/ของว่าง/เครื่องดื่มที่ท่านรับประทานบ่อยที่สุดในช่วง
                        1 เดือนที่ผ่านมา
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

                {/* 17. Alcohol */}
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

                {/* 18. Smoking */}
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

                {/* 19. Other Diseases */}
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
                            onChange={(v) =>
                                handleChange("otherDiseasesList", v)
                            }
                            placeholder="โปรดระบุโรค เช่น ความดันโลหิตสูง, ไขมัน"
                        />
                    )}
                </div>

                {/* 20. Complications */}
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

                {/* 21. Screenings */}
                <div className="space-y-4">
                    <label className="font-semibold block text-slate-900">
                        21.
                        ท่านได้เข้ารับการตรวจประเมินภาวะแทรกซ้อนในเรื่องใดบ้างและบ่อยแค่ไหน
                    </label>
                    {[
                        { key: "physical", label: "1) ตรวจร่างกาย" },
                        { key: "foot", label: "2) ตรวจเท้า" },
                        { key: "eye", label: "3) ตรวจตา" },
                        { key: "urine", label: "4) ตรวจปัสสาวะ" },
                        { key: "lipid", label: "5) ตรวจไขมัน" },
                        { key: "dental", label: "6) ตรวจฟัน" },
                        { key: "hba1c", label: "7) ตรวจน้ำตาลสะสม (HbA1c)" },
                    ].map((item) => (
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
                    {/* 8) การตรวจอื่นๆ */}
                    <div className="space-y-2">
                        <label className="font-semibold block text-slate-900">
                            8) การตรวจอื่นๆ โปรดระบุ
                        </label>
                        <TextInput
                            value={formData.screenings.otherText || ""}
                            onChange={(v) =>
                                handleScreeningChange("otherText", v)
                            }
                            placeholder="ระบุการตรวจอื่นๆ (ถ้ามี)"
                        />
                    </div>
                </div>

                <FormNavigation
                    onBack={onBack}
                    onNext={handleNext}
                    showBack={true}
                />
            </FormSection>
        </div>
    );
}
