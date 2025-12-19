"use client";

import { MedicalRecordData } from "@/lib/types";
import { FormSection, TextInput, FormNavigation } from "@/components/ui/form";
import { useFormField } from "@/hooks";

interface MedicalRecordFormProps {
    formData: MedicalRecordData;
    onChange: (data: MedicalRecordData) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function MedicalRecordForm({
    formData,
    onChange,
    onNext,
    onBack,
}: MedicalRecordFormProps) {
    const { handleChange } = useFormField(formData, onChange);

    const handleNext = () => {
        onNext();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <FormSection
                title="ตอนที่ 2 ข้อมูลเกี่ยวกับโรคและการรักษาจากเวชระเบียน"
                description="กรุณากรอกข้อมูลจากเวชระเบียนของผู้ป่วย"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* 1. Blood Sugar */}
                    <TextInput
                        label="1. ระดับน้ำตาลในเลือด (mg/dl)"
                        type="number"
                        placeholder="เช่น 120"
                        value={formData.bloodSugar}
                        onChange={(v) => handleChange("bloodSugar", v)}
                    />

                    {/* 2. HbA1c */}
                    <TextInput
                        label="2. ระดับ HbA1c (%)"
                        type="number"
                        placeholder="เช่น 6.5"
                        value={formData.hba1c}
                        onChange={(v) => handleChange("hba1c", v)}
                    />

                    {/* 3. Blood Pressure */}
                    <TextInput
                        label="3. ค่าความดันโลหิต (mmHg)"
                        placeholder="เช่น 120/80"
                        value={formData.bloodPressure}
                        onChange={(v) => handleChange("bloodPressure", v)}
                    />

                    {/* 4. Creatinine */}
                    <TextInput
                        label="4. Creatinine (mg/dl)"
                        type="number"
                        placeholder="ระบุค่า Creatinine"
                        value={formData.creatinine}
                        onChange={(v) => handleChange("creatinine", v)}
                    />

                    {/* 5. Micro albumin & Ratio */}
                    <div className="col-span-1 md:col-span-2 space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="font-semibold block text-slate-800 text-lg">
                            5. Micro albumin
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInput
                                label="Micro albumin"
                                value={formData.microAlbumin}
                                onChange={(v) =>
                                    handleChange("microAlbumin", v)
                                }
                                placeholder="ระบุค่า"
                            />
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-slate-900">
                                    Micro albumin/Cr (mg/g)
                                </label>
                                <div className="flex items-center gap-2">
                                    <TextInput
                                        type="number"
                                        value={formData.microAlbuminRatio}
                                        onChange={(v) =>
                                            handleChange("microAlbuminRatio", v)
                                        }
                                        placeholder="Ratio"
                                        className="w-full"
                                    />
                                    <span className="text-slate-500 whitespace-nowrap">
                                        mg/g of Cr =
                                    </span>
                                    <TextInput
                                        value={formData.microAlbuminOther}
                                        onChange={(v) =>
                                            handleChange("microAlbuminOther", v)
                                        }
                                        placeholder="ระบุเพิ่มเติม"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Weight */}
                    <TextInput
                        label="6. น้ำหนัก (Kg)"
                        type="number"
                        placeholder="ระบุน้ำหนัก"
                        value={formData.weight}
                        onChange={(v) => handleChange("weight", v)}
                    />

                    {/* 7. Lipid Profile */}
                    <div className="col-span-1 md:col-span-2 space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="font-semibold block text-slate-800 text-lg">
                            7. Lipid Profile
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <TextInput
                                label="TChol (mg/dl)"
                                type="number"
                                value={formData.lipid_tchol}
                                onChange={(v) => handleChange("lipid_tchol", v)}
                                placeholder="ระบุค่า"
                            />
                            <TextInput
                                label="TG (mg/dl)"
                                type="number"
                                value={formData.lipid_tg}
                                onChange={(v) => handleChange("lipid_tg", v)}
                                placeholder="ระบุค่า"
                            />
                            <TextInput
                                label="LDL-C (mg/dl)"
                                type="number"
                                value={formData.lipid_ldl}
                                onChange={(v) => handleChange("lipid_ldl", v)}
                                placeholder="ระบุค่า"
                            />
                            <TextInput
                                label="HDL-C (mg/dl)"
                                type="number"
                                value={formData.lipid_hdl}
                                onChange={(v) => handleChange("lipid_hdl", v)}
                                placeholder="ระบุค่า"
                            />
                        </div>
                    </div>

                    {/* 8. Other Diseases */}
                    <div className="col-span-1 md:col-span-2">
                        <TextInput
                            label="8. โรคอื่นที่เป็นร่วมด้วยเนื่องจากเบาหวาน (ระบุ)"
                            type="textarea"
                            rows={3}
                            value={formData.otherDiseases}
                            onChange={(v) => handleChange("otherDiseases", v)}
                            placeholder="ระบุโรคอื่น ๆ..."
                        />
                    </div>

                    {/* 9. Diabetes Duration */}
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="font-semibold block text-slate-900">
                            9. ระยะเวลาที่ป่วยเป็นโรคเบาหวาน
                        </label>
                        <div className="flex flex-wrap gap-4 items-center p-4 bg-white border border-slate-200 rounded-xl">
                            <TextInput
                                type="number"
                                value={formData.diabetesDurationYears}
                                onChange={(v) =>
                                    handleChange("diabetesDurationYears", v)
                                }
                                inline
                                suffix="ปี"
                                inputClassName="w-24"
                            />
                            <TextInput
                                type="number"
                                value={formData.diabetesDurationMonths}
                                onChange={(v) =>
                                    handleChange("diabetesDurationMonths", v)
                                }
                                inline
                                suffix="เดือน"
                                inputClassName="w-24"
                            />
                        </div>
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
