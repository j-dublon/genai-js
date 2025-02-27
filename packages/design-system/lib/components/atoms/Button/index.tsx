import { type ButtonHTMLAttributes, Ref } from "react";

export type Size = "small" | "medium";
export type Tint = "black" | "yellow" | "white" | "blue";
export type Variant = "solid" | "outline";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  href?: string;
  onClick?: (event?: React.SyntheticEvent) => void;
  size?: Size;
  tint?: Tint;
  variant?: Variant;
  rel?: string;
  target?: string;
  textColor?: Tint;
  ref?: Ref<HTMLElement>;
  fullWidth?: boolean;
}

export const Button = ({
  as: Component = "button",
  href,
  onClick,
  size = "medium",
  tint = "black",
  variant = "outline",
  children,
  type,
  id,
  rel,
  target,
  disabled,
  className,
  textColor,
  ref,
  fullWidth,
  ...props
}: ButtonProps) => {
  // if href provided it should always be an anchor
  if (href) Component = "a";
  const isLink = Component === "a";
  const isButton = Component === "button";
  const isOutline = variant === "outline";
  const isWhite = tint === "white";
  const isYellow = tint === "yellow";

  const colors = {
    black: "core-black",
    yellow: "core-yellow",
    white: "core-white",
    blue: "secondary-blue",
    grey: "ui-grey-300",
  };

  const { grey, white, black } = colors;

  const sizes = {
    small: "py-2 px-4 text-xs md:text-sm",
    medium: "py-3 md:py-5 px-5 md:px-8 text-sm md:text-md",
  };

  const buttonClasses = `
      relative z-1 inline-flex items-center justify-center font-bold text-nowrap
      before:content[''] before:absolute before:inset-0 before:bg-inherit before:border-2 before:z-[-1]
      before:transition-all before:duration-200 before:ease-in-out
      before:border-${isWhite ? (isOutline ? grey : white) : colors[tint]}
      button-animate
      ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} 
      ${sizes[size]} rounded-md
      ${isOutline ? "bg-transparent" : `bg-${colors[tint]}`} 
      hover:${isOutline ? "bg-opacity-10" : "bg-gray-700"}       
      text-${textColor ? colors[textColor] : isOutline || isWhite ? black : isYellow ? black : white}
      ${fullWidth ? "w-full" : "w-fit"} ${className ?? ""}`;

  return (
    <>
      <div className={`relative inline-block ${fullWidth ? "w-full" : ""}`}>
        <Component
          ref={ref}
          disabled={isButton ? disabled : undefined}
          href={href}
          onClick={onClick}
          type={isButton ? type : undefined}
          id={id}
          className={buttonClasses}
          rel={isLink ? rel : undefined}
          target={isLink ? target : undefined}
          {...props}
        >
          {children}
        </Component>
      </div>
    </>
  );
};
