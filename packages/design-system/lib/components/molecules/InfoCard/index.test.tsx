import { render, screen } from "@testing-library/react";

import { InfoCard, InfoCardProps } from ".";

describe("InfoCard Component", () => {
  const baseProps: InfoCardProps = {
    titleText: "Test title",
    colorPillText: "Test color pill text",
    colorPillBackgroundColor: "yellow",
    infoCardBackgroundColor: "grey-300",
    subHeading: "Test lighter text",
    additionalText: "Test additional text",
    buttonText: "Test button text",
    featureImageProps: {
      backgroundColor: "secondary-blue",
      backgroundImage: {
        url: "/test-asset.png",
        alt: "Test image alt text",
      },
      overlayImage: {
        url: "/test-overlay.png",
        alt: "Test overlay image alt text",
      },
    },
  };
  it("renders the component", () => {
    render(
      <InfoCard
        {...baseProps}
        featureImageProps={{
          backgroundColor: "secondary-blue",
          backgroundImage: {
            url: "/test-asset.png",
            alt: "Test image alt text",
          },
          overlayImage: {
            url: "/test-overlay.png",
            alt: "Test overlay image alt text",
          },
        }}
      />,
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test title")).toHaveStyle(
      "background-color: bg-core-grey",
    );
    expect(screen.getByText("Test color pill text")).toBeInTheDocument();
    expect(screen.getByText("Test color pill text")).toHaveStyle(
      "background-color: bg-core-yellow",
    );

    expect(screen.getByText("Test lighter text")).toBeInTheDocument();
    expect(screen.getByText("Test additional text")).toBeInTheDocument();
    expect(screen.getByText("Test button text")).toBeInTheDocument();

    expect(screen.getByAltText("Test image alt text")).toBeInTheDocument();
    expect(
      screen.getByAltText("Test overlay image alt text"),
    ).toBeInTheDocument();
  });

  it("doesn't render the additional text if additionalText prop isn't set", () => {
    const newProps = {
      ...baseProps,
      additionalText: undefined, // Override the additionalText prop
    };
    render(<InfoCard {...newProps} />);

    expect(screen.queryByText("Test additional text")).not.toBeInTheDocument();
  });

  it("doesn't render the image if featureImageProps prop isn't set", () => {
    const newProps = {
      ...baseProps,
      featureImageProps: undefined, // Override the imgProps prop
    };
    render(<InfoCard {...newProps} />);

    expect(
      screen.queryByAltText("Test image alt text"),
    ).not.toBeInTheDocument();
  });
});
