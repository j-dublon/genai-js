import useJoinFlowStore from "@store/useJoinFlowStore";
import { act, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { LoadingModalSlide } from "@/hooks/useLoadingModal";
import { Address } from "@/screens/PackageSelection/components/Address";
import { StoreAddress } from "@/store/useJoinFlowStore";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("Address", () => {
  const mockPush = vi.fn();
  const mockSlides: LoadingModalSlide[] = [
    {
      src: "/images/world-animated.gif",
      message: "We're clearing the nest for a new address.",
    },
    {
      src: "/images/sunglasses-animated.gif",
      message: "Let's hatch a brand new broadband plan just for you.",
    },
    {
      src: "/images/rocket-animated.gif",
      message:
        "Rebuilding your quote from the ground up—egg-sactly how you like it!",
    },
  ];

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

    render(<Address slides={mockSlides} />);
    expect(
      screen.getByText("123 Test Street, Apt 4B, Test Area, ABC 123"),
    ).toBeInTheDocument();
  });

  it("shows 'No address information available' when no address is selected", () => {
    vi.mocked(useJoinFlowStore).mockReturnValue({
      serviceAddress: null,
    });

    render(<Address slides={mockSlides} />);
    expect(
      screen.getByText("No address information available"),
    ).toBeInTheDocument();
  });

  it("renders the 'Change my address' link and handles click, sending user to start page", () => {
    vi.mocked(useJoinFlowStore).mockReturnValue({
      serviceAddress: null,
    } as ReturnType<typeof useJoinFlowStore>);

    render(<Address slides={mockSlides} />);
    const changeAddressButton = screen.getByRole("button", {
      name: "Change my address",
    });
    expect(changeAddressButton).toBeInTheDocument();

    changeAddressButton.click();
    expect(mockPush).toHaveBeenCalledWith("/join-flow");
  });

  it("opens the loading modal when 'Change my address' is clicked", () => {
    vi.mocked(useJoinFlowStore).mockReturnValue({
      serviceAddress: null,
    } as ReturnType<typeof useJoinFlowStore>);

    render(<Address slides={mockSlides} />);
    const changeAddressButton = screen.getByRole("button", {
      name: "Change my address",
    });

    act(() => {
      changeAddressButton.click();
    });

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(screen.getByText(mockSlides[0].message!)).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/join-flow");
  });
});
