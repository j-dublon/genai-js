import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import JoinFlowPage from "@/app/join-flow/page";

vi.mock("@store/useJoinFlowStore", () => ({
  default: () => ({
    selectPackage: vi.fn(),
  }),
}));

vi.mock("@store/mockData", () => ({
  broadbandPackages: [
    {
      id: "basic",
      name: "Basic Package",
      speed: { download: 100, upload: 20 },
      price: { monthly: 25, setup: 0 },
      contractLength: 12,
      description: "Good for everyday browsing",
    },
    {
      id: "standard",
      name: "Standard Package",
      speed: { download: 300, upload: 50 },
      price: { monthly: 35, setup: 0 },
      contractLength: 12,
      description: "Great for streaming and gaming",
    },
  ],
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "",
}));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    handleSubmit:
      (cb: (data: Record<string, unknown>) => void) =>
      (e?: React.BaseSyntheticEvent) => {
        e?.preventDefault?.();
        return cb({});
      },
    setValue: vi.fn(),
    formState: { errors: {} },
  }),
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: vi.fn(() => ({})),
}));

describe("JoinFlowPage", () => {
  it("renders the package selection page", () => {
    render(<JoinFlowPage />);

    expect(
      screen.getByText("Choose Your Broadband Package"),
    ).toBeInTheDocument();

    expect(screen.getByText("Basic Package")).toBeInTheDocument();
    expect(screen.getByText("Standard Package")).toBeInTheDocument();
  });
});
