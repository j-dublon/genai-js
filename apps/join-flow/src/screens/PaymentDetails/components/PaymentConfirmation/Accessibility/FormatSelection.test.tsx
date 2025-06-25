import { render, screen } from "@testing-library/react";
import { Control, FieldErrors } from "react-hook-form";

import { AccessibilityCommunicationPreferencesFormData } from "@/validation/join-flow-schema";

import { FormatSelection } from "./FormatSelection";

type FormatPreferences = {
  audio?: boolean;
  braille?: boolean;
  largePrint?: boolean;
};

interface MockControllerProps {
  name: string;
  control: Control<AccessibilityCommunicationPreferencesFormData>;
  render: (props: {
    field: {
      value: FormatPreferences | undefined;
      onChange: ReturnType<typeof vi.fn>;
    };
  }) => React.ReactElement;
}

vi.mock("react-hook-form", async () => ({
  ...(await vi.importActual("react-hook-form")),
  Controller: ({ render }: MockControllerProps) => {
    const mockField = {
      value: undefined,
      onChange: vi.fn(),
    };
    return render({ field: mockField });
  },
}));

describe("FormatSelection", () => {
  const mockFormatRadioOptions = [
    { label: "Audio", name: "audio" },
    { label: "Braille", name: "braille" },
    { label: "Large Print", name: "largePrint" },
  ];

  const mockControl =
    {} as Control<AccessibilityCommunicationPreferencesFormData>;
  const mockErrors =
    {} as FieldErrors<AccessibilityCommunicationPreferencesFormData>;

  const defaultProps = {
    control: mockControl,
    errors: mockErrors,
    formatRadioOptions: mockFormatRadioOptions,
    formatDescription:
      "Please select your preferred format for receiving information",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the format description", () => {
    render(<FormatSelection {...defaultProps} />);

    expect(
      screen.getByText(
        "Please select your preferred format for receiving information",
      ),
    ).toBeInTheDocument();
  });

  it("renders radio options for each format type", () => {
    render(<FormatSelection {...defaultProps} />);

    mockFormatRadioOptions.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("displays error message when contactPreferences error exists", () => {
    const errorsWithContactPreferences = {
      contactPreferences: {
        message: "Please select a preferred format",
      },
    } as FieldErrors<AccessibilityCommunicationPreferencesFormData>;

    render(
      <FormatSelection
        {...defaultProps}
        errors={errorsWithContactPreferences}
      />,
    );

    const errorMessage = screen.getByText("Please select a preferred format");
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not display error message when no contactPreferences error exists", () => {
    render(<FormatSelection {...defaultProps} />);

    expect(
      screen.queryByText(/Please select a preferred format/),
    ).not.toBeInTheDocument();
  });

  it("renders with different format options and description", () => {
    const customFormatRadioOptions = [
      { label: "Email", name: "email" },
      { label: "SMS", name: "sms" },
    ];

    render(
      <FormatSelection
        {...defaultProps}
        formatRadioOptions={customFormatRadioOptions}
        formatDescription="Choose your communication method"
      />,
    );

    expect(
      screen.getByText("Choose your communication method"),
    ).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("SMS")).toBeInTheDocument();
  });
});
