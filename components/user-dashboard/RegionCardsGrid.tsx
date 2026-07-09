import { regions } from "@/config/surveyData";
import { RegionCard } from "./RegionCard";

export function RegionCardsGrid() {
    return (
        <section aria-labelledby="region-grid-title" className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                    <h2
                        id="region-grid-title"
                        className="text-xl font-black text-slate-900 thai-text"
                    >
                        เลือกเขตสุขภาพ
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 thai-text">
                        เลือกพื้นที่ที่ต้องการบันทึกแบบสอบถาม ระบบจะพาไปยังแบบฟอร์มของเขตนั้น
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {regions.map((region) => (
                    <RegionCard key={region.id} region={region} />
                ))}
            </div>
        </section>
    );
}
