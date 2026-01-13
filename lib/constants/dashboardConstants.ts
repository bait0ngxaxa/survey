export interface DashboardRegion {
    id: string;
    name: string;
    color: string;
    bg: string;
    border: string;
    hoverutils: string;
    iconBg: string;
}

export const DASHBOARD_REGIONS: DashboardRegion[] = [
    {
        id: "central",
        name: "บริบทคนไทยทีมกลาง",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        hoverutils:
            "group-hover:border-blue-300 group-hover:shadow-blue-500/20",
        iconBg: "bg-blue-100 group-hover:bg-blue-200",
    },
    {
        id: "phetchabun",
        name: "บริบทพื้นที่เพชรบูรณ์",
        color: "text-teal-600",
        bg: "bg-teal-50",
        border: "border-teal-100",
        hoverutils:
            "group-hover:border-teal-300 group-hover:shadow-teal-500/20",
        iconBg: "bg-teal-100 group-hover:bg-teal-200",
    },
    {
        id: "satun",
        name: "บริบทพื้นที่สตูล",
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-100",
        hoverutils:
            "group-hover:border-orange-300 group-hover:shadow-orange-500/20",
        iconBg: "bg-orange-100 group-hover:bg-orange-200",
    },
    {
        id: "lopburi",
        name: "บริบทพื้นที่ลพบุรี",
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        hoverutils:
            "group-hover:border-purple-300 group-hover:shadow-purple-500/20",
        iconBg: "bg-purple-100 group-hover:bg-purple-200",
    },
];
