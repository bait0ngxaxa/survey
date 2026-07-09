import Link from "next/link";

export function ReportNotFound() {
    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center text-amber-900">
            <h1 className="text-xl font-bold mb-4 thai-text">
                ไม่พบข้อมูลรายงานสรุป
            </h1>
            <p className="thai-text">
                ข้อมูลการประเมินนี้อาจถูกบันทึกก่อนที่จะมีการปรับปรุงระบบรายงาน
            </p>
            <Link
                href="/admin/submissions"
                className="inline-flex mt-4 rounded-xl bg-white px-4 py-2 font-semibold text-amber-900 ring-1 ring-amber-200 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
            >
                ย้อนกลับ
            </Link>
        </div>
    );
}
