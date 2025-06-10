import { fireEvent, render, screen } from "@testing-library/react";
import type {
  Control,
  ControllerProps,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ModalContent } from "@/components/ModalContent";

import PersonalDetails from "..";
import { AdditionalPersonalDetailsForm } from "./additionalPersonalDetailsForm";
import type { AdditionalPersonalDetailsFormProps } from "./formValues";

vi.mock("@react-component-library/ui", () => ({
  TipCard: (
    props: React.PropsWithChildren<{
      image: { src: string; alt: string };
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
    />
  ),
  InfoModal: (
    props: React.PropsWithChildren<{
      title: string;
      modalRef: React.RefObject<HTMLDialogElement>;
      buttonText: string;
      buttonType: string;
    }>,
  ) => (
    <dialog data-testid={`info-modal-${props.title}`}>
      {props.title}
      {props.children}
      <button onClick={() => props.modalRef?.current?.close?.()}>
        {props.buttonText}
      </button>
    </dialog>
  ),
  useClickOutside: vi.fn(),
}));
vi.mock("@react-component-library/ui/icons", () => ({
  TickWithCircle: () => <svg data-testid="tick-icon" />,
}));
vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: (path: string) => path,
}));
vi.mock("../components/textInput", () => ({
  TextInput: (
    props: React.InputHTMLAttributes<HTMLInputElement> & { id: string },
  ) => <input data-testid={`text-input-${props.id}`} {...props} />,
}));
vi.mock("../components/ModalContent", () => ({
  ModalContent: (content: ModalContent[]) => (
    <div data-testid="modal-contents">{content[0]?.text}</div>
  ),
}));
vi.mock("@/hooks/useClearFocus", () => ({
  useClearFocus: vi.fn(),
}));
vi.mock("react-hook-form", async () => {
  const actual =
    await vi.importActual<typeof import("react-hook-form")>("react-hook-form");
  return {
    ...actual,
    Controller: <TFieldValues extends FieldValues>(
      props: ControllerProps<TFieldValues>,
    ) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props.render as any)({
        field: {
          value:
            (props.name as string) === "residencyDuration" ? "under1" : false,
          onChange: vi.fn(),
        },
      }),
    useWatch: vi.fn().mockReturnValue({
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      residencyDuration: "under1",
      requiresLandline: false,
    }),
  };
});

const personalDetailsProps: AdditionalPersonalDetailsFormProps["personalDetailsProps"] =
  {
    additionalSection: {
      dobTitle: "Your date of birth",
      dobDayPlaceholder: "DD",
      dobMonthPlaceholder: "MM",
      dobYearPlaceholder: "YYYY",
      dobLink: "Why do we need this?",
      addressTitle: "Your address",
      residencyOptions: [
        { value: "under1", label: "Under 1 year" },
        { value: "over1", label: "Over 1 year" },
      ],
      landlineTitle: "Do you need a landline?",
      landlineText: "Some info about landlines.",
      landlineTextLink: "Why do we ask?",
      landlineCheckboxText: "Yes, I need a landline",
      dobModalTitle: "Why we need your date of birth",
      dobModal: [{ title: "DOB Info", text: "We need your DOB." }],
      modalCloseText: "close",
      teleHealthDeviceModalTitle: "Telehealth device info",
      teleHealthDeviceModal: [{ title: "Telehealth Info", text: "Info here" }],
    },
  };

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
  personalDetailsProps,
  hasSubmitted: false,
};

describe("AdditionalPersonalDetailsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders TipCard with credit check info", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);
    expect(screen.getByText(/Good to know:/i)).toBeInTheDocument();
    expect(screen.getByText(/soft credit check/i)).toBeInTheDocument();
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
    expect(screen.getByText("Your address")).toBeInTheDocument();
    expect(
      screen.getByText("123 Main St, Apt 4, AB12 3CD"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("radio-under1")).toBeInTheDocument();
    expect(screen.getByTestId("radio-over1")).toBeInTheDocument();
  });

  it("renders landline section and checkbox", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);
    expect(screen.getByText("Do you need a landline?")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Why do we ask/i }),
    ).toBeInTheDocument();
  });

  it("shows TipCard if requiresLandline is true", () => {
    render(
      <AdditionalPersonalDetailsForm
        {...defaultProps}
        requiresLandline={true}
      />,
    );
    expect(
      screen.getByText(
        "As part of your sign up process, we’ll be running a soft credit check to make sure Cuckoo is right for you. We’ll let you know before this happens.",
      ),
    ).toBeInTheDocument();
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

  it("opens and closes DOB modal", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);
    const btn = screen.getByRole("button", {
      name: personalDetailsProps.additionalSection.dobLink,
    });
    fireEvent.click(btn);
    expect(
      screen.getByTestId("info-modal-Why we need your date of birth"),
    ).toBeInTheDocument();
  });

  it("opens and closes TeleHealth modal", () => {
    render(<AdditionalPersonalDetailsForm {...defaultProps} />);
    const btn = screen.getByRole("button", {
      name: personalDetailsProps.additionalSection.landlineTextLink,
    });
    fireEvent.click(btn);
    expect(
      screen.getByTestId("info-modal-Telehealth device info"),
    ).toBeInTheDocument();
  });
});
