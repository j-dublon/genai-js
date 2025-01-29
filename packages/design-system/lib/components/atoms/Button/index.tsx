import { type ButtonHTMLAttributes, forwardRef, JSX } from "react";

export namespace IButton {
  type Size = "small" | "medium" | "large";
  export type Tint = "black" | "yellow" | "white" | "blue";
  export type Variant = "solid" | "outline";
  export interface IProps extends ButtonHTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    isDisabled?: boolean;
    fullWidth?: boolean;
    href?: string;
    onClick?: (event?: React.SyntheticEvent) => void;
    size?: Size | Size[];
    tint?: Tint;
    outlineColour?: Tint;
    variant?: Variant;
    justifyContent?: string;
  }
}

export const Button = forwardRef(
  (
    {
      as: Component = "button",
      isDisabled = false,
      fullWidth = false,
      href,
      onClick,
      size = "medium",
      tint,
      variant,
      children,
      type,
      id,
      outlineColour,
      justifyContent = "center",
      ...props
    }: IButton.IProps,
    ref
  ) => {
    const isOutline = variant === "outline";
    const buttonClasses = `
    inline-flex items-center justify-${justifyContent} 
    transition-all duration-300 ease-in 
    ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
    ${isOutline ? "border-2" : "bg-transparent border-0"}
    ${
      isOutline
        ? outlineColour === "blue"
          ? "border-blue-500 text-blue-500"
          : "border-ui-grey-300 text-gray-800"
        : "text-white"
    }
    ${
      size === "small"
        ? "py-2 px-3 text-sm rounded-md"
        : size === "large"
        ? "py-4 px-6 text-lg rounded-lg"
        : "py-3 px-4 text-base rounded-md"
    }
    hover:${isOutline ? "bg-opacity-10" : "bg-gray-700"} 
    hover:border-gray-400
    hover:rounded-xl
    hover:py-3 hover:px-4 
    w-64
  `;

    return (
      <Component
        ref={ref}
        disabled={isDisabled}
        href={href}
        onClick={onClick}
        type={type}
        id={id}
        className={buttonClasses}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
