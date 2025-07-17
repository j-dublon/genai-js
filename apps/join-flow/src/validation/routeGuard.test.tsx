import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import { beforeEach, describe, expect, test, vi } from "vitest";

import RouteGuard from "../validation/routeGuard";

vi.mock("next/navigation");
vi.mock("@store/useJoinFlowStore");

const mockedUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
const mockedUsePathname = usePathname as unknown as ReturnType<typeof vi.fn>;
const mockedUseJoinFlowStore = useJoinFlowStore as unknown as ReturnType<
  typeof vi.fn
>;

describe("RouteGuard", () => {
  const mockRouter = { replace: vi.fn() };
  const mockChildrenText = "Protected Content";

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseRouter.mockReturnValue(mockRouter);
    mockedUsePathname.mockReturnValue("/join-flow");

    mockedUseJoinFlowStore.mockReturnValue({
      selectedPackage: { id: "test-package" },
      personalDetails: { firstName: "Test" },
      eeroSelection: { id: "test-eero" },
      switchingDetails: { otsSwitchStatus: "SWITCH_SUCCESS" },
      goLiveDetails: { selectedDate: "2023-01-01" },
    });
  });

  test("should show spinner while validating", () => {
    render(
      <RouteGuard>
        <div>{mockChildrenText}</div>
      </RouteGuard>,
    );
    expect(screen.queryByText(mockChildrenText)).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("should show children after validation completes", async () => {
    render(
      <RouteGuard>
        <div>{mockChildrenText}</div>
      </RouteGuard>,
    );

    await waitFor(() => {
      expect(screen.getByText(mockChildrenText)).toBeInTheDocument();
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  test("should redirect if validation fails", async () => {
    mockedUsePathname.mockReturnValue("/join-flow/personal-details");
    mockedUseJoinFlowStore.mockReturnValue({
      selectedPackage: null,
    });

    render(
      <RouteGuard>
        <div>{mockChildrenText}</div>
      </RouteGuard>,
    );

    await waitFor(
      () => {
        expect(mockRouter.replace).toHaveBeenCalledWith("/join-flow");
      },
      { timeout: 2000 },
    );
  });
});
