"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { MedicalRecordData } from "@/lib/types";

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
    const handleChange = (field: keyof MedicalRecordData, value: string) => {
        onChange({ ...formData, [field]: value });
    };

    const handleNext = () => {
        // Basic validation could be added here
        onNext();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-8 px-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        ตอนที่ 2 ข้อมูลเกี่ยวกับโรคและการรักษาจากเวชระเบียน
                    </h1>
                    <p className="text-blue-100 text-lg">
                        กรุณากรอกข้อมูลจากเวชระเบียนของผู้ป่วย
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 1. Blood Sugar */}
                        <div className="space-y-2">
                            <label className="font-semibold block">
                                1. ระดับน้ำตาลในเลือด (mg/dl)
                            </label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="เช่น 120"
                                value={formData.bloodSugar}
                                onChange={(e) =>
                                    handleChange("bloodSugar", e.target.value)
                                }
                            />
                        </div>

                        {/* 2. HbA1c */}
                        <div className="space-y-2">
                            <label className="font-semibold block">
                                2. ระดับ HbA1c (%)
                            </label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="เช่น 6.5"
                                value={formData.hba1c}
                                onChange={(e) =>
                                    handleChange("hba1c", e.target.value)
                                }
                            />
                        </div>

                        {/* 3. Blood Pressure */}
                        <div className="space-y-2">
                            <label className="font-semibold block">
                                3. ค่าความดันโลหิต (mmHg)
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="เช่น 120/80"
                                value={formData.bloodPressure}
                                onChange={(e) =>
                                    handleChange(
                                        "bloodPressure",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        {/* 5. Creatinine */}
                        <div className="space-y-2">
                            <label className="font-semibold block">
                                4. Creatinine (mg/dl)
                            </label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="ระบุค่า Creatinine"
                                value={formData.creatinine}
                                onChange={(e) =>
                                    handleChange("creatinine", e.target.value)
                                }
                            />
                        </div>

                        {/* 4. Micro albumin & 4.1 Ratio (Inline) */}
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
                                {/* 4. Micro albumin */}
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold whitespace-nowrap">
                                        5. Micro albumin =
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full md:w-32 border-b border-gray-400 focus:border-blue-600 outline-none px-2 py-1 text-center bg-transparent transition-colors"
                                        value={formData.microAlbumin}
                                        onChange={(e) =>
                                            handleChange(
                                                "microAlbumin",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* 4.1 Ratio */}
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold whitespace-nowrap">
                                        5.1 Micro albumin/Cr =
                                    </span>
                                    <input
                                        type="number"
                                        className="w-full md:w-32 border-b border-gray-400 focus:border-blue-600 outline-none px-2 py-1 text-center bg-transparent transition-colors"
                                        value={formData.microAlbuminRatio}
                                        onChange={(e) =>
                                            handleChange(
                                                "microAlbuminRatio",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span className="text-black whitespace-nowrap">
                                        mg/g of Cr =
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full md:w-32 border-b border-gray-400 focus:border-blue-600 outline-none px-2 py-1 text-center bg-transparent transition-colors"
                                        value={formData.microAlbuminOther}
                                        onChange={(e) =>
                                            handleChange(
                                                "microAlbuminOther",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Weight */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            6. น้ำหนัก (Kg)
                        </label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="ระบุน้ำหนัก"
                            value={formData.weight}
                            onChange={(e) =>
                                handleChange("weight", e.target.value)
                            }
                        />
                    </div>

                    {/* 7. Lipid Profile */}
                    <div className="space-y-4 border p-4 rounded-xl border-gray-200">
                        <label className="font-semibold block text-lg text-black">
                            7. Lipid Profile
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">
                                    7.1 TChol (mg/dl)
                                </label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.lipid_tchol}
                                    onChange={(e) =>
                                        handleChange(
                                            "lipid_tchol",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">
                                    7.2 TG (mg/dl)
                                </label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.lipid_tg}
                                    onChange={(e) =>
                                        handleChange("lipid_tg", e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">
                                    7.3 LDL-C (mg/dl)
                                </label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.lipid_ldl}
                                    onChange={(e) =>
                                        handleChange(
                                            "lipid_ldl",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">
                                    7.4 HDL-C (mg/dl)
                                </label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.lipid_hdl}
                                    onChange={(e) =>
                                        handleChange(
                                            "lipid_hdl",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* 8. Other Diseases */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            8. โรคอื่นที่เป็นร่วมด้วยเนื่องจากเบาหวาน (ระบุ)
                        </label>

                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            rows={2}
                            value={formData.otherDiseases}
                            onChange={(e) =>
                                handleChange("otherDiseases", e.target.value)
                            }
                        />
                    </div>

                    {/* 9. Diabetes Duration */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            9. ระยะเวลาที่ป่วยเป็นโรคเบาหวาน
                        </label>
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="border border-gray-300 rounded p-2 w-24 text-center"
                                    value={formData.diabetesDurationYears}
                                    onChange={(e) =>
                                        handleChange(
                                            "diabetesDurationYears",
                                            e.target.value
                                        )
                                    }
                                />
                                <span>ปี</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="border border-gray-300 rounded p-2 w-24 text-center"
                                    value={formData.diabetesDurationMonths}
                                    onChange={(e) =>
                                        handleChange(
                                            "diabetesDurationMonths",
                                            e.target.value
                                        )
                                    }
                                />
                                <span>เดือน</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-100 flex justify-between bg-gray-50">
                    <button
                        onClick={onBack}
                        className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-all flex items-center gap-2"
                    >
                        <ChevronLeft size={20} />
                        ย้อนกลับ
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        ถัดไป
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
