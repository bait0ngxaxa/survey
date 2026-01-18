import { describe, it, expect } from "vitest";
import {
    translateRegion,
    formatBirthDateThai,
    formatWithOther,
} from "./helpers";

describe("Export Helpers", () => {
    describe("translateRegion", () => {
        it("should translate 'central' to 'ทีมกลาง'", () => {
            expect(translateRegion("central")).toBe("ทีมกลาง");
        });

        it("should return original value for unknown region", () => {
            expect(translateRegion("unknown")).toBe("unknown");
        });
    });

    describe("formatBirthDateThai", () => {
        it("should format YYYY-MM-DD to DD/MM/YYYY Buddhist Era", () => {
            expect(formatBirthDateThai("1990-01-01")).toBe("01/01/2533");
        });

        it("should return original string if format is invalid", () => {
            expect(formatBirthDateThai("invalid")).toBe("invalid");
        });

        it("should return empty string if input is undefined", () => {
            expect(formatBirthDateThai(undefined)).toBe("");
        });
    });

    describe("formatWithOther", () => {
        it("should return value if not 'Other'", () => {
            expect(formatWithOther("Student", undefined)).toBe("Student");
        });

        it("should return otherValue if value is 'Other'", () => {
            expect(formatWithOther("อื่น ๆ", "Other details")).toBe(
                "อื่น ๆ: Other details",
            );
        });

        it("should handle custom label for Other", () => {
            expect(
                formatWithOther("CustomOther", "Details", "CustomOther"),
            ).toBe("CustomOther: Details");
        });
    });
});
