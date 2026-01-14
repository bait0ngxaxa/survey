import { regions } from "@/config/surveyData";
import { RegionCard } from "./RegionCard";

export function RegionCardsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {regions.map((region, index) => (
                <RegionCard key={region.id} region={region} index={index} />
            ))}
        </div>
    );
}
