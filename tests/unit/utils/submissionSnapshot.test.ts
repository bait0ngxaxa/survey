import { describe, expect, it } from "vitest";
import {
    getSubmissionNationalId,
    getSubmissionSnapshot,
} from "@/lib/utils/submissionSnapshot";

describe("Submission snapshot resolver", () => {
    it("uses snapshot values before raw answers and patient fallback", () => {
        const result = getSubmissionSnapshot({
            respondentNameSnapshot: "Snapshot Name",
            genderSnapshot: "Snapshot Gender",
            birthDateSnapshot: new Date("1990-01-01"),
            rawAnswers: {
                sectionTwo: {
                    respondentName: "Raw Name",
                    gender: "Raw Gender",
                    birthDate: "1980-01-01",
                },
            },
            patient: {
                firstName: "Patient",
                lastName: "Name",
                gender: "Patient Gender",
                birthDate: new Date("1970-01-01"),
                nationalId: "123",
            },
        });

        expect(result).toEqual({
            respondentName: "Snapshot Name",
            gender: "Snapshot Gender",
            birthDate: new Date("1990-01-01"),
        });
    });

    it("falls back to raw answers and then patient data for legacy submissions", () => {
        const result = getSubmissionSnapshot({
            respondentNameSnapshot: null,
            genderSnapshot: null,
            birthDateSnapshot: null,
            rawAnswers: {
                sectionTwo: {
                    respondentName: "Raw Name",
                    gender: "Raw Gender",
                    birthDate: "1980-01-01",
                },
            },
            patient: {
                firstName: "Patient",
                lastName: "Name",
                gender: "Patient Gender",
                birthDate: new Date("1970-01-01"),
            },
        });

        expect(result).toEqual({
            respondentName: "Raw Name",
            gender: "Raw Gender",
            birthDate: new Date("1980-01-01"),
        });

        expect(
            getSubmissionSnapshot({
                rawAnswers: {},
                patient: {
                    firstName: "Patient",
                    lastName: "Name",
                    gender: "Patient Gender",
                    birthDate: new Date("1970-01-01"),
                },
            }),
        ).toEqual({
            respondentName: "Patient Name",
            gender: "Patient Gender",
            birthDate: new Date("1970-01-01"),
        });
    });

    it("reads the optional national ID only from the legacy patient reference", () => {
        expect(
            getSubmissionNationalId({ patient: { nationalId: " 123 " } }),
        ).toBe("123");
        expect(getSubmissionNationalId({ patient: null })).toBeNull();
    });
});
