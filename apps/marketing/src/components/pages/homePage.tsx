"use client";
import { HeroBanner } from "@/components/organisms/heroBanner";
import { CompanyLogoStripWrapper } from "@/components/molecules/companyLogoStrip";
import { AccordionWrapper } from "@/components/molecules/accordion";
import { FooterWrapper } from "@/components/organisms/Footer";
import { useTrustpilotScore } from "@/hooks/useTrustpilotScore";

export const HomePage = () => {
  const { data: trustpilotRating } = useTrustpilotScore();

  return (
    <div>
      <HeroBanner trustScore={trustpilotRating?.trustScore} />
      <CompanyLogoStripWrapper />
      <AccordionWrapper />
      <FooterWrapper trustScore={trustpilotRating?.trustScore} />
    </div>
  );
};
