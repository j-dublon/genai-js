import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, test, vi } from "vitest";

import Stepper from "./index";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

const mockedUsePathname = usePathname as unknown as ReturnType<typeof vi.fn>;
const mockedUseJoinFlowStore = useJoinFlowStore as unknown as ReturnType<
  typeof vi.fn
>;

describe("Stepper", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseJoinFlowStore.mockReturnValue({
      setCurrentStep: vi.fn(),
    });
  });

  test("renders the correct active step based on personal-details path", () => {
    mockedUsePathname.mockReturnValue("/join-flow/personal-details");

    render(<Stepper />);

    expect(
      screen.getAllByText(
        /your information|choose your routers|switching & go live|pay and join cuckoo/i,
      ),
    ).toHaveLength(4);

    const step1 = screen.getByText("1");
    const step1Container = step1.closest("div");
    expect(step1Container).toHaveClass("bg-core-yellow");

    const step2 = screen.getByText("2");
    const step2Container = step2.closest("div");
    expect(step2Container).toHaveClass("bg-ui-grey-200");
  });
});
