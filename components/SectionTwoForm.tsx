"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import AlertModal from "@/components/AlertModal";

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

    const handleComplicationChange = (value: string) => {
        const current = formData.complications;
        let newComplications;
        if (current.includes(value)) {
            newComplications = current.filter((c) => c !== value);
        } else {
            newComplications = [...current, value];
        }
        onChange({ ...formData, complications: newComplications });
    };

    const handleAdviceSourceChange = (field: string, value: string) => {
        onChange({
            ...formData,
            adviceSources: { ...formData.adviceSources, [field]: value },
        });
    };

    const handleNext = () => {
        if (!formData.respondentName.trim()) {
            setAlertMessage("กรุณาระบุชื่อผู้ทำแบบสอบถาม");
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
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-8 px-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        ตอนที่ 1 ข้อมูลทั่วไป (ส่วนที่ 1)
                    </h1>
                    <p className="text-blue-100 text-lg">
                        ตามความเป็นจริงเกี่ยวกับตัวของผู้ตอบแบบสอบถาม
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            ชื่อผู้ให้ข้อมูล
                        </label>
                        <input
                            type="text"
                            placeholder="ระบุชื่อ-นามสกุล"
                            value={formData.respondentName}
                            onChange={(e) =>
                                handleChange("respondentName", e.target.value)
                            }
                            className="border rounded p-2 w-full md:w-1/2"
                        />
                    </div>

                    {/* 1. Gender */}
                    {/* 1. Gender */}
                    <div className="space-y-2">
                        <label className="font-semibold block">1. เพศ</label>
                        <div className="flex gap-4">
                            {["ชาย", "หญิง"].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={opt}
                                        checked={formData.gender === opt}
                                        onChange={(e) =>
                                            handleChange(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 2. Age */}
                    <div className="space-y-2">
                        <label className="font-semibold block">2. อายุ</label>
                        <div className="flex flex-wrap gap-4 items-center">
                            <input
                                type="number"
                                placeholder="อายุ (ปี)"
                                value={formData.age}
                                onChange={(e) =>
                                    handleChange("age", e.target.value)
                                }
                                className="border rounded p-2 w-24"
                            />
                            <span>หรือ วัน/เดือน/ปี พ.ศ. เกิด</span>
                            <input
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) =>
                                    handleChange("birthDate", e.target.value)
                                }
                                className="border rounded p-2"
                            />
                        </div>
                    </div>

                    {/* 3. Education */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            3. ระดับการศึกษา
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                                "ต่ำกว่าประถมศึกษา",
                                "ประถมศึกษา",
                                "มัธยมศึกษาตอนต้น",
                                "มัธยมศึกษาตอนปลาย/ ปวช.",
                                "ปวส./อนุปริญญา",
                                "ปริญญาตรี",
                                "สูงกว่าปริญญาตรี",
                                "อื่น ๆ",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="education"
                                        value={opt}
                                        checked={formData.education === opt}
                                        onChange={(e) =>
                                            handleChange(
                                                "education",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                    {(opt === "สูงกว่าปริญญาตรี" ||
                                        opt === "อื่น ๆ") &&
                                        formData.education === opt && (
                                            <input
                                                type="text"
                                                placeholder="โปรดระบุ"
                                                value={formData.educationOther}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "educationOther",
                                                        e.target.value
                                                    )
                                                }
                                                className="border-b border-gray-300 focus:border-blue-500 outline-none ml-2 flex-1"
                                            />
                                        )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 4. Marital Status */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            4. สถานภาพสมรส
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {["โสด", "สมรส/อยู่ด้วยกัน", "หย่า/หม้าย"].map(
                                (opt) => (
                                    <label
                                        key={opt}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="maritalStatus"
                                            value={opt}
                                            checked={
                                                formData.maritalStatus === opt
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    "maritalStatus",
                                                    e.target.value
                                                )
                                            }
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        {opt}
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    {/* 5. Occupation */}
                    <div className="space-y-2">
                        <label className="font-semibold block">5. อาชีพ</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                                "ไม่ได้ประกอบอาชีพ",
                                "ข้าราชการ/พนักงานรัฐวิสาหกิจ",
                                "พนักงานบริษัทเอกชน",
                                "ประกอบธุรกิจส่วนตัว เช่น ค้าขาย",
                                "ข้าราชการบำนาญ",
                                "เกษตรกรรม",
                                "รับจ้างทั่วไป",
                                "อื่น ๆ",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="occupation"
                                        value={opt}
                                        checked={formData.occupation === opt}
                                        onChange={(e) =>
                                            handleChange(
                                                "occupation",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                    {opt === "อื่น ๆ" &&
                                        formData.occupation === opt && (
                                            <input
                                                type="text"
                                                placeholder="โปรดระบุ"
                                                value={formData.occupationOther}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "occupationOther",
                                                        e.target.value
                                                    )
                                                }
                                                className="border-b border-gray-300 focus:border-blue-500 outline-none ml-2 flex-1"
                                            />
                                        )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 6. Income */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            6. รายได้เฉลี่ยต่อเดือน
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                                "ไม่มีรายได้",
                                "น้อยกว่า 5,000 บาท",
                                "ตั้งแต่ 5,001 – 10,000 บาท",
                                "ตั้งแต่10,001 – 20,000 บาท",
                                "ตั้งแต่ 20,001 – 30,000 บาท",
                                "มากกว่า 30,001 บาท",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="income"
                                        value={opt}
                                        checked={formData.income === opt}
                                        onChange={(e) =>
                                            handleChange(
                                                "income",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 7. Support Source (Conditional: If not working) */}
                    {formData.occupation === "ไม่ได้ประกอบอาชีพ" && (
                        <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                            <label className="font-semibold block">
                                7. ถ้าท่านไม่ได้ทำงาน
                                ท่านได้รับการส่งเสียเลี้ยงดูจากใคร
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[
                                    "ไม่มี",
                                    "จากคู่สมรส",
                                    "จากลูก",
                                    "จากญาติ",
                                    "เงินบำนาญ",
                                    "ยังทำงานอยู่",
                                    "อื่น ๆ",
                                ].map((opt) => (
                                    <label
                                        key={opt}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="supportSource"
                                            value={opt}
                                            checked={
                                                formData.supportSource === opt
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    "supportSource",
                                                    e.target.value
                                                )
                                            }
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        {opt}
                                        {opt === "อื่น ๆ" &&
                                            formData.supportSource === opt && (
                                                <input
                                                    type="text"
                                                    placeholder="ระบุ"
                                                    value={
                                                        formData.supportSourceOther
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            "supportSourceOther",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border-b border-blue-300 focus:border-blue-500 outline-none ml-2 flex-1 bg-transparent"
                                                />
                                            )}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 8. Family Economy */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            8. เศรษฐกิจโดยรวมของครอบครัว
                        </label>
                        <div className="flex gap-4">
                            {[
                                "เพียงพอในการใช้จ่าย",
                                "ไม่เพียงพอในการใช้จ่าย",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="financialStatus"
                                        value={opt}
                                        checked={
                                            formData.financialStatus === opt
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "financialStatus",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 9. Diabetes Duration */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            9.
                            ระยะเวลาที่ทราบว่าเป็นเบาหวานจากการวินิจฉัยจากแพทย์
                        </label>
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="border border-gray-300 rounded p-1 w-20 text-center"
                                    value={formData.diabetesDuration}
                                    onChange={(e) =>
                                        handleChange(
                                            "diabetesDuration",
                                            e.target.value
                                        )
                                    }
                                />
                                <span>ปี</span>
                            </div>
                            <span>หรือเริ่มเป็นเบาหวานตั้งแต่อายุเท่าไร</span>
                            <div className="flex items-center gap-2">
                                <span>อายุ</span>
                                <input
                                    type="number"
                                    className="border border-gray-300 rounded p-1 w-20 text-center"
                                    value={formData.diabetesAge}
                                    onChange={(e) =>
                                        handleChange(
                                            "diabetesAge",
                                            e.target.value
                                        )
                                    }
                                />
                                <span>ปี</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />
                    <h2 className="text-xl font-bold text-gray-800">
                        ตอนที่ 1 ข้อมูลทั่วไป (ส่วนที่ 1 ต่อ)
                    </h2>

                    {/* 10. Treatment */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            10. รูปแบบการรักษา
                        </label>
                        <div className="flex flex-col gap-2">
                            {[
                                "การควบคุมอาหารเพียงอย่างเดียว",
                                "ใช้ยารับประทาน",
                                "ใช้ยาฉีดอินซูลิน",
                                "ใช้ยารับประทานร่วมกับยาฉีดอินซูลิน",
                                "อื่น ๆ",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="treatmentType"
                                        value={opt}
                                        checked={formData.treatmentType === opt}
                                        onChange={(e) =>
                                            handleChange(
                                                "treatmentType",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                    {opt === "อื่น ๆ" &&
                                        formData.treatmentType === opt && (
                                            <input
                                                type="text"
                                                placeholder="โปรดระบุ"
                                                value={formData.treatmentOther}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "treatmentOther",
                                                        e.target.value
                                                    )
                                                }
                                                className="border-b border-gray-300 focus:border-blue-500 outline-none ml-2 flex-1"
                                            />
                                        )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 11. Meds Count */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            11. จำนวนยาที่ได้รับ
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {[
                                "ไม่มี",
                                "1- 5 รายการ",
                                "5-10 รายการ",
                                "มากกว่า 10 รายการ",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="medicationCount"
                                        value={opt}
                                        checked={
                                            formData.medicationCount === opt
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "medicationCount",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 12. Payment */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            12.
                            ท่านจ่ายค่ารักษาพยาบาลในการรักษาโรคเบาหวานด้วยวิธีใด
                            (สิทธิการรักษาของผู้ป่วย)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                                "บัตรทอง 30 บาท",
                                "บัตรประกันสังคม",
                                "สวัสดิการข้าราชการ/รัฐวิสาหกิจ",
                                "บัตรผู้สูงอายุ",
                                "จ่ายเอง",
                                "อื่น ๆ",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={opt}
                                        checked={formData.paymentMethod === opt}
                                        onChange={(e) =>
                                            handleChange(
                                                "paymentMethod",
                                                e.target.value
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {opt}
                                    {opt === "อื่น ๆ" &&
                                        formData.paymentMethod === opt && (
                                            <input
                                                type="text"
                                                placeholder="โปรดระบุ"
                                                value={
                                                    formData.paymentMethodOther
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "paymentMethodOther",
                                                        e.target.value
                                                    )
                                                }
                                                className="border-b border-gray-300 focus:border-blue-500 outline-none ml-2 flex-1"
                                            />
                                        )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 13. Living Arrangement */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            13. ปัจจุบันท่านพักอาศัยอยู่กับใคร
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="livingArrangement"
                                    value="spouse_child"
                                    checked={
                                        formData.livingArrangement ===
                                        "spouse_child"
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "livingArrangement",
                                            e.target.value
                                        )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                อยู่กับคู่สมรสและบุตร/หลาน
                                {formData.livingArrangement ===
                                    "spouse_child" && (
                                    <div className="flex items-center gap-2">
                                        <span>จำนวนสมาชิกทั้งหมด</span>
                                        <input
                                            type="number"
                                            className="border-b border-gray-300 w-16 text-center"
                                            value={formData.livingMembers}
                                            onChange={(e) =>
                                                handleChange(
                                                    "livingMembers",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span>คน (รวมตัวท่านด้วย)</span>
                                    </div>
                                )}
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="livingArrangement"
                                    value="relative_friend"
                                    checked={
                                        formData.livingArrangement ===
                                        "relative_friend"
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "livingArrangement",
                                            e.target.value
                                        )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                อยู่กับญาติ/เพื่อน
                                {formData.livingArrangement ===
                                    "relative_friend" && (
                                    <div className="flex items-center gap-2">
                                        <span>จำนวนสมาชิกทั้งหมด</span>
                                        <input
                                            type="number"
                                            className="border-b border-gray-300 w-16 text-center"
                                            value={formData.livingMembers}
                                            onChange={(e) =>
                                                handleChange(
                                                    "livingMembers",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span>คน (รวมตัวท่านด้วย)</span>
                                    </div>
                                )}
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="livingArrangement"
                                    value="alone"
                                    checked={
                                        formData.livingArrangement === "alone"
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "livingArrangement",
                                            e.target.value
                                        )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                อยู่คนเดียว
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="livingArrangement"
                                    value="other"
                                    checked={
                                        formData.livingArrangement === "other"
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "livingArrangement",
                                            e.target.value
                                        )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                อื่นๆ
                                {formData.livingArrangement === "other" && (
                                    <input
                                        type="text"
                                        placeholder="ระบุ"
                                        value={formData.livingArrangementOther}
                                        onChange={(e) =>
                                            handleChange(
                                                "livingArrangementOther",
                                                e.target.value
                                            )
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none ml-2 flex-1"
                                    />
                                )}
                            </label>
                        </div>
                    </div>

                    {/* 14. Family Support */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            14.
                            คนในครอบครัว/ญาติ/เพื่อนมีการดูแลเรื่องอาหารการกิน
                            คอยระวังเรื่องอาหาร/ทานยา ให้ท่านหรือไม่
                        </label>
                        <div className="flex gap-4">
                            {["มี", "ไม่มี (ดูแลด้วยตัวเองคนเดียว)"].map(
                                (opt) => (
                                    <label
                                        key={opt}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="familySupport"
                                            value={opt}
                                            checked={
                                                formData.familySupport === opt
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    "familySupport",
                                                    e.target.value
                                                )
                                            }
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        {opt}
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    {/* 15. Work Support */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            15.
                            กรณีที่ท่านยังทำงานอยู่เพื่อนร่วมงานมีการดูแลเรื่องอาหาร/ทานยา
                            เช่น คอยเตือนเมื่อ ได้เวลาทานยา
                            หรือเตือนเมื่อจะกินอาหารที่มีความเสี่ยงให้ท่านหรือไม่
                        </label>
                        <div className="flex gap-4">
                            {["มี", "ไม่มี (ดูแลด้วยตัวเองคนเดียว)"].map(
                                (opt) => (
                                    <label
                                        key={opt}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="workSupport"
                                            value={opt}
                                            checked={
                                                formData.workSupport === opt
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    "workSupport",
                                                    e.target.value
                                                )
                                            }
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        {opt}
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    {/* 16. Diet */}
                    <div className="space-y-4">
                        <label className="font-semibold block">
                            16. รายการอาหาร/เครื่องดื่ม
                        </label>
                        <div className="grid grid-cols-1 gap-4 pl-4">
                            <div className="space-y-1">
                                <label className="text-sm text-gray-700">
                                    อาหาร 3
                                    อย่างที่ท่านรับประทานบ่อยที่สุดในช่วง 1
                                    เดือนที่ผ่านมา คือ
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.dietFood}
                                    onChange={(e) =>
                                        handleChange("dietFood", e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-700">
                                    ของว่าง 3
                                    อย่างที่ท่านรับประทานบ่อยที่สุดในช่วง 1
                                    เดือนที่ผ่านมา คือ
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.dietSnack}
                                    onChange={(e) =>
                                        handleChange(
                                            "dietSnack",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-700">
                                    เครื่องดื่ม 3
                                    อย่างที่ท่านดื่มบ่อยที่สุดในช่วง 1
                                    เดือนที่ผ่านมาคือ
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.dietDrink}
                                    onChange={(e) =>
                                        handleChange(
                                            "dietDrink",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* 17. Alcohol */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            17. ท่านดื่มเครื่องดื่มแอลกอฮอล์หรือไม่
                        </label>
                        <div className="space-y-2 pl-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="alcohol"
                                    value="never"
                                    checked={formData.alcohol === "never"}
                                    onChange={(e) =>
                                        handleChange("alcohol", e.target.value)
                                    }
                                />
                                ไม่เคยดื่มเลย
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="alcohol"
                                    value="quit"
                                    checked={formData.alcohol === "quit"}
                                    onChange={(e) =>
                                        handleChange("alcohol", e.target.value)
                                    }
                                />
                                เคยดื่มแต่เลิกแล้ว เลิกมาแล้ว
                                <input
                                    type="number"
                                    className="border-b border-gray-300 w-16 text-center"
                                    value={formData.alcoholYears}
                                    onChange={(e) =>
                                        handleChange(
                                            "alcoholYears",
                                            e.target.value
                                        )
                                    }
                                    disabled={formData.alcohol !== "quit"}
                                />
                                ปี
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="alcohol"
                                    value="rarely"
                                    checked={formData.alcohol === "rarely"}
                                    onChange={(e) =>
                                        handleChange("alcohol", e.target.value)
                                    }
                                />
                                ดื่มบ้างนานๆ ครั้ง
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="alcohol"
                                    value="regular"
                                    checked={formData.alcohol === "regular"}
                                    onChange={(e) =>
                                        handleChange("alcohol", e.target.value)
                                    }
                                />
                                ดื่มเป็นประจำ สัปดาห์ละ
                                <input
                                    type="number"
                                    className="border-b border-gray-300 w-16 text-center"
                                    value={formData.alcoholDays}
                                    onChange={(e) =>
                                        handleChange(
                                            "alcoholDays",
                                            e.target.value
                                        )
                                    }
                                    disabled={formData.alcohol !== "regular"}
                                />
                                วัน
                            </label>
                        </div>
                    </div>

                    {/* 18. Smoking */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            18. ท่านสูบบุหรี่หรือไม่
                        </label>
                        <div className="space-y-2 pl-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="smoking"
                                    value="never"
                                    checked={formData.smoking === "never"}
                                    onChange={(e) =>
                                        handleChange("smoking", e.target.value)
                                    }
                                />
                                ไม่เคยสูบเลย
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="smoking"
                                    value="quit"
                                    checked={formData.smoking === "quit"}
                                    onChange={(e) =>
                                        handleChange("smoking", e.target.value)
                                    }
                                />
                                เคยสูบแต่เลิกแล้ว เลิกมาแล้ว
                                <input
                                    type="number"
                                    className="border-b border-gray-300 w-16 text-center"
                                    value={formData.smokingYears}
                                    onChange={(e) =>
                                        handleChange(
                                            "smokingYears",
                                            e.target.value
                                        )
                                    }
                                    disabled={formData.smoking !== "quit"}
                                />
                                ปี
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="smoking"
                                    value="rarely"
                                    checked={formData.smoking === "rarely"}
                                    onChange={(e) =>
                                        handleChange("smoking", e.target.value)
                                    }
                                />
                                สูบบ้างนานๆ ครั้ง
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="smoking"
                                    value="regular"
                                    checked={formData.smoking === "regular"}
                                    onChange={(e) =>
                                        handleChange("smoking", e.target.value)
                                    }
                                />
                                สูบเป็นประจำทุกวัน วันละ
                                <input
                                    type="number"
                                    className="border-b border-gray-300 w-16 text-center"
                                    value={formData.smokingAmount}
                                    onChange={(e) =>
                                        handleChange(
                                            "smokingAmount",
                                            e.target.value
                                        )
                                    }
                                    disabled={formData.smoking !== "regular"}
                                />
                                มวน
                            </label>
                        </div>
                    </div>

                    {/* 19. Other Diseases */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            19. ท่านได้รับการวินิจฉัยจากแพทย์ว่าเป็นโรคอื่นๆ
                            ร่วมด้วยหรือไม่
                        </label>
                        <div className="flex gap-4 items-start flex-col sm:flex-row">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="otherDiseases"
                                    value="no"
                                    checked={formData.otherDiseases === "no"}
                                    onChange={(e) =>
                                        handleChange(
                                            "otherDiseases",
                                            e.target.value
                                        )
                                    }
                                />
                                ไม่มี
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer w-full sm:w-auto">
                                <input
                                    type="radio"
                                    name="otherDiseases"
                                    value="yes"
                                    checked={formData.otherDiseases === "yes"}
                                    onChange={(e) =>
                                        handleChange(
                                            "otherDiseases",
                                            e.target.value
                                        )
                                    }
                                />
                                มี โปรดระบุโรค
                                <input
                                    type="text"
                                    className="border-b border-gray-300 focus:border-blue-500 outline-none ml-2 flex-1 w-full"
                                    value={formData.otherDiseasesList}
                                    onChange={(e) =>
                                        handleChange(
                                            "otherDiseasesList",
                                            e.target.value
                                        )
                                    }
                                    disabled={formData.otherDiseases !== "yes"}
                                />
                            </label>
                        </div>
                    </div>

                    {/* 20. Complications */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            20. ภาวะแทรกซ้อนจากโรคเบาหวาน (ตอบได้มากกว่า 1 ข้อ)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                            {[
                                "ไม่มีภาวะแทรกซ้อน",
                                "มีอาการตามัวมองไม่ชัด ต้อกระจก",
                                "มีอาการผิดปกติของไต/โรคไต",
                                "มีอาการชาตามปลายมือปลายเท้า",
                                "ถูกตัดนิ้วมือนิ้วเท้าหรือตัดขาตัดเท้า",
                                "ความดันโลหิตสูง",
                                "มีแผลเรื้อรัง",
                                "มีอาการทางหัวใจ เช่น เจ็บหน้าอก เป็นโรคหัวใจ",
                                "อัมพาต",
                                "ขาและเท้าบวม",
                                "อื่น ๆ",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.complications.includes(
                                            opt
                                        )}
                                        onChange={() =>
                                            handleComplicationChange(opt)
                                        }
                                        className="text-blue-600 focus:ring-blue-500 rounded"
                                    />
                                    {opt}
                                    {opt === "อื่น ๆ" &&
                                        formData.complications.includes(
                                            opt
                                        ) && (
                                            <input
                                                type="text"
                                                placeholder="ระบุ"
                                                value={
                                                    formData.complicationsOther
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "complicationsOther",
                                                        e.target.value
                                                    )
                                                }
                                                className="border-b border-gray-300 focus:border-blue-500 outline-none ml-2 flex-1"
                                            />
                                        )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 21. Screening Freq */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            21.
                            ท่านได้เข้ารับการตรวจประเมินภาวะแทรกซ้อนในเรื่องใดบ้างและบ่อยแค่ไหน
                        </label>
                        <div className="space-y-4 pl-4 overflow-x-auto">
                            {[
                                { id: "physical", label: "1) ตรวจร่างกาย" },
                                { id: "foot", label: "2) ตรวจเท้า" },
                                { id: "eye", label: "3) ตรวจตา" },
                                { id: "urine", label: "4) ตรวจปัสสาวะ" },
                                { id: "lipid", label: "5) ตรวจไขมัน" },
                                { id: "dental", label: "6) ตรวจฟัน" },
                                {
                                    id: "hba1c",
                                    label: "7) ตรวจน้ำตาลสะสม (HbA1c)",
                                },
                                { id: "other", label: "8) การตรวจอื่นๆ" },
                            ].map((item) => (
                                <div key={item.id} className="min-w-[500px]">
                                    <div className="font-medium mb-1">
                                        {item.label}
                                        {item.id === "other" && (
                                            <input
                                                type="text"
                                                placeholder="โปรดระบุ"
                                                value={
                                                    formData.screenings
                                                        .otherText
                                                }
                                                onChange={(e) =>
                                                    handleScreeningChange(
                                                        "otherText",
                                                        e.target.value
                                                    )
                                                }
                                                className="border-b border-gray-300 ml-2 outline-none w-40"
                                            />
                                        )}
                                    </div>
                                    <div className="flex gap-4 text-sm text-gray-700 ml-4">
                                        {[
                                            "ทุก 3 เดือน",
                                            "ทุก 6 เดือน",
                                            "ทุก 1 ปี",
                                            "อื่น ๆ",
                                        ].map((opt) => (
                                            <label
                                                key={opt}
                                                className="flex items-center gap-1 cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`screening_${item.id}`}
                                                    value={opt}
                                                    checked={
                                                        formData.screenings[
                                                            item.id as keyof typeof formData.screenings
                                                        ] === opt
                                                    }
                                                    onChange={(e) =>
                                                        handleScreeningChange(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {opt}
                                                {opt === "อื่น ๆ" &&
                                                    formData.screenings[
                                                        item.id as keyof typeof formData.screenings
                                                    ] === opt && (
                                                        <input
                                                            type="text"
                                                            placeholder="ระบุ"
                                                            className="border-b border-gray-300 w-20 outline-none"
                                                            onChange={(e) =>
                                                                handleScreeningChange(
                                                                    `${item.id}Other`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    )}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    {/* 22. Advice Received */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            22. ในรอบ 1
                            ปีที่ผ่านมาท่านได้รับข้อมูลคำแนะนำเกี่ยวกับโรคเบาหวานบ้างหรือไม่
                        </label>
                        <div className="space-y-2 pl-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="adviceReceived"
                                    value="yes"
                                    checked={formData.adviceReceived === "yes"}
                                    onChange={(e) =>
                                        handleChange(
                                            "adviceReceived",
                                            e.target.value
                                        )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                ได้รับ
                            </label>
                            {formData.adviceReceived === "yes" && (
                                <div className="ml-6 space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="adviceCountType"
                                            checked={
                                                !formData.adviceCountUnknown
                                            }
                                            onChange={() =>
                                                handleChange(
                                                    "adviceCountUnknown",
                                                    false
                                                )
                                            }
                                        />
                                        ได้รับจำนวน
                                        <input
                                            type="number"
                                            className="border-b border-gray-300 w-16 text-center"
                                            value={formData.adviceCount}
                                            onChange={(e) => {
                                                handleChange(
                                                    "adviceCount",
                                                    e.target.value
                                                );
                                                handleChange(
                                                    "adviceCountUnknown",
                                                    false
                                                );
                                            }}
                                            disabled={
                                                formData.adviceCountUnknown
                                            }
                                        />
                                        ครั้ง
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="adviceCountType"
                                            checked={
                                                formData.adviceCountUnknown
                                            }
                                            onChange={() =>
                                                handleChange(
                                                    "adviceCountUnknown",
                                                    true
                                                )
                                            }
                                        />
                                        จำไม่ได้ว่ากี่ครั้ง
                                    </label>
                                </div>
                            )}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="adviceReceived"
                                    value="no"
                                    checked={formData.adviceReceived === "no"}
                                    onChange={(e) =>
                                        handleChange(
                                            "adviceReceived",
                                            e.target.value
                                        )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                ไม่ได้รับ
                            </label>
                        </div>
                    </div>

                    {/* 23. Advice Topics */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            23. จากข้อ 22
                            ท่านได้รับทราบข้อมูลคำแนะนำเกี่ยวกับโรคเบาหวานในเรื่องใดบ้าง
                        </label>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 focus:border-blue-500 outline-none"
                            rows={3}
                            value={formData.adviceTopics}
                            onChange={(e) =>
                                handleChange("adviceTopics", e.target.value)
                            }
                            placeholder="ระบุเรื่องที่ได้รับคำแนะนำ..."
                        />
                    </div>

                    {/* 24. Advice Sources */}
                    <div className="space-y-4">
                        <label className="font-semibold block">
                            24. จากข้อ 23
                            ท่านได้รับข้อมูลคำแนะนำเหล่านั้นจากใครหรือแหล่งใดบ้าง
                        </label>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-700">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-2">
                                            แหล่งข้อมูล
                                        </th>
                                        <th scope="col" className="px-4 py-2">
                                            {region === "phetchabun"
                                                ? "PCC คลองศาลา"
                                                : region === "lopburi"
                                                ? "รพ.ท่าวุ้ง"
                                                : region === "satun"
                                                ? "รพ.ละงู"
                                                : "รพ.ที่รักษา"}{" "}
                                            (ครั้ง)
                                        </th>
                                        <th scope="col" className="px-4 py-2">
                                            รพ.อื่น (ครั้ง)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            id: "doctor",
                                            label: "1. แพทย์ผู้ดูแลรักษา",
                                            pcc: "doctor_pcc",
                                            other: "doctor_other",
                                        },
                                        {
                                            id: "doctor2",
                                            label: "2. แพทย์ท่านอื่น",
                                            pcc: "doctor2_pcc",
                                            other: "doctor2_other",
                                        },
                                        {
                                            id: "nurse",
                                            label: "3. พยาบาล",
                                            pcc: "nurse_pcc",
                                            other: "nurse_other",
                                        },
                                        {
                                            id: "patient",
                                            label: "4. ผู้ป่วยด้วยกันเอง",
                                            pcc: "patient_pcc",
                                            other: "patient_other",
                                        },
                                        {
                                            id: "camp",
                                            label: "5. การเข้าค่ายเบาหวาน",
                                            pcc: "camp_pcc",
                                            other: "camp_other",
                                        },
                                        {
                                            id: "teaching",
                                            label: "6. จากห้องสอนแสดง",
                                            pcc: "teaching_pcc",
                                            other: "teaching_other",
                                        },
                                        {
                                            id: "pamphlet",
                                            label: "7. แผ่นพับ/โปสเตอร์",
                                            pcc: "pamphlet_pcc",
                                            other: "pamphlet_other",
                                        },
                                    ].map((row) => (
                                        <tr
                                            key={row.id}
                                            className="bg-white border-b"
                                        >
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                {row.label}
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    className="w-20 border rounded p-1"
                                                    value={
                                                        formData.adviceSources[
                                                            row.pcc as keyof typeof formData.adviceSources
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        handleAdviceSourceChange(
                                                            row.pcc,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    className="w-20 border rounded p-1"
                                                    value={
                                                        formData.adviceSources[
                                                            row.other as keyof typeof formData.adviceSources
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        handleAdviceSourceChange(
                                                            row.other,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Non-matrix sources */}
                            <div className="mt-4 space-y-2 pl-4">
                                <div className="flex items-center gap-2">
                                    <span>8. สื่อโทรทัศน์/วิทยุ จำนวน</span>
                                    <input
                                        type="number"
                                        className="border-b border-gray-300 w-16 text-center"
                                        value={formData.adviceSources.tv_radio}
                                        onChange={(e) =>
                                            handleAdviceSourceChange(
                                                "tv_radio",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span>ครั้ง</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>9. ทางอินเตอร์เน็ต จำนวน</span>
                                    <input
                                        type="number"
                                        className="border-b border-gray-300 w-16 text-center"
                                        value={formData.adviceSources.internet}
                                        onChange={(e) =>
                                            handleAdviceSourceChange(
                                                "internet",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span>ครั้ง</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>
                                        10. หนังสือพิมพ์/นิตยสาร/สิ่งพิมพ์ต่างๆ
                                        จำนวน
                                    </span>
                                    <input
                                        type="number"
                                        className="border-b border-gray-300 w-16 text-center"
                                        value={formData.adviceSources.newspaper}
                                        onChange={(e) =>
                                            handleAdviceSourceChange(
                                                "newspaper",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span>ครั้ง</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span>11. จากแหล่งอื่นๆ โปรดระบุ</span>
                                    <input
                                        type="text"
                                        className="border-b border-gray-300 w-40"
                                        value={
                                            formData.adviceSources
                                                .other_source_name
                                        }
                                        onChange={(e) =>
                                            handleAdviceSourceChange(
                                                "other_source_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span>จำนวน</span>
                                    <input
                                        type="number"
                                        className="border-b border-gray-300 w-16 text-center"
                                        value={
                                            formData.adviceSources
                                                .other_source_count
                                        }
                                        onChange={(e) =>
                                            handleAdviceSourceChange(
                                                "other_source_count",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span>ครั้ง</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 25. Peer Discussion */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            25. ระหว่างที่ท่านนั่ง รอพบแพทย์ท่านได้พูด
                            คุยแลกเปลี่ยนเรียนรู้ข้อมูล คำแนะนำกับผู้ป่วย
                            ด้วยกันเองบ้างหรือไม่ เรื่องอะไรบ้าง
                        </label>
                        <div className="space-y-2 pl-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="peerDiscussion"
                                    value="no"
                                    checked={formData.peerDiscussion === "no"}
                                    onChange={(e) =>
                                        handleChange(
                                            "peerDiscussion",
                                            e.target.value
                                        )
                                    }
                                />
                                ไม่ได้พูดคุยกัน
                            </label>
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="peerDiscussion"
                                    value="yes"
                                    checked={formData.peerDiscussion === "yes"}
                                    onChange={(e) =>
                                        handleChange(
                                            "peerDiscussion",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1"
                                />
                                <div className="flex-1">
                                    <span>
                                        ได้พูดคุยกัน
                                        โปรดระบุประเด็นที่ได้รับจากการพูดคุย
                                    </span>
                                    <textarea
                                        className="w-full border border-gray-300 rounded p-2 mt-1 focus:border-blue-500 outline-none"
                                        rows={2}
                                        value={formData.peerDiscussionTopic}
                                        onChange={(e) =>
                                            handleChange(
                                                "peerDiscussionTopic",
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            formData.peerDiscussion !== "yes"
                                        }
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* 26. Activities */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            26.
                            ท่านเคยเข้าร่วมกิจกรรมเกี่ยวกับโรคเบาหวานบ้างหรือไม่
                            อย่างไร
                        </label>
                        <div className="space-y-2 pl-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="activities"
                                    value="no"
                                    checked={formData.activities === "no"}
                                    onChange={(e) =>
                                        handleChange(
                                            "activities",
                                            e.target.value
                                        )
                                    }
                                />
                                ไม่เคย
                            </label>
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="activities"
                                    value="yes"
                                    checked={formData.activities === "yes"}
                                    onChange={(e) =>
                                        handleChange(
                                            "activities",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1"
                                />
                                <div className="flex-1">
                                    <span>
                                        เคย โปรดระบุกิจกรรมที่ท่านเคยเข้าร่วม
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                        value={formData.activitiesTopic}
                                        onChange={(e) =>
                                            handleChange(
                                                "activitiesTopic",
                                                e.target.value
                                            )
                                        }
                                        disabled={formData.activities !== "yes"}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* 27. Admissions */}
                    <div className="space-y-2">
                        <label className="font-semibold block">
                            27. ในรอบ 1
                            ปีที่ผ่านมาท่านเคยเข้ารับการรักษาตัวในโรงพยาบาล
                            ในแผนกฉุกเฉิน/แผนก ผู้ป่วยในบ้างหรือไม่
                        </label>
                        <div className="space-y-2 pl-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="admissions"
                                    value="no"
                                    checked={formData.admissions === "no"}
                                    onChange={(e) =>
                                        handleChange(
                                            "admissions",
                                            e.target.value
                                        )
                                    }
                                />
                                ไม่เคย
                            </label>
                            <label className="flex items-start gap-2 cursor-pointer flex-col">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="admissions"
                                        value="yes"
                                        checked={formData.admissions === "yes"}
                                        onChange={(e) =>
                                            handleChange(
                                                "admissions",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span>เคย จำนวน</span>
                                    <input
                                        type="number"
                                        className="border-b border-gray-300 w-16 text-center"
                                        value={formData.admissionCount}
                                        onChange={(e) =>
                                            handleChange(
                                                "admissionCount",
                                                e.target.value
                                            )
                                        }
                                        disabled={formData.admissions !== "yes"}
                                    />
                                    <span>ครั้ง</span>
                                </div>
                                {formData.admissions === "yes" && (
                                    <div className="w-full pl-6">
                                        <div className="mb-1">
                                            โปรดระบุสาเหตุที่ท่านต้องนอนโรงพยาบาล
                                        </div>
                                        <textarea
                                            className="w-full border border-gray-300 rounded p-2"
                                            rows={2}
                                            value={formData.admissionReason}
                                            onChange={(e) =>
                                                handleChange(
                                                    "admissionReason",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            </label>
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
