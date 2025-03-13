import { type ButtonHTMLAttributes, Ref } from "react";

export type Size = "small" | "medium" | "large";
export type Tint = "black" | "yellow" | "white" | "blue" | "grey";
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
  size = "large",
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
    small: `${fullWidth ? "ds:w-full" : "ds:w-fit"} ds:py-2 ds:px-4 ds:text-xs ds:md:text-sm ds:rounded-sm ds:before:rounded-sm ds:hover:before:rounded-md ds:hover:before:-inset-[2px]`,
    medium: `${fullWidth ? "ds:w-full" : "ds:w-[120px] ds:lg:w-[200px]"} ds:h-[60px] ds:text-sm ds:sm:text-md ds:py-4 ds:md:px-4 ds:lg:px-8 ds:rounded-md ds:before:rounded-md ds:hover:before:rounded-lg ds:hover:before:-inset-[2px]`,
    large: `${fullWidth ? "ds:w-full" : "ds:w-fit"} ds:text-sm ds:sm:text-md ds:py-3 ds:md:py-5 ds:px-5 ds:md:px-8 ds:rounded-md ds:before:rounded-md ds:hover:before:rounded-lg ds:hover:before:-inset-[4px]`,
  };

  const classNames = `
      ds:relative ds:z-1 ds:inline-flex ds:items-center ds:justify-center ds:font-bold ds:text-nowrap
      ds:before:content[''] ds:before:absolute ds:before:inset-0 ds:before:bg-inherit ds:before:border-2 ds:before:z-[-1]
      ds:before:transition-all ds:before:duration-200 ds:before:ease-in-out
      ds:before:border-${isWhite ? (isOutline ? grey : white) : colors[tint]}
      ${disabled ? "ds:cursor-not-allowed ds:opacity-50" : "ds:cursor-pointer"}
      ${sizes[size]}
      ${isOutline ? "ds:bg-transparent" : `ds:bg-${colors[tint]}`}
      ds:text-${textColor ? colors[textColor] : isOutline || isWhite ? black : isYellow ? black : white}
      ${className ?? ""}`;

  return (
    <>
      <div
        className={`ds:relative ds:inline-block ${fullWidth ? "ds:w-full" : ""}`}
      >
        <Component
          ref={ref}
          disabled={isButton ? disabled : undefined}
          href={href}
          onClick={onClick}
          type={isButton ? type : undefined}
          id={id}
          className={classNames}
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
