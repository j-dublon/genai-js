import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createSwitchMatchLookup } from "@/services/helpers/createSwitchMatchLookup";
import { getAllProviders } from "@/services/helpers/getAllProviders";
import { updateBasket } from "@/services/helpers/updateBasket";

import { OneTouchSwitching } from "./index";
import { oneTouchSwitchingText } from "./oneTouchSwitchingProps";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
const mockUseRouter = vi.mocked(useRouter);

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/services/helpers/getAllProviders", () => ({
  getAllProviders: vi.fn(),
}));
const mockGetAllProviders = vi.mocked(getAllProviders);

vi.mock("@/services/helpers/createSwitchMatchLookup", () => ({
  createSwitchMatchLookup: vi.fn(),
}));
const mockCreateSwitchMatchLookup = vi.mocked(createSwitchMatchLookup);

vi.mock("@/services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(),
}));
const mockUpdateBasket = vi.mocked(updateBasket);

vi.mock("@/components/Stepper", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/Footer", () => ({
  Footer: vi.fn(),
}));

vi.mock("@/hooks/useLoadingModal", () => ({
  useLoadingModal: vi.fn().mockReturnValue({
    loadingModalRef: vi.fn(),
    slidesWithAssetPath: [
      {
        src: "/images/world-animated.gif",
        message: "Sit tight! We're checking out your area",
      },
    ],
  }),
}));

