export interface CentralGroup {
    id: number;
    questionsLabel: string;
    label: string;
    dimension: string;
}

export const CENTRAL_GROUPS: CentralGroup[] = [
    {
        id: 1,
        questionsLabel: "1",
        label: "ข้อที่ 1\nความสามารถทำกิจวัตรประจำวัน",
        dimension: "การทำงาน\nของร่างกาย",
    },
    {
        id: 2,
        questionsLabel: "2-3",
        label: "ข้อที่ 2-3\nการเคลื่อนไหว / ความทนทาน",
        dimension: "การทำงาน\nของร่างกาย",
    },
    {
        id: 3,
        questionsLabel: "4-7",
        label: "ข้อที่ 4-7\nความรุนแรงของอาการ",
        dimension: "อาการของโรค",
    },
    {
        id: 4,
        questionsLabel: "8-10",
        label: "ข้อที่ 8-10\nความกังวล/ผลกระทบทางใจ",
        dimension: "สุขภาพจิตใจ",
    },
    {
        id: 5,
        questionsLabel: "11,12,14,16",
        label: "ข้อที่ 11, 12, 14, 16\nการจัดการโรค/พฤติกรรมสุขภาพ",
        dimension: "การดูแลตนเอง",
    },
    {
        id: 6,
        questionsLabel: "13,15",
        label: "ข้อที่ 13, 15\nการตัดสินใจ/การรับมือ",
        dimension: "การดูแลตนเอง",
    },
    {
        id: 7,
        questionsLabel: "17-20",
        label: "ข้อที่ 17-20\nบทบาททางสังคม/ความเครียด",
        dimension: "สังคม",
    },
    {
        id: 8,
        questionsLabel: "21-23",
        label: "ข้อที่ 21-23\nการประเมินสุขภาพตนเอง",
        dimension: "สุขภาพโดยรวม",
    },
    {
        id: 9,
        questionsLabel: "24-26",
        label: "ข้อที่ 24-26\nความเข้าใจ/ข้อมูลการรักษา",
        dimension: "ความพึงพอใจ",
    },
    {
        id: 10,
        questionsLabel: "27-29",
        label: "ข้อที่ 27-29\nการตัดสินใจ/ความยืดหยุ่น",
        dimension: "ความพึงพอใจ",
    },
];

/**
 * คำนวณจำนวน rows ของแต่ละ dimension สำหรับ rowSpan
 */
export function getDimensionCounts(
    groups: CentralGroup[]
): Record<string, number> {
    const counts: Record<string, number> = {};
    groups.forEach((g) => {
        counts[g.dimension] = (counts[g.dimension] || 0) + 1;
    });
    return counts;
}
