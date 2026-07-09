import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getRegionColorStyles } from "@/config/regionStyles";

interface Region {
    id: string;
    name: string;
    color: string;
}

interface RegionCardProps {
    region: Region;
}

export function RegionCard({ region }: RegionCardProps) {
    const styles = getRegionColorStyles(region.color);

    return (
        <Link
            href={`/survey/${region.id}`}
            className="group relative flex min-h-56 flex-col overflow-hidden rounded-2xl proms-panel transition-colors duration-200 hover:border-sky-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
            aria-label={`เริ่มทำแบบสอบถาม ${region.name}`}
        >
            <div className={`h-1.5 ${styles.iconBg}`} />

            <div className="flex h-full flex-col p-6">
                <div className="mb-6 flex items-start">
                    <div className={`rounded-2xl p-3 ${styles.iconBg}`}>
                        <MapPin
                            className={`w-7 h-7 ${styles.iconText}`}
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <div className="mb-8 min-w-0 space-y-3">
                    <h2 className="text-xl font-black text-slate-900 thai-text leading-snug break-words group-hover:text-sky-700">
                        {region.name}
                    </h2>
                    <p className="text-sm text-slate-600 thai-text font-medium leading-relaxed">
                        เริ่มกรอกแบบสอบถามสำหรับพื้นที่นี้
                    </p>
                </div>

                <div className="mt-auto flex min-h-11 items-center justify-between gap-3 rounded-xl bg-sky-50 px-4 py-3 text-sm font-bold text-sky-800 ring-1 ring-sky-100 transition-colors duration-200 group-hover:bg-linear-to-r group-hover:from-sky-500 group-hover:via-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:ring-sky-600">
                    <span className="thai-text">เริ่มทำแบบสอบถาม</span>
                    <ArrowRight
                        className="w-4 h-4"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </Link>
    );
}
