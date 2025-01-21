import { JSX } from "react";

export function Chevron(): JSX.Element {
  return (
    <svg
      width="49"
      height="49"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24.5" cy="24.459" r="24" fill="#1F1F1F" />
      <path
        d="M21.3125 15.5996L30.1719 24.459L21.3125 33.3184"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
}
