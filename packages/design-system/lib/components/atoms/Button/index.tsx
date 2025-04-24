import { type ButtonHTMLAttributes, Ref } from "react";

export type Size = "small" | "medium" | "large";
export type Tint =
  | "black"
  | "yellow"
  | "white"
  | "blue"
  | "grey"
  | "light-peach";
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
  const isPale = isWhite || tint === "light-peach" || tint === "yellow";

  const borderColors = {
    black: "ds:before:border-core-black",
    yellow: "ds:before:border-core-yellow",
    white: "ds:before:border-core-white",
    blue: "ds:before:border-secondary-blue",
    grey: "ds:before:border-ui-grey-300",
    "light-peach": "ds:before:border-tertiary-peach-light",
  };

  const backgroundColors = {
    black: "ds:bg-core-black",
    yellow: "ds:bg-core-yellow",
    white: "ds:bg-core-white",
    blue: "ds:bg-secondary-blue",
    grey: "ds:bg-ui-grey-300",
    "light-peach": "ds:bg-tertiary-peach-light",
  };

  const textColors = {
    black: "ds:text-core-black",
    yellow: "ds:text-core-yellow",
    white: "ds:text-core-white",
    blue: "ds:text-secondary-blue",
    grey: "ds:text-ui-grey-300",
    "light-peach": "ds:text-tertiary-peach-light",
  };

  const sizes = {
    small: `${fullWidth ? "ds:w-full" : "ds:w-fit"} ds:py-2 ds:px-4 ds:text-xs ds:md:text-sm ds:rounded-sm ds:before:rounded-sm ds:hover:before:rounded-md ds:hover:before:-inset-[2px]`,
    medium: `${fullWidth ? "ds:w-full" : "ds:w-[120px] ds:lg:w-[200px]"} ds:h-15 ds:text-sm ds:sm:text-md ds:py-4 ds:md:px-4 ds:lg:px-8 ds:rounded-md ds:before:rounded-md ds:hover:before:rounded-lg ds:hover:before:-inset-[2px]`,
    large: `${fullWidth ? "ds:w-full" : "ds:w-fit"} ds:text-sm ds:sm:text-md ds:py-3 ds:md:py-5 ds:px-5 ds:md:px-8 ds:rounded-md ds:before:rounded-md ds:hover:before:rounded-lg ds:hover:before:-inset-[4px]`,
  };

  const classNames = `
      ds:relative ds:z-1 ds:inline-flex ds:items-center ds:justify-center ds:font-bold ds:text-nowrap
      ds:before:content[''] ds:before:absolute ds:before:inset-0 ds:before:bg-inherit ds:before:border-2 ds:before:z-[-1]
      ds:before:transition-all ds:before:duration-200 ds:before:ease-in-out
      ${isWhite ? (isOutline ? borderColors.grey : borderColors.white) : borderColors[tint]}
      ${disabled ? "ds:cursor-not-allowed ds:opacity-50" : "ds:cursor-pointer"}
      ${sizes[size]}
      ${isOutline ? "ds:bg-transparent" : backgroundColors[tint]}
      ${textColor ? textColors[textColor] : isOutline || isPale ? textColors.black : textColors.white}
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
