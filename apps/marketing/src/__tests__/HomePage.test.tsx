import "@testing-library/jest-dom";

import { render, screen, within } from "@testing-library/react";

import {
  guidesHeading,
  guidesSubHeading,
} from "@/components/organisms/Guides/guidesProps";
import { HomePage } from "@/components/pages/HomePage";
import { getAssetPath } from "@/lib/get-asset-path";

vi.mock("@/hooks/usePostcode", () => ({
  usePostcode: () => ({
    postcode: "" as string,
    setPostcode: vi.fn() as React.Dispatch<React.SetStateAction<string>>,
  }),
}));

vi.mock("@/hooks/useTrustpilotScore", () => ({
  useTrustpilotScore: () => ({
    data: { trustScore: 4.5, numberOfReviews: 100 },
    loading: false,
    error: null,
  }),
}));

vi.mock("@/hooks/useTrustpilotReviews", () => ({
  useTrustpilotReviews: () => ({
    data: [
      {
        id: "review1",
        title: "Great Service",
        reviewText: "Amazing experience!",
        author: "John Doe",
        starRating: 5,
      },
      {
        id: "review2",
        title: "Excellent",
        reviewText: "Very satisfied with the service",
        author: "Jane Smith",
        starRating: 4,
      },
    ],
    loading: false,
    error: null,
  }),
}));

const mockedFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: vi.fn(() =>
      Promise.resolve({ data: { trustScore: 4.5, numberOfReviews: 100 } }),
    ),
  } as unknown as Response),
);

global.fetch = mockedFetch;

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    mockedFetch.mockClear();
    process.env.NEXT_PUBLIC_ENABLE_CUCKOO_PROTECT = "true";
    render(<HomePage />);
  });

  it("renders the Hero banner section", async () => {
    const heading = await screen.findByText(
      "Ridiculously fast full fibre broadband",
    );
    expect(heading).toBeInTheDocument();
  });

  it("renders the Eero card section", async () => {
    const heading = await screen.findByText("A genuinely amazing connection");
    expect(heading).toBeInTheDocument();
  });

  it("renders the join the flock section section", () => {
    expect(screen.getByText("Join the flock today")).toBeInTheDocument();
  });

  it("renders the FAQ section", async () => {
    const heading = await screen.findByText(
      "Questions about full fibre, broadband, or anything else at all?",
    );
    expect(heading).toBeInTheDocument();
  });

  it("renders the Click Switch Done section", () => {
    const titleText = screen.getByText("Click. Switch.");
    const imgElement = screen.getByAltText(
      "The word done in a pink coloured pill with an arrow icon pointing at it",
    );
    expect(titleText).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      getAssetPath("/images/done_button.svg"),
    );
    expect(imgElement).toHaveClass("w-32 md:w-56 h-auto");
  });

  it("renders the Life at Cuckoo section", () => {
    const titleText = screen.getByText("Properly good eggs");
    expect(titleText).toBeInTheDocument();
  });

  it("renders the Cuckoo Protect section", async () => {
    const imgElement = screen.getByAltText("Cuckoo protect logo");
    expect(imgElement).toBeInTheDocument();
  });

  it("renders the Guides section", () => {
    const guidesSection = screen.getByLabelText("Cuckoo Guides");
    const headingElement = screen.getByText(guidesHeading);
    const subHeading = screen.getByText(guidesSubHeading);
    const slider = within(guidesSection).getByRole("region", {
      name: "Scrollable content for Guides",
    });

    expect(guidesSection).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  it("renders the Footer section", async () => {
    const heading = await screen.findByText("Fast, fair, feel-good broadband");
    expect(heading).toBeInTheDocument();
  });

  it("renders the TrustPilot section", async () => {
    const heading = await screen.findByText("Great Service");
    expect(heading).toBeInTheDocument();
  });
});
