import { JSX } from "react";

export interface FooterProps {
  titleText: string;
  topText?: string;
  placeholderText: string;
}

export function Footer(props: FooterProps): JSX.Element {
  const { titleText } = props;

  return (
    <div className="order-none z-10 p-10 w-fit">
      <h2 className="md:w-[59%] font-bold md:text-5xl text-[26px]">
        {titleText}
      </h2>
    </div>
  );
}

Footer.displayName = "Footer";
