import { TextInput } from "@/components/ui/form";
import { type Part1Data } from "@/lib/types";

interface BloodSugarQuestionProps {
    part1Data: Part1Data;
    onPart1Change: (field: keyof Part1Data, value: string) => void;
}

export default function BloodSugarQuestion({
    part1Data,
    onPart1Change,
}: BloodSugarQuestionProps) {
    const isKnown = part1Data.bloodSugarKnown === "ทราบ";
    const isUnknown = part1Data.bloodSugarKnown === "ไม่ทราบ";

    return (
        <div className="space-y-4">
            <label className="text-xl font-bold text-slate-800 block">
                1.
                ท่านทราบผลการตรวจระดับน้ำตาลในเลือดและค่าน้ำตาลสะสมของท่านในครั้งนี้หรือไม่
                อย่างไร
            </label>
            <div className="space-y-4 pt-2">
                {/* Option 1: Known */}
                <div
                    className={`transition-all duration-300 rounded-xl border p-4 ${
                        isKnown
                            ? "bg-sky-50 border-sky-200 shadow-sm"
                            : "bg-white border-slate-200 hover:border-sky-200"
                    }`}
                >
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                name="bloodSugarKnown"
                                value="ทราบ"
                                checked={isKnown}
                                onChange={(e) =>
                                    onPart1Change(
                                        "bloodSugarKnown",
                                        e.target.value
                                    )
                                }
                                className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                            />
                            <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-slate-800 font-medium text-lg">
                            1. ทราบ
                        </span>
                    </label>

                    {isKnown && (
                        <div className="mt-4 ml-8 space-y-4 animate-in fade-in slide-in-from-top-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <span className="text-slate-600 min-w-[220px]">
                                    1.1 ระดับน้ำตาลในเลือด (Fasting) =
                                </span>
                                <TextInput
                                    value={part1Data.fastingLevel}
                                    onChange={(v) =>
                                        onPart1Change("fastingLevel", v)
                                    }
                                    inline
                                    placeholder="ระบุค่า"
                                    inputClassName="w-32"
                                />
                                <span className="text-slate-500 text-sm">
                                    mg/dl
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <span className="text-slate-600 min-w-[220px]">
                                    1.2 ระดับน้ำตาลสะสม (HbA1c) =
                                </span>
                                <TextInput
                                    value={part1Data.hba1cLevel}
                                    onChange={(v) =>
                                        onPart1Change("hba1cLevel", v)
                                    }
                                    inline
                                    placeholder="ระบุค่า"
                                    inputClassName="w-32"
                                />
                                <span className="text-slate-500 text-sm">
                                    %
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Option 2: Unknown */}
                <div
                    className={`transition-all duration-300 rounded-xl border p-4 ${
                        isUnknown
                            ? "bg-sky-50 border-sky-200 shadow-sm"
                            : "bg-white border-slate-200 hover:border-sky-200"
                    }`}
                >
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                name="bloodSugarKnown"
                                value="ไม่ทราบ"
                                checked={isUnknown}
                                onChange={(e) =>
                                    onPart1Change(
                                        "bloodSugarKnown",
                                        e.target.value
                                    )
                                }
                                className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                            />
                            <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-slate-800 font-medium text-lg">
                            2. ไม่ทราบ
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}
