import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SectionTwoForm from "./SectionTwoForm";
import { type SectionTwoData } from "@/lib/types";

// Mock Child Components to simplify rendering (Shallow Render approach)
// We focus on SectionTwoForm logic (Validation call + Navigation), not children internal rendering.
vi.mock("@/components/survey", () => ({
    DemographicsSection: () => <div data-testid="demographics-section" />,
    DiabetesInfoSection: () => <div data-testid="diabetes-info-section" />,
    LivingSupportSection: () => <div data-testid="living-support-section" />,
    LifestyleSection: () => <div data-testid="lifestyle-section" />,
    HealthConditionsSection: () => (
        <div data-testid="health-conditions-section" />
    ),
}));

// Mock FormNavigation (Assuming it renders a Next button)
vi.mock("@/components/ui/form", () => ({
    FormSection: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    FormNavigation: ({ onNext }: { onNext: () => void }) => (
        <button onClick={onNext}>ถัดไป</button>
    ),
}));

// Mock useAlert
const mockShowAlert = vi.fn();
vi.mock("@/hooks", () => ({
    useAlert: () => ({
        isOpen: false,
        message: "",
        showAlert: mockShowAlert,
        closeAlert: vi.fn(),
    }),
    useFormField: (data: any) => ({
        handleChange: vi.fn(),
    }),
}));

// Mock Validation - Use vi.hoisted to share mock instance guaranteed
const { mockedValidateSectionTwo } = vi.hoisted(() => {
    return { mockedValidateSectionTwo: vi.fn() };
});

vi.mock("@/lib/validation", () => ({
    validateSectionTwo: mockedValidateSectionTwo,
}));

describe("SectionTwoForm Integration", () => {
    // Helper data
    const mockData = {
        respondentName: "Test",
    } as unknown as SectionTwoData; // Partial mock

    const mockOnChange = vi.fn();
    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should show alert if validation fails when clicking Next", () => {
        // Setup scenarios: Validation Fails
        mockedValidateSectionTwo.mockReturnValue({
            isValid: false,
            errors: ["Mock Error Message"],
        });

        render(
            <SectionTwoForm
                formData={mockData}
                onChange={mockOnChange}
                onNext={mockOnNext}
                onBack={mockOnBack}
            />,
        );

        // Click Next
        fireEvent.click(screen.getByText("ถัดไป"));

        // Expect Alert to be shown with error
        expect(mockShowAlert).toHaveBeenCalledWith("Mock Error Message");
        // Expect onNext NOT to be called
        expect(mockOnNext).not.toHaveBeenCalled();
    });

    it("should process next step if validation passes", () => {
        // Setup scenarios: Validation Passes
        mockedValidateSectionTwo.mockReturnValue({
            isValid: true,
            errors: [],
        });

        render(
            <SectionTwoForm
                formData={mockData}
                onChange={mockOnChange}
                onNext={mockOnNext}
                onBack={mockOnBack}
            />,
        );

        // Click Next
        fireEvent.click(screen.getByText("ถัดไป"));

        // Expect Alert NOT to be shown
        expect(mockShowAlert).not.toHaveBeenCalled();
        // Expect onNext TO be called
        expect(mockOnNext).toHaveBeenCalled();
    });
});
