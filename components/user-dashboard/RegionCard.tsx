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
    index: number;
}

export function RegionCard({ region, index }: RegionCardProps) {
    const styles = getRegionColorStyles(region.color);

    return (
        <Link
            href={`/survey/${region.id}`}
            className={`group relative rounded-3xl p-1 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${styles.shadow} border border-white/50 backdrop-blur-sm`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Gradient Border Effect */}
            <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 to-slate-100/60 transition-all duration-500 ${styles.border}`}
            />

            {/* Outer Glow on Hover */}
            <div
                className={`absolute inset-[-2px] rounded-3xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 ${styles.blob}`}
            />

            {/* Card Content */}
            <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-[1.4rem] p-8 flex flex-col items-center text-center overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                {/* Decorative Background Blob */}
                <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ${styles.blob}`}
                />
                <div
                    className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 delay-100 ${styles.blob}`}
                />

                {/* Icon with Enhanced Glow */}
                <div
                    className={`relative mb-6 p-5 rounded-2xl transition-all duration-300 group-hover:scale-105 ${styles.iconBg}`}
                >
                    <MapPin
                        className={`w-10 h-10 transition-transform duration-300 group-hover:scale-110 ${styles.iconText}`}
                    />
                    <div
                        className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.iconGlow}`}
                    />
                    {/* Pulse ring effect */}
                    <div
                        className={`absolute inset-[-4px] rounded-2xl border-2 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${styles.iconText} border-current`}
                    />
                </div>

                {/* Text */}
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 relative z-10 transition-colors duration-300">
                    {region.name}
                </h2>

                <p className="text-sm text-slate-500 mb-8 relative z-10">
                    คลิกเพื่อเข้าสู่แบบสอบถาม
                    <br />
                    สำหรับพื้นที่นี้
                </p>

                {/* Button-like CTA with Enhanced Effects */}
                <div
                    className={`mt-auto relative z-10 px-8 py-3 rounded-full bg-slate-50/80 backdrop-blur-sm text-slate-600 text-sm font-semibold group-hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm group-hover:shadow-lg ${styles.button}`}
                >
                    เลือกพื้นที่นี้
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
