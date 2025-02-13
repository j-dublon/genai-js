"use client";
import { AccordionWrapper } from "@/components/molecules/accordion";
import { CompanyLogoStripWrapper } from "@/components/molecules/companyLogoStrip";
import { CardSectionWrapper } from "@/components/organisms/CardSectionWrapper";
import { ClickSwitchDoneSection } from "@/components/organisms/ClickSwitchDoneSection";
import { FooterWrapper } from "@/components/organisms/Footer";
import { HeroBanner } from "@/components/organisms/heroBanner";
import { useTrustpilotScore } from "@/hooks/useTrustpilotScore";

export const HomePage = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const broadbandOffer = true;

  return (
    <div className="w-full">
      <HeroBanner
        trustScore={trustpilotRating?.trustScore}
        numberOfReviews={trustpilotRating?.numberOfReviews}
        broadbandOffer={broadbandOffer}
      />
      <CompanyLogoStripWrapper />
      <CardSectionWrapper />
      <AccordionWrapper />
      <ClickSwitchDoneSection />
      <FooterWrapper trustScore={trustpilotRating?.trustScore} />
    </div>
  );
};
