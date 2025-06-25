import { render, screen } from "@testing-library/react";
import { Control, FieldErrors } from "react-hook-form";

import { AccessibilityCommunicationPreferencesFormData } from "@/validation/join-flow-schema";

import { DocumentSelection } from "./DocumentSelection";

interface MockControllerProps {
  name: string;
  control: Control<AccessibilityCommunicationPreferencesFormData>;
  render: (props: {
    field: { value: boolean; onChange: ReturnType<typeof vi.fn> };
  }) => React.ReactElement;
}

vi.mock("react-hook-form", async () => ({
  ...(await vi.importActual("react-hook-form")),
  Controller: ({ render }: MockControllerProps) => {
    const mockField = {
      value: false,
      onChange: vi.fn(),
    };
    return render({ field: mockField });
  },
}));

describe("DocumentSelection", () => {
  const mockDocumentCheckboxes = [
    { label: "Large Print", name: "largePrint" },
    { label: "Braille", name: "braille" },
    { label: "Audio", name: "audio" },
  ];

  const mockControl =
    {} as Control<AccessibilityCommunicationPreferencesFormData>;
  const mockErrors =
    {} as FieldErrors<AccessibilityCommunicationPreferencesFormData>;

  const defaultProps = {
    control: mockControl,
    errors: mockErrors,
    documentCheckboxes: mockDocumentCheckboxes,
    documentCheckboxesTitle: "Document Format Preferences",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the document selection title", () => {
    render(<DocumentSelection {...defaultProps} />);

    expect(screen.getByText("Document Format Preferences")).toBeInTheDocument();
  });

  it("renders checkboxes for each document type", () => {
    render(<DocumentSelection {...defaultProps} />);

    mockDocumentCheckboxes.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("displays error message when contentTypes error exists", () => {
    const errorsWithContentTypes = {
      contentTypes: {
        message: "Please select at least one document format",
      },
    } as FieldErrors<AccessibilityCommunicationPreferencesFormData>;

    render(
      <DocumentSelection {...defaultProps} errors={errorsWithContentTypes} />,
    );

    const errorMessage = screen.getByText(
      "Please select at least one document format",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not display error message when no contentTypes error exists", () => {
    render(<DocumentSelection {...defaultProps} />);

    expect(
      screen.queryByText(/Please select at least one/),
    ).not.toBeInTheDocument();
  });

  it("renders with different document types and titles", () => {
    const customDocumentCheckboxes = [
      { label: "Digital Format", name: "digital" },
      { label: "Paper Format", name: "paper" },
    ];

    render(
      <DocumentSelection
        {...defaultProps}
        documentCheckboxes={customDocumentCheckboxes}
        documentCheckboxesTitle="Custom Document Title"
      />,
    );

    expect(screen.getByText("Custom Document Title")).toBeInTheDocument();
    expect(screen.getByText("Digital Format")).toBeInTheDocument();
    expect(screen.getByText("Paper Format")).toBeInTheDocument();
  });
});
