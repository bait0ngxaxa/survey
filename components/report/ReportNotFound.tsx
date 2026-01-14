import Link from "next/link";

export function ReportNotFound() {
    return (
        <div className="p-8 text-center text-gray-500">
            <h1 className="text-xl font-bold mb-4">
                ไม่พบข้อมูลรายงานสรุป (Report Data Not Found)
            </h1>
            <p>
                ข้อมูลการประเมินนี้อาจถูกบันทึกก่อนที่จะมีการปรับปรุงระบบรายงาน
            </p>
            <Link
                href="/admin/submissions"
                className="text-blue-600 hover:underline mt-4 block"
            >
                ย้อนกลับ
            </Link>
        </div>
    );
}
