import type { ExtendedStoreAddress } from "@store/useJoinFlowStore";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AddressLookupForm } from "./index";

const mockSelectAddress = vi.fn();
const mockSetError = vi.fn();

vi.mock("@/hooks/useAddress", () => ({
  useAddress: vi.fn(() => ({
    error: null,
    loading: false,
    addresses: [],
    selectAddress: mockSelectAddress,
    setError: mockSetError,
  })),
}));

vi.mock("@/components/FormDropdown", () => ({
  FormDropdown: vi.fn(({ options, bottomButtonOnClick }) => (
    <div>
      <select aria-label="Select address">
        {Object.entries(options || {}).map(([key]) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button onClick={bottomButtonOnClick} type="button">
        Address not found
      </button>
    </div>
  )),
}));

vi.mock("@/screens/ChooseYourAddress/ChooseYourAddressProps", () => ({
  ChooseYourAddressText: {
    postcodePlaceholder: "Enter postcode",
    addressDropdownPlaceholder: "Select address",
    addressNotFoundText: "Address not found",
    searchForMyAddressButtonText: "Search",
    continueButtonText: "Continue",
  },
}));

vi.mock("@react-component-library/ui", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    Button: vi.fn(({ children, disabled, onClick, type, ...props }) => (
      <button disabled={disabled} onClick={onClick} type={type} {...props}>
        {children}
      </button>
    )),
  };
});

describe("AddressLookupForm", () => {
  const mockOnAddressSelected = vi.fn();
  const mockOnPostcodeChange = vi.fn();
  const mockOnError = vi.fn();
  const user = userEvent.setup();

  const defaultProps = {
    onAddressSelected: mockOnAddressSelected,
    onError: mockOnError,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AddressLookupForm {...defaultProps} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Enter postcode",
    );
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });

  it("renders with custom button text", () => {
    render(
      <AddressLookupForm
        {...defaultProps}
        buttonText={{
          search: "Custom Search",
          continue: "Custom Continue",
        }}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Custom Search" }),
    ).toBeInTheDocument();
  });

  it("enables submit button when postcode is entered", async () => {
    render(<AddressLookupForm {...defaultProps} />);

    const postcodeInput = screen.getByRole("textbox");
    await user.type(postcodeInput, "SW1A 1AA");

    expect(screen.getByRole("button", { name: "Search" })).not.toBeDisabled();
  });

  it("shows clear button when postcode is entered", async () => {
    render(<AddressLookupForm {...defaultProps} />);

    const postcodeInput = screen.getByRole("textbox");
    await user.type(postcodeInput, "SW1A 1AA");

    expect(
      screen.getByRole("button", { name: "Clear postcode" }),
    ).toBeInTheDocument();
  });

  it("clears postcode when clear button is clicked", async () => {
    render(<AddressLookupForm {...defaultProps} />);

    const postcodeInput = screen.getByRole("textbox");
    await user.type(postcodeInput, "SW1A 1AA");

    const clearButton = screen.getByRole("button", { name: "Clear postcode" });
    await user.click(clearButton);

    expect(postcodeInput).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: "Clear postcode" }),
    ).not.toBeInTheDocument();
  });

  it("shows loading egg when loading prop is true", () => {
    render(<AddressLookupForm {...defaultProps} loading={true} />);

    const screenReaderLoadingText = screen.getByText("Loading...");
    expect(screenReaderLoadingText).toBeInTheDocument();
    expect(screenReaderLoadingText).toHaveClass("sr-only");
    expect(screenReaderLoadingText.parentElement).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("shows addresses when postcode is searched", async () => {
    const mockAddresses = [
      {
        id: "1",
        line1: "10 Downing Street",
        line2: "",
        line3: "London",
        postcode: "SW1A 2AA",
        identifiers: [],
        selectionIdentifier: "2",
      },
    ];

    const { useAddress } = await import("@/hooks/useAddress");
    vi.mocked(useAddress).mockReturnValue({
      selectedAddress: null,
      addresses: mockAddresses,
      loading: false,
      error: null,
      fetchAddresses: vi.fn(),
      selectAddress: mockSelectAddress,
      setError: mockSetError,
    });

    render(<AddressLookupForm {...defaultProps} />);

    const postcodeInput = screen.getByRole("textbox");
    await user.type(postcodeInput, "SW1A 2AA");

    const submitButton = screen.getByRole("button", { name: "Search" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: "Select address" }),
      ).toBeInTheDocument();
    });
  });

  it("handles address selection successfully", async () => {
    const mockAddress = {
      id: "1",
      line1: "10 Downing Street",
      line2: "",
      line3: "London",
      postcode: "SW1A 2AA",
      identifiers: [],
      selectionIdentifier: "2",
    };

    const mockAddresses: ExtendedStoreAddress[] = [mockAddress];

    const { useAddress } = await import("@/hooks/useAddress");
    vi.mocked(useAddress).mockReturnValue({
      selectedAddress: null,
      addresses: mockAddresses,
      loading: false,
      error: null,
      fetchAddresses: vi.fn(),
      selectAddress: mockSelectAddress,
      setError: mockSetError,
    });

    mockOnAddressSelected.mockResolvedValueOnce(undefined);

    render(<AddressLookupForm {...defaultProps} />);

    const postcodeInput = screen.getByRole("textbox");
    await user.type(postcodeInput, "SW1A 2AA");

    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Continue" }),
      ).toBeInTheDocument();
    });
  });

  it("initializes with initial postcode", () => {
    render(<AddressLookupForm {...defaultProps} initialPostcode="SW1A 1AA" />);

    const postcodeInput = screen.getByRole("textbox");
    expect(postcodeInput).toHaveValue("SW1A 1AA");
  });

  it("calls onPostcodeChange if provided and if postcode changes", async () => {
    render(
      <AddressLookupForm
        {...defaultProps}
        onPostcodeChange={mockOnPostcodeChange}
        initialPostcode="NG31 8WZ"
      />,
    );

    const postcodeInput = screen.getByRole("textbox");
    expect(postcodeInput).toHaveValue("NG31 8WZ");
    expect(mockOnPostcodeChange).toHaveBeenCalledWith("NG31 8WZ");

    await user.clear(postcodeInput);
    await user.type(postcodeInput, "SW1A 2AA");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(mockOnPostcodeChange).toHaveBeenCalledTimes(2);
    expect(mockOnPostcodeChange).toHaveBeenCalledWith("SW1A 2AA");
    expect(postcodeInput).toHaveValue("SW1A 2AA");
  });

  it("disables form when disabled prop is true", () => {
    render(<AddressLookupForm {...defaultProps} disabled={true} />);

    const submitButton = screen.getByRole("button", { name: "Search" });
    expect(submitButton).toBeDisabled();
  });

  it("shows address not found button", async () => {
    const mockAddresses = [
      {
        id: "1",
        line1: "10 Downing Street",
        line2: "",
        line3: "London",
        postcode: "SW1A 2AA",
        identifiers: [],
        selectionIdentifier: "2",
      },
    ];

    const { useAddress } = await import("@/hooks/useAddress");
    vi.mocked(useAddress).mockReturnValue({
      selectedAddress: null,
      addresses: mockAddresses,
      loading: false,
      error: null,
      fetchAddresses: vi.fn(),
      selectAddress: mockSelectAddress,
      setError: mockSetError,
    });

    render(<AddressLookupForm {...defaultProps} />);

    const postcodeInput = screen.getByRole("textbox");
    await user.type(postcodeInput, "SW1A 2AA");

    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Address not found" }),
      ).toBeInTheDocument();
    });
  });
});
export { AddressLookupForm };
