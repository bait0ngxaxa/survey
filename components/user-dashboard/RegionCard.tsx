import Link from "next/link";
import { MapPin, ArrowRight, Activity } from "lucide-react";
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
            className={`group relative rounded-[2rem] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden bg-white border border-slate-200/60`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Background Structural Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ 
                    backgroundImage: `radial-gradient(#0ea5e9 0.5px, transparent 0.5px)`, 
                    backgroundSize: '16px 16px' 
                }} />
            </div>

            {/* Region Accent Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${styles.iconBg}`} />

            {/* Main Content */}
            <div className="relative p-8 flex flex-col items-center lg:items-start text-center lg:text-left h-full">
                {/* Visual Header */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full mb-8 gap-4">
                    <div className={`relative p-4 rounded-2xl ${styles.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                        <MapPin className={`w-8 h-8 ${styles.iconText}`} />
                        <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${styles.iconGlow}`} />
                    </div>
                    
                    <div className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-200 hidden lg:flex items-center gap-2">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Ready</span>
                    </div>
                </div>

                {/* Typography */}
                <div className="space-y-3 mb-10 w-full">
                    <h2 className="text-2xl font-black text-slate-800 thai-text tracking-tight group-hover:text-sky-600 transition-colors duration-300">
                        {region.name}
                    </h2>
                    <div className="h-0.5 w-12 bg-slate-100 group-hover:w-20 group-hover:bg-sky-500 transition-all duration-500" />
                    <p className="text-sm text-slate-500 thai-text font-medium leading-relaxed">
                        ระบบจัดการแบบสอบถาม <br />
                        ประจำเขตสุขภาพ
                    </p>
                </div>

                {/* Interactive CTA */}
                <div className="mt-auto w-full">
                    <div className={`w-full py-3 px-6 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold flex items-center justify-center lg:justify-between group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all duration-300 shadow-sm`}>
                        <span className="thai-text">เลือกพื้นที่</span>
                        <ArrowRight className="w-4 h-4 ml-2 lg:ml-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>

            {/* Corner Metadata Decor */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">REG_ID: {region.id.toUpperCase()}</span>
            </div>
        </Link>
    );
}
