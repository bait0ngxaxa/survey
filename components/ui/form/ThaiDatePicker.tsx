"use client";

import { useState, useCallback } from "react";

interface ThaiDatePickerProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

// Helper to parse CE date string to Buddhist Era parts
function parseDateValue(value: string) {
    if (!value) return { day: "", month: "", year: "" };
    const parsed = value.split("-");
    const ceYear = parsed[0] ? parseInt(parsed[0]) : undefined;
    return {
        day: parsed[2] || "",
        month: parsed[1] || "",
        year: ceYear ? String(ceYear + 543) : "",
    };
}

export default function ThaiDatePicker({
    value,
    onChange,
    className = "",
}: ThaiDatePickerProps) {
    const currentYear = new Date().getFullYear();
    const currentBuddhistYear = currentYear + 543;

    const initialParsed = parseDateValue(value);

    const [selectedDay, setSelectedDay] = useState(initialParsed.day);
    const [selectedMonth, setSelectedMonth] = useState(initialParsed.month);
    const [selectedYear, setSelectedYear] = useState(initialParsed.year);
    const [lastPropValue, setLastPropValue] = useState(value);

    // Reset state when prop value changes externally
    if (value !== lastPropValue) {
        const newParsed = parseDateValue(value);
        setSelectedDay(newParsed.day);
        setSelectedMonth(newParsed.month);
        setSelectedYear(newParsed.year);
        setLastPropValue(value);
    }

    const handleChange = useCallback(
        (day: string, month: string, buddhistYear: string) => {
            setSelectedDay(day);
            setSelectedMonth(month);
            setSelectedYear(buddhistYear);

            if (day && month && buddhistYear) {
                const ceYear = parseInt(buddhistYear) - 543;
                onChange(`${ceYear}-${month}-${day}`);
            }
        },
        [onChange]
    );

    const days = Array.from({ length: 31 }, (_, i) =>
        String(i + 1).padStart(2, "0")
    );

    const months = [
        { value: "01", label: "ม.ค." },
        { value: "02", label: "ก.พ." },
        { value: "03", label: "มี.ค." },
        { value: "04", label: "เม.ย." },
        { value: "05", label: "พ.ค." },
        { value: "06", label: "มิ.ย." },
        { value: "07", label: "ก.ค." },
        { value: "08", label: "ส.ค." },
        { value: "09", label: "ก.ย." },
        { value: "10", label: "ต.ค." },
        { value: "11", label: "พ.ย." },
        { value: "12", label: "ธ.ค." },
    ];

    // Years from 100 years ago to current year (in Buddhist Era)
    const years = Array.from(
        { length: 100 },
        (_, i) => currentBuddhistYear - i
    );

    const selectBaseClass =
        "border rounded-lg p-2 text-slate-900 border-slate-300 bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm sm:text-base";

    return (
        <div
            className={`flex flex-wrap sm:flex-nowrap gap-2 items-center ${className}`}
        >
            {/* Day */}
            <select
                value={selectedDay}
                onChange={(e) =>
                    handleChange(e.target.value, selectedMonth, selectedYear)
                }
                className={`${selectBaseClass} w-[70px] sm:w-auto`}
                aria-label="วัน"
            >
                <option value="">วัน</option>
                {days.map((d) => (
                    <option key={d} value={d}>
                        {parseInt(d)}
                    </option>
                ))}
            </select>

            {/* Month */}
            <select
                value={selectedMonth}
                onChange={(e) =>
                    handleChange(selectedDay, e.target.value, selectedYear)
                }
                className={`${selectBaseClass} w-[80px] sm:w-auto`}
                aria-label="เดือน"
            >
                <option value="">เดือน</option>
                {months.map((m) => (
                    <option key={m.value} value={m.value}>
                        {m.label}
                    </option>
                ))}
            </select>

            {/* Year (Buddhist Era) */}
            <select
                value={selectedYear}
                onChange={(e) =>
                    handleChange(selectedDay, selectedMonth, e.target.value)
                }
                className={`${selectBaseClass} w-[100px] sm:w-auto`}
                aria-label="ปี พ.ศ."
            >
                <option value="">ปี พ.ศ.</option>
                {years.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
        </div>
    );
}
