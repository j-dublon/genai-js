import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import type {
  Control,
  ControllerProps,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import PersonalDetails from "..";
import personalDetailsProps from "../personalDetailsProps";
import { AdditionalPersonalDetailsForm } from "./additionalPersonalDetailsForm";
import type { AdditionalPersonalDetailsFormProps } from "./formValues";

const { mockUseWatch, mockUseFieldArray, mockController } = vi.hoisted(() => ({
  mockUseWatch: vi.fn(),
  mockUseFieldArray: vi.fn(),
  mockController: vi.fn(),
}));

vi.mock("react-hook-form", async () => {
  const actual =
    await vi.importActual<typeof import("react-hook-form")>("react-hook-form");
  return {
    ...actual,
    Controller: mockController,
    useWatch: mockUseWatch,
    useFieldArray: mockUseFieldArray,
  };
});

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  const InfoModal = React.forwardRef<
    HTMLDialogElement,
    React.PropsWithChildren<{
      title: string;
      modalRef: React.RefObject<HTMLDialogElement>;
      buttonText: string;
      buttonType: string;
    }>
  >((props) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    React.useEffect(() => {
      const element = dialogRef.current;
      if (element) {
        element.showModal = vi.fn();
        element.close = vi.fn();

        if (props.modalRef) {
          (
            props.modalRef as React.MutableRefObject<HTMLDialogElement | null>
          ).current = element;
        }
      }
    }, [props.modalRef]);

    return (
      <dialog data-testid={`info-modal-${props.title}`} ref={dialogRef}>
        <h2>{props.title}</h2>
        {props.children}
        <button
          onClick={() => dialogRef.current?.close?.()}
          data-testid={`close-modal-${props.title}`}
        >
          {props.buttonText}
        </button>
      </dialog>
    );
  });
  InfoModal.displayName = "InfoModal";

  return {
    ...actual,
    TipCard: (
      props: React.PropsWithChildren<{
        image: string;
        className: string;
      }>,
    ) => <div data-testid="tip-card">{props.children}</div>,
    Checkbox: (props: {
      label: string;
      value: string;
      checked: boolean;
      onChange: (checked: boolean) => void;
    }) => (
      <input
        data-testid="checkbox"
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        aria-label={props.label}
      />
    ),
    Radio: (props: {
      label: string;
      value: string;
      checked: boolean;
      onChange: () => void;
    }) => (
      <input
        data-testid={`radio-${props.value}`}
        type="radio"
        checked={props.checked}
        onChange={() => props.onChange()}
        aria-label={props.label}
      />
    ),
    InfoModal,
    useClickOutside: vi.fn(),
  };
});

vi.mock("@react-component-library/ui/icons", () => ({
  TickWithCircle: () => <svg data-testid="tick-icon" />,
}));

vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: (path: string) => path,
}));

vi.mock("@/components/TextInput", () => {
  const TextInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & {
      id: string;
      hasSubmitted?: boolean;
    }
  >((props, _ref) => (
    <input data-testid={`text-input-${props.id}`} ref={_ref} {...props} />
  ));
  TextInput.displayName = "TextInput";
  return { TextInput };
});

vi.mock("@/components/ManualAddressFields", () => ({
  ManualAddressFields: (props: {
    register: import("react-hook-form").UseFormRegister<PersonalDetails>;
    errors: import("react-hook-form").FieldErrors<PersonalDetails>;
    hasSubmitted: boolean;
    fieldPlaceholders: Record<string, string>;
    fieldPrefix: string;
  }) => (
    <div data-testid={`manual-address-fields-${props.fieldPrefix}`}>
      Manual Address Fields for {props.fieldPrefix}
    </div>
  ),
}));

vi.mock("@/components/ModalContent", () => ({
  ModalContent: ({ content }: { content: string | { text: string }[] }) => (
    <div data-testid="modal-content">
      {Array.isArray(content)
        ? content.map((item, idx) =>
            typeof item === "object" && "text" in item ? (
              <span key={idx}>{item.text}</span>
            ) : null,
          )
        : content}
    </div>
  ),
}));

vi.mock("@/hooks/useClearFocus", () => ({
  useClearFocus: vi.fn(),
}));

const defaultProps: AdditionalPersonalDetailsFormProps = {
  register: vi.fn() as unknown as UseFormRegister<PersonalDetails>,
  errors: {} as FieldErrors<PersonalDetails>,
  address: {
    line1: "123 Main St",
    line2: "Apt 4",
    line3: "",
    postcode: "AB12 3CD",
    identifiers: [],
  },
  requiresLandline: false,
  control: {} as Control<PersonalDetails, unknown, PersonalDetails>,
  hasSubmitted: false,
};

describe("AdditionalPersonalDetailsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockController.mockImplementation(
      <TFieldValues extends FieldValues>(
        props: ControllerProps<TFieldValues>,
      ) => {
        const mockField = {
          value: props.name === "residencyDuration" ? "under-year" : false,
          onChange: vi.fn(),
        };
        return (
          props.render as unknown as (arg: {
            field: typeof mockField;
          }) => React.ReactNode
        )({ field: mockField });
      },
    );

    mockUseWatch.mockImplementation(({ name }) => {
      if (name === "residencyDuration") {
        return "under-year";
      }
      return undefined;
    });

    mockUseFieldArray.mockReturnValue({
      fields: [
        { id: "0", line1: "", line2: "", line3: "", postcode: "" },
        { id: "1", line1: "", line2: "", line3: "", postcode: "" },
      ],
      append: vi.fn(),
      remove: vi.fn(),
    });
  });

  it("renders TipCard with credit check info", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    expect(screen.getByTestId("tip-card")).toBeInTheDocument();
    expect(
      screen.getByText(personalDetailsProps.tipCard.goodToKnow),
    ).toBeInTheDocument();
    expect(
      screen.getByText(personalDetailsProps.tipCard.signUpCheckDetails),
    ).toBeInTheDocument();
  });

  it("renders DOB fields and button", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    expect(screen.getByTestId("text-input-dob-day")).toBeInTheDocument();
    expect(screen.getByTestId("text-input-dob-month")).toBeInTheDocument();
    expect(screen.getByTestId("text-input-dob-year")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: personalDetailsProps.additionalSection.dobLink,
      }),
    ).toBeInTheDocument();
  });

  it("renders address and residency radio options", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    expect(
      screen.getByText(personalDetailsProps.additionalSection.addressTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText("123 Main St, Apt 4, AB12 3CD"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("radio-under-year")).toBeInTheDocument();
    expect(screen.getByTestId("radio-over-year")).toBeInTheDocument();
  });

  it("renders landline section and checkbox", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    expect(
      screen.getByText(personalDetailsProps.additionalSection.landlineTitle),
    ).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: personalDetailsProps.additionalSection.landlineTextLink,
      }),
    ).toBeInTheDocument();
  });

  it("shows TipCard if requiresLandline is true", () => {
    render(
      <AdditionalPersonalDetailsForm
        {...defaultProps}
        requiresLandline={true}
      />,
    );

    const tipCards = screen.getAllByTestId("tip-card");
    expect(tipCards.length).toBeGreaterThan(1);
  });

  it("shows error for residencyDuration if present", () => {
    render(
      <AdditionalPersonalDetailsForm
        {...defaultProps}
        errors={
          {
            residencyDuration: {
              message: "Select a residency duration",
              type: "manual",
            },
          } as FieldErrors<PersonalDetails>
        }
      />,
    );

    expect(screen.getByText("Select a residency duration")).toBeInTheDocument();
  });

  it("shows DOB validation errors when hasSubmitted is true", () => {
    render(
      <AdditionalPersonalDetailsForm
        {...defaultProps}
        hasSubmitted={true}
        errors={
          {
            dobDay: {
              message: "Please enter a valid date",
              type: "manual",
            },
          } as FieldErrors<PersonalDetails>
        }
      />,
    );

    expect(screen.getByText("Please enter a valid date")).toBeInTheDocument();
  });

  it("shows tick icon when DOB fields are valid and form is submitted", () => {
    render(
      <AdditionalPersonalDetailsForm
        {...defaultProps}
        hasSubmitted={true}
        errors={{} as FieldErrors<PersonalDetails>}
      />,
    );

    const dobContainer = screen
      .getByTestId("text-input-dob-day")
      .closest(".flex.flex-row.gap-4.items-center");
    expect(dobContainer).toBeInTheDocument();

    const tickIconInDobSection = dobContainer?.querySelector(
      '[data-testid="tick-icon"]',
    );
    expect(tickIconInDobSection).toBeInTheDocument();
  });

  it("does not show tick icon when DOB fields have errors", () => {
    render(
      <AdditionalPersonalDetailsForm
        {...defaultProps}
        hasSubmitted={true}
        errors={
          {
            dobDay: {
              message: "Invalid day",
              type: "manual",
            },
          } as FieldErrors<PersonalDetails>
        }
      />,
    );

    const dobContainer = screen
      .getByTestId("text-input-dob-day")
      .closest(".flex.flex-row.gap-4.items-center");

    const tickIconInDobSection = dobContainer?.querySelector(
      '[data-testid="tick-icon"]',
    );
    expect(tickIconInDobSection).not.toBeInTheDocument();
  });

  it("shows previous address section when residency duration is under 1 year", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    expect(
      screen.getByText(
        "Please provide us with your current or previous address:",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Previous Address")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: personalDetailsProps.additionalSection.addAnotherAddress,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("House number/name")).toBeInTheDocument();
    expect(
      screen.getByLabelText("First line of your address"),
    ).toBeInTheDocument();
  });

  it("does not show previous address section when residency duration is over 1 year", () => {
    mockUseWatch.mockImplementation(({ name }) => {
      if (name === "residencyDuration") {
        return "over-year";
      }
      return undefined;
    });

    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    expect(
      screen.queryByText(
        "Please provide us with your current or previous address:",
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Previous Address")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: personalDetailsProps.additionalSection.addAnotherAddress,
      }),
    ).not.toBeInTheDocument();
  });

  it("opens DOB modal when button is clicked", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    const dobButton = screen.getByRole("button", {
      name: personalDetailsProps.additionalSection.dobLink,
    });

    fireEvent.click(dobButton);

    expect(
      screen.getByTestId(
        `info-modal-${personalDetailsProps.additionalSection.dobModalTitle}`,
      ),
    ).toBeInTheDocument();
  });

  it("opens telehealth modal when button is clicked", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);

    const telehealthButton = screen.getByRole("button", {
      name: personalDetailsProps.additionalSection.landlineTextLink,
    });

    fireEvent.click(telehealthButton);

    expect(
      screen.getByTestId(
        `info-modal-${personalDetailsProps.additionalSection.teleHealthDeviceModalTitle}`,
      ),
    ).toBeInTheDocument();
  });
});
