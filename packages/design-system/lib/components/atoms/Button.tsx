import React, { JSX } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...other }: ButtonProps): JSX.Element {
  return (
    <button className="bg-red-300 text-red-900" type="button" {...other}>
      {children}
    </button>
  );
}

Button.displayName = "Button";
