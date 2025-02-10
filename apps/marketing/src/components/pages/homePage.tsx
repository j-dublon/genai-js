"use client";
import { HeroBanner } from "@/components/organisms/heroBanner";
import { CompanyLogoStripWrapper } from "@/components/molecules/companyLogoStrip";
import { AccordionWrapper } from "@/components/molecules/accordion";
import { CardSectionWrapper } from "@/components/organisms/CardSectionWrapper";
import { FooterWrapper } from "@/components/organisms/Footer";
import { useTrustpilotScore } from "@/hooks/useTrustpilotScore";

export const HomePage = () => {
  const { data: trustpilotRating } = useTrustpilotScore();

  return (
    <div className="w-full">
      <HeroBanner trustScore={trustpilotRating?.trustScore} />
      <CompanyLogoStripWrapper />
      <CardSectionWrapper />
      <AccordionWrapper />
      <FooterWrapper trustScore={trustpilotRating?.trustScore} />
    </div>
  );
};
