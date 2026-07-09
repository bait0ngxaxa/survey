import { Search } from "lucide-react";

export function EmptyState() {
    return (
        <div className="text-center py-16 px-6 proms-panel rounded-2xl border-dashed">
            <div className="proms-primary-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200/70">
                <Search className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 thai-text">
                ไม่พบรายการที่ค้นหา
            </h3>
            <p className="text-slate-600 text-sm mt-1 thai-text">
                ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองใหม่อีกครั้ง
            </p>
        </div>
    );
}
