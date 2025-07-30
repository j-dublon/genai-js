import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { vi } from "vitest";

import { PaymentForm } from "./PaymentForm";

const mockSetPaymentDetails = vi.fn();
const mockOnSubmit = vi.fn();

let setValueMock = vi.fn();

const mockUseForm = () => {
  return {
    register: (name: string) => {
      if (name === "isAccountHolder") {
        return {
          name,
          onChange: vi.fn(),
          onBlur: vi.fn(),
          ref: (element: HTMLInputElement | null) => {
            if (element) {
              element.defaultChecked = true;
              element.checked = true;
            }
          },
        };
      }

      return {
        name,
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
      };
    },
    handleSubmit: vi.fn().mockImplementation((fn) => {
      return () => {
        fn({
          accountholderName: "John Doe",
          accountNumber: "12345678",
          sortCode: "12-34-56",
          isAccountHolder: true,
        });
        return true;
      };
    }),
    formState: {
      errors: {},
      dirtyFields: {},
    },
    watch: (field: string) => {
      if (field === "accountholderName") return "John Doe";
      if (field === "accountNumber") return "12345678";
      if (field === "sortCode") return "12-34-56";
      if (field === "isAccountHolder") return true;
      return "";
    },
    trigger: async () => true,
    setValue: setValueMock,
  };
};

vi.mock("react-hook-form", () => ({
  useForm: () => mockUseForm(),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: () => ({
    paymentDetails: {
      accountholderName: "John Doe",
      accountNumber: "12345678",
      sortCode: "12-34-56",
      sameAsServiceAddress: true,
      isAccountHolder: true,
      termsAgreed: false,
      directDebitAgreed: false,
      creditSearchAgreed: false,
      allTermsAgreed: false,
    },
    personalDetails: {
      firstName: "John",
      lastName: "Doe",
    },
    setPaymentDetails: mockSetPaymentDetails,
    serviceAddress: {
      line1: "123 Main St",
      line2: "Apt 4B",
      line3: "Anytown",
      postcode: "LS42PH",
    },
  }),
}));

vi.mock("../PaymentDetailsProps", () => ({
  paymentDetailsText: {
    accountholderNamePlaceholder: "Account holder name",
    accountNumberPlaceholder: "Account number",
    sortCodePlaceholder: "Sort code",
  },
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: () => () => ({ values: {} }),
}));

vi.mock("@/components/FormInput", () => ({
  default: ({
    id,
    placeholder,
    error,
  }: {
    id: string;
    placeholder: string;
    error?: FieldError;
  }) => (
    <div data-testid="form-input">
      <input id={id} placeholder={placeholder} data-testid={id} />
      {error && <p>{error.message}</p>}
    </div>
  ),
}));

vi.mock("@/screens/PaymentDetails/components/SortCodeInput", () => ({
  SortCodeInput: ({
    id,
    placeholder,
    error,
  }: {
    id: string;
    placeholder: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
  }) => (
    <div data-testid="sort-code-input">
      <input id={id} placeholder={placeholder} data-testid={id} />
      {error && <p>{error.message}</p>}
    </div>
  ),
}));

describe("PaymentForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setValueMock = vi.fn();

    const dialog = document.createElement("dialog");
    dialog.setAttribute("open", "");
    document.body.appendChild(dialog);
  });

  afterEach(() => {
    const dialog = document.querySelector("dialog[open]");
    if (dialog) {
      dialog.remove();
    }
  });

  it("renders the form", () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);
    expect(screen.getByTestId("payment-form")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    mockSetPaymentDetails.mockImplementation(() => true);
    render(<PaymentForm onSubmit={mockOnSubmit} />);

    const form = screen.getByTestId("payment-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("preserves checkbox state when form values match stored values", async () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);

    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).not.toBeNull();
      expect(checkbox).toBeChecked();
    });
  });
});
