import { type AdditionalInfoData } from "@/lib/types";

interface AdditionalInfoGroup9Props {
    additionalInfo: AdditionalInfoData;
    onAdditionalInfoChange: (key: string, value: string) => void;
}

export default function AdditionalInfoGroup9({
    additionalInfo,
    onAdditionalInfoChange,
}: AdditionalInfoGroup9Props) {
    return (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 animate-in fade-in">
            <h3 className="text-lg font-bold text-sky-800 mb-2">
                ข้อมูลเพิ่มเติม
            </h3>
            <label className="block text-gray-700 mb-2">
                ต้องการทราบเรื่องใดเพิ่มเติม:
            </label>
            <textarea
                value={String(additionalInfo?.q9Topic || "")}
                onChange={(e) =>
                    onAdditionalInfoChange("q9Topic", e.target.value)
                }
                className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 placeholder:text-slate-400"
                rows={3}
                placeholder="ระบุเรื่องที่ต้องการทราบ..."
            />
        </div>
    );
}
