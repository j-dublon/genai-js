import { render, screen } from "@testing-library/react";
import type {
  Control,
  ControllerProps,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FormInputProps } from "@/components/FormInput";
import { TooltipProps } from "@/components/Tooltip";

import PersonalDetails from "..";
import personalDetailsProps from "../personalDetailsProps";
import type { InitialPersonalDetailsProps } from "./formValues";
import { InitialPersonalDetailsForm } from "./initialPersonalDetailsForm";

vi.mock("@/components/FormInput", () => ({
  __esModule: true,
  default: (props: FormInputProps) => (
    <input data-testid={`form-input-${props.id}`} {...props} />
  ),
}));
vi.mock("@/components/Tooltip", () => ({
  ToolTip: (props: TooltipProps) => (
    <span data-testid="tooltip">{props.children}</span>
  ),
}));
vi.mock("@react-component-library/ui", () => ({
  TipCard: (
    props: React.PropsWithChildren<{
      image: { src: string; alt: string };
      className: string;
    }>,
  ) => <div data-testid="tip-card">{props.children}</div>,
  useClickOutside: () => {},
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
}));
vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: (path: string) => path,
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
          value: (props.name as string) === "hasSmartphone" ? "yes" : false,
          onChange: vi.fn(),
        },
      }),
    useWatch: vi.fn().mockReturnValue({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      confirmEmail: "",
      hasSmartphone: "yes",
      marketingConsent: false,
    }),
  };
});

const defaultProps: InitialPersonalDetailsProps = {
  register: vi.fn() as UseFormRegister<PersonalDetails>,
  errors: {} as FieldErrors<PersonalDetails>,
  hasSmartphoneValue: "yes",
  personalDetailsProps,
  control: {} as Control<PersonalDetails>,
  hasSubmitted: false,
};

describe("InitialPersonalDetailsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all main input fields", () => {
    render(<InitialPersonalDetailsForm {...defaultProps} />);
    expect(screen.getByTestId("form-input-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("form-input-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("form-input-phone")).toBeInTheDocument();
    expect(screen.getByTestId("form-input-email")).toBeInTheDocument();
    expect(screen.getByTestId("form-input-confirmEmail")).toBeInTheDocument();
  });

  it("renders the tooltip", () => {
    render(<InitialPersonalDetailsForm {...defaultProps} />);
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getAllByText(/Why is this/)[0]).toBeInTheDocument();
  });

  it("renders radio options for smartphone", () => {
    render(<InitialPersonalDetailsForm {...defaultProps} />);
    expect(screen.getByTestId("radio-yes")).toBeInTheDocument();
    expect(screen.getByTestId("radio-no")).toBeInTheDocument();
  });

  it("renders marketing consent checkbox", () => {
    render(<InitialPersonalDetailsForm {...defaultProps} />);
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });

  it("renders marketing text with privacy notice link", () => {
    render(<InitialPersonalDetailsForm {...defaultProps} />);
    expect(screen.getByText("Privacy Notice")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.cuckoo.co/legal/privacy",
    );
  });

  it("shows TipCard if hasSmartphoneValue is 'no'", () => {
    render(
      <InitialPersonalDetailsForm {...defaultProps} hasSmartphoneValue="no" />,
    );
    expect(screen.getByTestId("tip-card")).toBeInTheDocument();
    expect(
      screen.getByText(
        /You'll need a smartphone to get Cuckoo. We can't provide our service without a smartphone./i,
      ),
    ).toBeInTheDocument();
  });

  it("does not show TipCard if hasSmartphoneValue is 'yes'", () => {
    render(
      <InitialPersonalDetailsForm {...defaultProps} hasSmartphoneValue="yes" />,
    );
    expect(
      screen.queryByText(
        /You'll need a smartphone to get Cuckoo. We can't provide our service without a smartphone./i,
      ),
    ).not.toBeInTheDocument();
  });
});