describe("OneTouchSwitching", () => {
  const mockRouter = {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  };

  const mockStore = {
    setSwitchingDetails: vi.fn(),
    switchingDetails: null,
    setCurrentStep: vi.fn(),
    basket: {
      id: "test-basket-id",
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
    isLoadingModalOpen: false,
    setIsLoadingModalOpen: vi.fn(),
  };

  const mockProviders = [
    {
      id: "provider1",
      name: "Provider 1",
      losingRcpid: "rcp1",
      isActive: true,
      cuckoo: { isInKraken: true },
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
    {
      id: "provider2",
      name: "Provider 2",
      losingRcpid: "rcp2",
      isActive: true,
      cuckoo: { isInKraken: true },
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseJoinFlowStore.mockReturnValue(mockStore);
    mockGetAllProviders.mockResolvedValue({ providers: mockProviders });
    mockCreateSwitchMatchLookup.mockResolvedValue({
      switchMatchLookup: "12345678",
    });
    mockUpdateBasket.mockResolvedValue({
      basket: {
        id: "test-basket-id",
        updatedAt: "2024-01-01",
        createdAt: "2024-01-01",
      },
    });
  });

  it("should render the component with initial state", async () => {
    render(<OneTouchSwitching />);

    // Wait for the async fetchProviders effect to complete
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    expect(screen.getByText(oneTouchSwitchingText.title)).toBeInTheDocument();
    expect(
      screen.getByText(oneTouchSwitchingText.subtitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(oneTouchSwitchingText.providerSelectionTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(oneTouchSwitchingText.providerSelectorDefault),
    ).toBeInTheDocument();
    expect(
      screen.getByText(oneTouchSwitchingText.consentLabel),
    ).toBeInTheDocument();
    expect(
      screen.getByText(oneTouchSwitchingText.skipButtonText),
    ).toBeInTheDocument();
    expect(
      screen.getByText(oneTouchSwitchingText.submitButtonText),
    ).toBeInTheDocument();
  });

  it("should fetch providers on initial render", async () => {
    render(<OneTouchSwitching />);

    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });
  });

  it("should handle provider fetch error", async () => {
    mockGetAllProviders.mockResolvedValue({
      error: {
        type: "networkError",
        message: "Failed to fetch",
        details: ["Network error occurred"],
      },
    });

    render(<OneTouchSwitching />);

    await waitFor(() => {
      expect(
        screen.getByText(oneTouchSwitchingText.providerErrorMessage),
      ).toBeInTheDocument();
    });
  });

  it("should handle successful form submission on first attempt", async () => {
    const user = userEvent.setup();

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    const dropdownButton = screen.getByText(
      oneTouchSwitchingText.providerSelectorDefault,
    );
    await user.click(dropdownButton);

    const provider1Option = screen.getByRole("button", { name: "Provider 1" });
    await user.click(provider1Option);

    const checkbox = screen.getByRole("checkbox", {
      name: oneTouchSwitchingText.consentLabel,
    });
    await user.click(checkbox);

    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.submitButtonText,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/go-live-date");
    });
    expect(mockStore.setSwitchingDetails).toHaveBeenCalledWith({
      currentProvider: mockProviders[0],
      switchOrderReference: "12345678",
      otsSwitchStatus: "SWITCH_SUCCESS",
    });
    expect(mockStore.setCurrentStep).toHaveBeenCalledWith(3);
  });

  it("should handle form submission with valid account number on second attempt", async () => {
    const user = userEvent.setup();
    const mockFirstAttemptFailedStore = {
      ...mockStore,
      switchingDetails: {
        otsSwitchStatus: "FIRST_ATTEMPT_FAILED",
      },
    };
    mockUseJoinFlowStore.mockReturnValue(mockFirstAttemptFailedStore);

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    // Should show account number input on second attempt
    expect(
      screen.getByText(oneTouchSwitchingText.firstAttemptFailTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(oneTouchSwitchingText.accountNumberPrompt),
    ).toBeInTheDocument();

    const dropdownButton = screen.getByText(
      oneTouchSwitchingText.providerSelectorDefault,
    );
    await user.click(dropdownButton);

    const provider1Option = screen.getByRole("button", { name: "Provider 1" });
    await user.click(provider1Option);

    const checkbox = screen.getByRole("checkbox", {
      name: oneTouchSwitchingText.consentLabel,
    });
    await user.click(checkbox);

    const accountNumberInput = screen.getByRole("textbox", {
      name: "accountNumber",
    });
    await user.type(accountNumberInput, "12345678");

    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.retryButtonText,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/go-live-date");
    });
    expect(
      mockFirstAttemptFailedStore.setSwitchingDetails,
    ).toHaveBeenCalledWith({
      currentProvider: mockProviders[0],
      switchOrderReference: "12345678",
      otsSwitchStatus: "SWITCH_SUCCESS",
    });
    expect(mockFirstAttemptFailedStore.setCurrentStep).toHaveBeenCalledWith(3);
  });

  it("should handle form submission with invalid account number on second attempt", async () => {
    const user = userEvent.setup();
    const mockFirstAttemptFailedStore = {
      ...mockStore,
      switchingDetails: {
        otsSwitchStatus: "FIRST_ATTEMPT_FAILED",
      },
    };
    mockUseJoinFlowStore.mockReturnValue(mockFirstAttemptFailedStore);
    mockCreateSwitchMatchLookup.mockResolvedValue({
      error: {
        type: "validationError",
        message: "Invalid account number",
        details: ["Account number not found"],
      },
    });

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    const dropdownButton = screen.getByText(
      oneTouchSwitchingText.providerSelectorDefault,
    );
    await user.click(dropdownButton);

    const provider1Option = screen.getByRole("button", { name: "Provider 1" });
    await user.click(provider1Option);

    const checkbox = screen.getByRole("checkbox", {
      name: oneTouchSwitchingText.consentLabel,
    });
    await user.click(checkbox);

    const accountNumberInput = screen.getByRole("textbox", {
      name: "accountNumber",
    });
    await user.type(accountNumberInput, "11111111");

    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.retryButtonText,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/go-live-date");
    });
    expect(
      mockFirstAttemptFailedStore.setSwitchingDetails,
    ).toHaveBeenCalledWith({
      otsSwitchStatus: "OTS_FAILED",
    });
    expect(mockFirstAttemptFailedStore.setCurrentStep).toHaveBeenCalledWith(3);
  });

  it("should handle first attempt failure and save provider for retry", async () => {
    const user = userEvent.setup();
    mockCreateSwitchMatchLookup.mockResolvedValue({
      error: {
        type: "validationError",
        message: "No match found",
        details: ["No match found"],
      },
    });

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    const dropdownButton = screen.getByText(
      oneTouchSwitchingText.providerSelectorDefault,
    );
    await user.click(dropdownButton);

    const provider1Option = screen.getByRole("button", { name: "Provider 1" });
    await user.click(provider1Option);

    const checkbox = screen.getByRole("checkbox", {
      name: oneTouchSwitchingText.consentLabel,
    });
    await user.click(checkbox);

    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.submitButtonText,
    });
    await user.click(submitButton);

    // Should save provider and set status to FIRST_ATTEMPT_FAILED
    expect(mockStore.setSwitchingDetails).toHaveBeenCalledWith({
      currentProvider: mockProviders[0],
      otsSwitchStatus: "FIRST_ATTEMPT_FAILED",
    });
    expect(mockStore.setIsLoadingModalOpen).toHaveBeenCalledWith(false);
  });

  it("should handle skip button click", async () => {
    const user = userEvent.setup();
    render(<OneTouchSwitching />);

    const skipButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.skipButtonText,
    });
    await user.click(skipButton);

    expect(mockStore.setSwitchingDetails).toHaveBeenCalledWith({
      otsSwitchStatus: "SKIPPED",
    });
    expect(mockStore.setCurrentStep).toHaveBeenCalledWith(3);
    expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/go-live-date");
  });

  it("should disable buttons when loading modal is open", async () => {
    // Mock the store to return isLoadingModalOpen: true
    const mockStoreWithLoading = {
      ...mockStore,
      isLoadingModalOpen: true,
    };
    mockUseJoinFlowStore.mockReturnValue(mockStoreWithLoading);

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    const skipButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.skipButtonText,
    });
    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.loadingButtonText,
    });

    // Check that buttons are disabled when loading modal is open
    expect(submitButton).toBeDisabled();
    expect(skipButton).toBeDisabled();
  });

  it("should enable buttons when loading modal is closed", async () => {
    // Mock the store to return isLoadingModalOpen: false
    const mockStoreWithoutLoading = {
      ...mockStore,
      isLoadingModalOpen: false,
    };
    mockUseJoinFlowStore.mockReturnValue(mockStoreWithoutLoading);

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    const skipButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.skipButtonText,
    });
    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.submitButtonText,
    });

    // Check that buttons are enabled when loading modal is closed
    expect(submitButton).not.toBeDisabled();
    expect(skipButton).not.toBeDisabled();
  });

  it("should handle API error during submission", async () => {
    const user = userEvent.setup();
    mockCreateSwitchMatchLookup.mockRejectedValue(new Error("API Error"));

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    const dropdownButton = screen.getByText(
      oneTouchSwitchingText.providerSelectorDefault,
    );
    await user.click(dropdownButton);

    const provider1Option = screen.getByRole("button", { name: "Provider 1" });
    await user.click(provider1Option);

    const checkbox = screen.getByRole("checkbox", {
      name: oneTouchSwitchingText.consentLabel,
    });
    await user.click(checkbox);

    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.submitButtonText,
    });
    await user.click(submitButton);

    // Should handle error and save provider for retry
    expect(mockStore.setSwitchingDetails).toHaveBeenCalledWith({
      currentProvider: mockProviders[0],
      otsSwitchStatus: "FIRST_ATTEMPT_FAILED",
    });
    expect(mockStore.setIsLoadingModalOpen).toHaveBeenCalledWith(false);
  });

  it("should handle missing basket ID", async () => {
    const user = userEvent.setup();
    const mockStoreWithoutBasket = {
      ...mockStore,
      basket: null,
    };
    mockUseJoinFlowStore.mockReturnValue(mockStoreWithoutBasket);

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    const dropdownButton = screen.getByText(
      oneTouchSwitchingText.providerSelectorDefault,
    );
    await user.click(dropdownButton);

    const provider1Option = screen.getByRole("button", { name: "Provider 1" });
    await user.click(provider1Option);

    const checkbox = screen.getByRole("checkbox", {
      name: oneTouchSwitchingText.consentLabel,
    });
    await user.click(checkbox);

    const submitButton = screen.getByRole("button", {
      name: oneTouchSwitchingText.submitButtonText,
    });
    await user.click(submitButton);

    // Should handle missing basket ID gracefully
    expect(mockStore.setIsLoadingModalOpen).toHaveBeenCalledWith(false);
  });

  it("should show loading state when providers are being fetched", async () => {
    mockGetAllProviders.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ providers: mockProviders });
          }, 100);
        }),
    );

    render(<OneTouchSwitching />);

    // Should show loading state
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading providers...")).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading providers..")).not.toBeInTheDocument();
    });
  });

  it("should pre-select provider when switchingDetails has currentProvider", async () => {
    const mockStoreWithProvider = {
      ...mockStore,
      switchingDetails: {
        currentProvider: mockProviders[0],
      },
    };
    mockUseJoinFlowStore.mockReturnValue(mockStoreWithProvider);

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    // Should show the pre-selected provider
    expect(screen.getByText("Provider 1")).toBeInTheDocument();
  });
});
