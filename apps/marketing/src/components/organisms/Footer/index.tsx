"use client";
import { Footer } from "@react-component-library/ui";
import { props } from "./footerProps";

interface FooterWrapperProps {
  trustScore?: number;
}

export const FooterWrapper = ({ trustScore }: FooterWrapperProps) => {
  return <Footer {...props} trustScore={trustScore} />;
};
