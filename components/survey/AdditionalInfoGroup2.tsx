import { AdditionalInfoData } from "@/lib/types";

interface AdditionalInfoGroup2Props {
    additionalInfo: AdditionalInfoData;
    onAdditionalInfoChange: (key: string, value: boolean) => void;
}

export default function AdditionalInfoGroup2({
    additionalInfo,
    onAdditionalInfoChange,
}: AdditionalInfoGroup2Props) {
    return (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 animate-in fade-in">
            <h3 className="text-lg font-bold text-sky-800 mb-4">
                ข้อมูลเพิ่มเติม (เนื่องจากผลลัพธ์ต่ำ)
            </h3>
            <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={additionalInfo?.movementLimit || false}
                        onChange={(e) =>
                            onAdditionalInfoChange(
                                "movementLimit",
                                e.target.checked
                            )
                        }
                        className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500"
                    />
                    <span className="text-gray-800">
                        มีข้อจำกัดด้านการเคลื่อนไหว
                    </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={additionalInfo?.tired || false}
                        onChange={(e) =>
                            onAdditionalInfoChange("tired", e.target.checked)
                        }
                        className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500"
                    />
                    <span className="text-gray-800">ออกแรงแล้วเหนื่อย</span>
                </label>
            </div>
        </div>
    );
}
