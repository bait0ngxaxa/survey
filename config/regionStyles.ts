// Region Card Color Styles
// ใช้สำหรับ styling ของ region cards ใน dashboard

export interface ColorStyleConfig {
    border: string;
    shadow: string;
    blob: string;
    iconBg: string;
    iconText: string;
    iconGlow: string;
    button: string;
}

export const regionColorStyles: Record<string, ColorStyleConfig> = {
    "bg-blue-500": {
        border: "group-hover:to-blue-400 group-hover:from-blue-200",
        shadow: "hover:shadow-blue-500/20",
        blob: "bg-blue-50",
        iconBg: "bg-blue-50 group-hover:bg-blue-100",
        iconText: "text-blue-600",
        iconGlow: "bg-blue-200/30",
        button: "group-hover:bg-blue-600",
    },
    "bg-teal-500": {
        border: "group-hover:to-teal-400 group-hover:from-teal-200",
        shadow: "hover:shadow-teal-500/20",
        blob: "bg-teal-50",
        iconBg: "bg-teal-50 group-hover:bg-teal-100",
        iconText: "text-teal-600",
        iconGlow: "bg-teal-200/30",
        button: "group-hover:bg-teal-600",
    },
    "bg-orange-500": {
        border: "group-hover:to-orange-400 group-hover:from-orange-200",
        shadow: "hover:shadow-orange-500/20",
        blob: "bg-orange-50",
        iconBg: "bg-orange-50 group-hover:bg-orange-100",
        iconText: "text-orange-600",
        iconGlow: "bg-orange-200/30",
        button: "group-hover:bg-orange-600",
    },
    "bg-purple-500": {
        border: "group-hover:to-purple-400 group-hover:from-purple-200",
        shadow: "hover:shadow-purple-500/20",
        blob: "bg-purple-50",
        iconBg: "bg-purple-50 group-hover:bg-purple-100",
        iconText: "text-purple-600",
        iconGlow: "bg-purple-200/30",
        button: "group-hover:bg-purple-600",
    },
};

export function getRegionColorStyles(color: string): ColorStyleConfig {
    return regionColorStyles[color] || regionColorStyles["bg-blue-500"];
}
