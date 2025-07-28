import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { ManualAddressForm } from "./index";

const flatAddressSchema = z.object({
  line1: z.string().min(1, "House number is required"),
  line2: z.string().min(1, "First line of your address is required"),
  line3: z.string().min(1, "Second line of your address is required"),
  postcode: z
    .string()
    .min(6, "Postcode is required")
    .regex(
      /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i,
      "Please enter a valid UK postcode",
    ),
});

const nestedAddressSchema = z.object({
  addressHistory: z.object({
    line1: z.string().min(1, "House number is required"),
    line2: z.string().min(1, "First line of your address is required"),
    line3: z.string().min(1, "Second line of your address is required"),
    postcode: z
      .string()
      .min(6, "Postcode is required")
      .regex(
        /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i,
        "Please enter a valid UK postcode",
      ),
  }),
});

const defaultValues = {
  line1: "",
  line2: "",
  line3: "",
  postcode: "",
};

const nestedDefaultValues = {
  addressHistory: {
    line1: "",
    line2: "",
    line3: "",
    postcode: "",
  },
};

const fillAndSubmit = async (
  user: ReturnType<typeof userEvent.setup>,
  fields: Record<string, string>,
) => {
  for (const [label, value] of Object.entries(fields)) {
    const input = screen.getByLabelText(label);
    await user.clear(input);
    await user.type(input, value);
  }

  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);
};

const ManualAddressFormWithSubmit = (
  props: React.ComponentProps<typeof ManualAddressForm>,
) => (
  <>
    <ManualAddressForm {...props} />
    <button type="submit" form={props.formId || "testForm"}>
      Submit
    </button>
  </>
);

describe("ManualAddressForm", () => {
  describe("Flat Schema (Billing Address)", () => {
    it("renders form with correct fields", () => {
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId="testForm"
        />,
      );

      expect(screen.getByLabelText("House number/name")).toBeInTheDocument();
      expect(
        screen.getByLabelText("First line of your address"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Second line of your address"),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /submit/i }),
      ).toBeInTheDocument();
    });

    it("calls onSubmit with valid data", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId="testForm"
        />,
      );

      await fillAndSubmit(user, {
        "House number/name": "123",
        "First line of your address": "Test Street",
        "Second line of your address": "Test Area",
        Postcode: "EC1A 1BB",
      });

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            line1: "123",
            line2: "Test Street",
            line3: "Test Area",
            postcode: "EC1A 1BB",
          }),
        );
      });
    });

    it("shows validation errors for empty required fields", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId="testForm"
        />,
      );

      await user.type(screen.getByLabelText("House number/name"), "123");
      await user.type(
        screen.getByLabelText("First line of your address"),
        "Test Street",
      );

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        const line3Input = screen.getByLabelText("Second line of your address");
        const postcodeInput = screen.getByLabelText("Postcode");

        expect(line3Input).toHaveAttribute("aria-invalid", "true");
        expect(postcodeInput).toHaveAttribute("aria-invalid", "true");
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("shows postcode format error for invalid postcode", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId="testForm"
        />,
      );

      await fillAndSubmit(user, {
        "House number/name": "123",
        "First line of your address": "Test Street",
        "Second line of your address": "Test Area",
        Postcode: "123456",
      });

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid UK postcode"),
        ).toBeInTheDocument();
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("renders with custom title", () => {
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId="testForm"
          title="Custom Address Form"
        />,
      );

      expect(screen.getByText("Custom Address Form")).toBeInTheDocument();
    });

    it("renders with custom field placeholders", () => {
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId="testForm"
          fieldPlaceholders={{
            line1: "Custom House Number",
            line2: "Custom Street",
            line3: "Custom City",
            postcode: "Custom Postcode",
          }}
        />,
      );

      expect(
        screen.getByPlaceholderText("Custom House Number"),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Custom Street")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Custom City")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Custom Postcode"),
      ).toBeInTheDocument();
    });
  });

  describe("Nested Schema (Address History)", () => {
    it("renders form with nested field prefix", () => {
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={nestedAddressSchema}
          defaultValues={nestedDefaultValues}
          onSubmit={onSubmit}
          formId="testForm"
          fieldPrefix="addressHistory"
        />,
      );

      expect(screen.getByLabelText("House number/name")).toBeInTheDocument();
      expect(
        screen.getByLabelText("First line of your address"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Second line of your address"),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /submit/i }),
      ).toBeInTheDocument();
    });

    it("calls onSubmit with nested data structure", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={nestedAddressSchema}
          defaultValues={nestedDefaultValues}
          onSubmit={onSubmit}
          formId="testForm"
          fieldPrefix="addressHistory"
        />,
      );

      await fillAndSubmit(user, {
        "House number/name": "456",
        "First line of your address": "History Street",
        "Second line of your address": "History Area",
        Postcode: "SW1A 1AA",
      });

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            addressHistory: {
              line1: "456",
              line2: "History Street",
              line3: "History Area",
              postcode: "SW1A 1AA",
            },
          }),
        );
      });
    });

    it("shows validation errors for nested fields", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={nestedAddressSchema}
          defaultValues={nestedDefaultValues}
          onSubmit={onSubmit}
          formId="testForm"
          fieldPrefix="addressHistory"
        />,
      );

      await user.type(screen.getByLabelText("House number/name"), "123");
      await user.type(
        screen.getByLabelText("First line of your address"),
        "Test Street",
      );

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        const line3Input = screen.getByLabelText("Second line of your address");
        const postcodeInput = screen.getByLabelText("Postcode");

        expect(line3Input).toHaveAttribute("aria-invalid", "true");
        expect(postcodeInput).toHaveAttribute("aria-invalid", "true");
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("Form Behavior", () => {
    it("handles external isSubmitting state", () => {
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId="testForm"
          isSubmitting={true}
        />,
      );

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("aria-busy", "true");
    });

    it("handles form without onSubmit", () => {
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          formId="testForm"
        />,
      );

      expect(screen.getByRole("form")).toBeInTheDocument();
    });

    it("renders without formId", () => {
      const onSubmit = vi.fn();
      render(
        <ManualAddressFormWithSubmit
          schema={flatAddressSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />,
      );

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      expect(form).not.toHaveAttribute("id");
    });
  });
});
