import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RetryCheckForm } from "./RetryCheckForm";

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(() => ({
    serviceAddress: null,
  })),
}));

describe("RetryCheckForm", () => {
  const mockOnSubmit = vi.fn();
  const user = userEvent.setup({ delay: null });

  const renderComponent = () => {
    return render(<RetryCheckForm onSubmit={mockOnSubmit} />);
  };

  const renderWithSubmitButton = () => {
    return render(
      <div>
        <RetryCheckForm onSubmit={mockOnSubmit} />
        <button type="submit" form="retryCheckForm">
          Submit
        </button>
      </div>,
    );
  };

  const fillValidDOB = async () => {
    const dayInput = screen.getByRole("textbox", { name: /day/i });
    const monthInput = screen.getByRole("textbox", { name: /month/i });
    const yearInput = screen.getByRole("textbox", { name: /year/i });

    await user.type(dayInput, "15");
    await user.type(monthInput, "06");
    await user.type(yearInput, "1990");
  };

  const fillValidAddress = async () => {
    const addressLine1Input = screen.getByRole("textbox", {
      name: /house number/i,
    });
    const addressLine2Input = screen.getByRole("textbox", {
      name: /first line/i,
    });
    const addressLine3Input = screen.getByRole("textbox", {
      name: /second line/i,
    });
    const postcodeInput = screen.getByRole("textbox", { name: /postcode/i });

    await user.type(addressLine1Input, "123");
    await user.type(addressLine2Input, "Test Area");
    await user.type(addressLine3Input, "Test City");
    await user.type(postcodeInput, "TE1 1ST");
  };

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.showModal = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

  describe("Initial render", () => {
    it("should render the form with all required elements", () => {
      renderComponent();

      expect(
        screen.getByText("Please confirm the account holder's date of birth:"),
      ).toBeInTheDocument();
      expect(screen.getByText("The address you gave us.")).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /day/i })).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /month/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /year/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: /more than 1 year/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: /less than 1 year/i }),
      ).toBeInTheDocument();
    });

    it("should render address modal button", () => {
      renderComponent();

      expect(
        screen.getByRole("button", {
          name: "Why we ask for your address history?",
        }),
      ).toBeInTheDocument();
    });

    it("should not show address fields initially", () => {
      renderComponent();

      expect(
        screen.queryByRole("textbox", { name: /house number/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("textbox", { name: /first line/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("textbox", { name: /second line/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("textbox", { name: /postcode/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("Date of birth inputs", () => {
    it("should handle DOB input focus management", async () => {
      renderComponent();

      const dayInput = screen.getByRole("textbox", { name: /day/i });
      const monthInput = screen.getByRole("textbox", { name: /month/i });
      const yearInput = screen.getByRole("textbox", { name: /year/i });

      await user.type(dayInput, "15");
      expect(monthInput).toHaveFocus();

      await user.type(monthInput, "12");
      expect(yearInput).toHaveFocus();
    });

    it("should handle backspace navigation in DOB fields", async () => {
      renderComponent();

      const dayInput = screen.getByRole("textbox", { name: /day/i });
      const monthInput = screen.getByRole("textbox", { name: /month/i });
      const yearInput = screen.getByRole("textbox", { name: /year/i });

      await user.type(monthInput, "1");
      await user.type(monthInput, "{backspace}");

      expect(dayInput).toHaveFocus();

      await user.type(yearInput, "1");
      await user.type(yearInput, "{backspace}");

      expect(monthInput).toHaveFocus();
    });
  });

  describe("Residency duration selection", () => {
    it("should show address fields when 'under-year' is selected", async () => {
      renderComponent();

      const underYearRadio = screen.getByRole("radio", {
        name: /less than 1 year/i,
      });
      await user.click(underYearRadio);

      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: /house number/i }),
        ).toBeInTheDocument();
      });
      expect(
        screen.getByRole("textbox", { name: /first line/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /second line/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /postcode/i }),
      ).toBeInTheDocument();
    });

    it("should hide address fields when 'over-year' is selected", async () => {
      renderComponent();

      const underYearRadio = screen.getByRole("radio", {
        name: /less than 1 year/i,
      });
      const overYearRadio = screen.getByRole("radio", {
        name: /more than 1 year/i,
      });

      await user.click(underYearRadio);
      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: /house number/i }),
        ).toBeInTheDocument();
      });

      await user.click(overYearRadio);
      await waitFor(() => {
        expect(
          screen.queryByRole("textbox", { name: /house number/i }),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Address modal", () => {
    it("should open modal when button is clicked", async () => {
      renderComponent();

      expect(
        screen.queryByRole("dialog", {
          name: "Why we ask for your address history",
        }),
      ).not.toBeInTheDocument();

      const modalButton = screen.getByRole("button", {
        name: "Why we ask for your address history?",
      });
      await user.click(modalButton);

      const modal = screen.getByRole("dialog", {
        name: "Why we ask for your address history",
      }) as HTMLDialogElement;

      expect(modal).toBeInTheDocument();
      expect(modal.open).toBe(true);
    });
  });

  describe("Form submission", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2025, 1, 1));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should submit form with valid data when over-year is selected", async () => {
      renderWithSubmitButton();

      await fillValidDOB();

      const overYearRadio = screen.getByRole("radio", {
        name: /more than 1 year/i,
      });
      await user.click(overYearRadio);

      await waitFor(() => {
        expect(overYearRadio).toBeChecked();
      });

      const submitButton = screen.getByRole("button", { name: "Submit" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          dobDay: "15",
          dobMonth: "06",
          dobYear: "1990",
          residencyDuration: "over-year",
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          postcode: "",
        });
      });
    });

    it("should submit form with valid data when under-year is selected", async () => {
      renderWithSubmitButton();

      await fillValidDOB();

      const underYearRadio = screen.getByRole("radio", {
        name: /less than 1 year/i,
      });
      await user.click(underYearRadio);

      await fillValidAddress();

      const submitButton = screen.getByRole("button", { name: "Submit" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          dobDay: "15",
          dobMonth: "06",
          dobYear: "1990",
          residencyDuration: "under-year",
          addressLine1: "123",
          addressLine2: "Test Area",
          addressLine3: "Test City",
          postcode: "TE1 1ST",
        });
      });
    });

    it("should not submit when form is invalid", async () => {
      renderWithSubmitButton();

      const submitButton = screen.getByRole("button", { name: "Submit" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it("should show validation errors for invalid DOB", async () => {
      renderWithSubmitButton();

      const dayInput = screen.getByRole("textbox", { name: /day/i });
      await user.type(dayInput, "32");

      const submitButton = screen.getByRole("button", { name: "Submit" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid date"),
        ).toBeInTheDocument();
      });
    });

    it("should show validation error for a date of birth that is under 18 years old", async () => {
      renderWithSubmitButton();

      const dayInput = screen.getByRole("textbox", { name: /day/i });
      const monthInput = screen.getByRole("textbox", { name: /month/i });
      const yearInput = screen.getByRole("textbox", { name: /year/i });

      await user.type(dayInput, "15");
      await user.type(monthInput, "06");
      await user.type(yearInput, "2010");

      const submitButton = screen.getByRole("button", { name: "Submit" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("You must be at least 18 years old"),
        ).toBeInTheDocument();
      });
    });

    it("should show validation error for missing residency duration", async () => {
      renderWithSubmitButton();

      await fillValidDOB();

      const submitButton = screen.getByRole("button", { name: "Submit" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Residency duration is required"),
        ).toBeInTheDocument();
      });
    });

    it("should show validation errors for missing address fields when under-year is selected", async () => {
      renderWithSubmitButton();

      await fillValidDOB();

      const underYearRadio = screen.getByRole("radio", {
        name: /less than 1 year/i,
      });
      await user.click(underYearRadio);

      const submitButton = screen.getByRole("button", { name: "Submit" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getAllByText("Address is required")).toHaveLength(4);
      });
    });
  });
});
