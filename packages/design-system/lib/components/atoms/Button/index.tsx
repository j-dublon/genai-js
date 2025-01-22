import React, { JSX } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...other }: ButtonProps): JSX.Element {
  return (
    <button
      className=" px-2 py-2 rounded-[80px] w-60 bg-core-blue text-core-black"
      type="button"
      {...other}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";
