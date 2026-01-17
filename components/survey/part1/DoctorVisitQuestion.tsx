import { TextInput } from "@/components/ui/form";
import { type Part1Data } from "@/lib/types";

interface DoctorVisitQuestionProps {
    part1Data: Part1Data;
    onPart1Change: (field: keyof Part1Data, value: string) => void;
}

export default function DoctorVisitQuestion({
    part1Data,
    onPart1Change,
}: DoctorVisitQuestionProps) {
    const isEveryTime = part1Data.visitDoctor === "ทุกครั้ง";
    const isNotEveryTime = part1Data.visitDoctor === "ไม่ทุกครั้ง";

    return (
        <div className="space-y-4">
            <label className="text-xl font-bold text-slate-800 block">
                2. ท่านมาพบแพทย์ตามนัดทุกครั้งหรือไม่
            </label>
            <div className="space-y-4 pt-2">
                {/* Option 1: Every time */}
                <div
                    className={`transition-all duration-300 rounded-xl border p-4 ${
                        isEveryTime
                            ? "bg-sky-50 border-sky-200 shadow-sm"
                            : "bg-white border-slate-200 hover:border-sky-200"
                    }`}
                >
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                name="visitDoctor"
                                value="ทุกครั้ง"
                                checked={isEveryTime}
                                onChange={(e) =>
                                    onPart1Change("visitDoctor", e.target.value)
                                }
                                className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                            />
                            <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-slate-800 font-medium text-lg">
                            1. ทุกครั้ง
                        </span>
                    </label>
                </div>

                {/* Option 2: Not every time */}
                <div
                    className={`transition-all duration-300 rounded-xl border p-4 ${
                        isNotEveryTime
                            ? "bg-sky-50 border-sky-200 shadow-sm"
                            : "bg-white border-slate-200 hover:border-sky-200"
                    }`}
                >
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                name="visitDoctor"
                                value="ไม่ทุกครั้ง"
                                checked={isNotEveryTime}
                                onChange={(e) =>
                                    onPart1Change("visitDoctor", e.target.value)
                                }
                                className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-sky-500 checked:bg-sky-500 transition-all focus:ring-4 focus:ring-sky-100 outline-none"
                            />
                            <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-slate-800 font-medium text-lg">
                            2. ไม่ทุกครั้ง เพราะ
                        </span>
                    </label>

                    {isNotEveryTime && (
                        <div className="mt-4 ml-8 animate-in fade-in slide-in-from-top-2">
                            <TextInput
                                type="textarea"
                                value={part1Data.notVisitReason}
                                onChange={(v) =>
                                    onPart1Change("notVisitReason", v)
                                }
                                placeholder="ระบุสาเหตุ..."
                                rows={3}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
