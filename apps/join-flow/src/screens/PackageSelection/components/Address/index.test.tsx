import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Address } from "@/screens/PackageSelection/components/Address";
import { StoreAddress } from "@/store/useJoinFlowStore";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

describe("Address", () => {
  const mockPush = vi.fn();
  const mockResetFlow = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("shows the formatted address when an address is selected", () => {
    const mockAddress: StoreAddress = {
      line1: "123 Test Street",
      line2: "Apt 4B",
      line3: "Test Area",
      identifiers: [],
      postcode: "ABC 123",
    };

    vi.mocked(useJoinFlowStore).mockReturnValue({
      serviceAddress: mockAddress,
    });

    render(<Address />);
    expect(
      screen.getByText("123 Test Street, Apt 4B, Test Area, ABC 123"),
    ).toBeInTheDocument();
  });

  it("shows 'No address information available' when no address is selected", () => {
    vi.mocked(useJoinFlowStore).mockReturnValue({
      serviceAddress: null,
    });

    render(<Address />);
    expect(
      screen.getByText("No address information available"),
    ).toBeInTheDocument();
  });

  it("renders the 'Change my address' link and handles click, sending user to start page and clearing the join flow store", () => {
    vi.mocked(useJoinFlowStore).mockReturnValue({
      serviceAddress: null,
      resetFlow: mockResetFlow,
    } as ReturnType<typeof useJoinFlowStore>);

    render(<Address />);
    const changeAddressButton = screen.getByRole("button", {
      name: "Change my address",
    });
    expect(changeAddressButton).toBeInTheDocument();

    changeAddressButton.click();
    expect(mockPush).toHaveBeenCalledWith("/join-flow");
    expect(mockResetFlow).toHaveBeenCalled();
  });
});
