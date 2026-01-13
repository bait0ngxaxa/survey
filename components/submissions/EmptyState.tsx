import { Search } from "lucide-react";

export function EmptyState() {
    return (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
                ไม่พบรายการที่ค้นหา
            </h3>
            <p className="text-slate-500 text-sm mt-1">
                ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองใหม่อีกครั้ง
            </p>
        </div>
    );
}
