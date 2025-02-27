"use client";
import { CompanyLogoStripWrapper } from "@/components/molecules/CompanyLogoStrip";
import { FAQSection } from "@/components/molecules/FAQSection";
import { HowFastCanYouGoWrapper } from "@/components/molecules/HowFastCanYouGo";
import { CardSectionWrapper } from "@/components/organisms/CardSectionWrapper";
import { ClickSwitchDoneSection } from "@/components/organisms/ClickSwitchDoneSection";
import { CuckooProtect } from "@/components/organisms/CuckooProtect";
import { FooterWrapper } from "@/components/organisms/Footer";
import { Guides } from "@/components/organisms/Guides";
import {
  guides,
  guidesHeading,
  guidesSubHeading,
} from "@/components/organisms/Guides/guidesProps";
import { HeroBanner } from "@/components/organisms/HeroBanner";
import { JoinTheFlock } from "@/components/organisms/JoinTheFlock";
import { LifeAtCuckoo } from "@/components/organisms/LifeAtCuckoo";
import { MobileAppWrapper } from "@/components/organisms/MobileAppWrapper";
import { NavBarWrapper } from "@/components/organisms/NavBar";
import { TrustPilotSliderWrapper } from "@/components/organisms/TrustPilotSlider";
import { reviews } from "@/components/organisms/TrustPilotSlider/trustpilotSliderProps";
import { useTrustpilotScore } from "@/hooks/useTrustpilotScore";
export const HomePage = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const broadbandOffer = true;

  const enableCuckooProtect =
    process.env.NEXT_PUBLIC_ENABLE_CUCKOO_PROTECT === "true";

  return (
    <div className="w-full">
      <NavBarWrapper />
      <HeroBanner
        trustScore={trustpilotRating?.trustScore}
        numberOfReviews={trustpilotRating?.numberOfReviews}
        broadbandOffer={broadbandOffer}
      />
      <CardSectionWrapper />
      <CompanyLogoStripWrapper />
      <JoinTheFlock
        trustScore={trustpilotRating?.trustScore}
        numberOfReviews={trustpilotRating?.numberOfReviews}
      />
      <FAQSection />
      <ClickSwitchDoneSection />
      {enableCuckooProtect && <CuckooProtect />}
      <TrustPilotSliderWrapper
        reviewCount={Number(trustpilotRating?.numberOfReviews)}
        trustScore={Number(trustpilotRating?.trustScore)}
        reviews={reviews}
      />
      <MobileAppWrapper />
      <LifeAtCuckoo />
      <Guides
        guides={guides}
        guidesHeading={guidesHeading}
        guidesSubHeading={guidesSubHeading}
      />
      <HowFastCanYouGoWrapper />
      <FooterWrapper trustScore={trustpilotRating?.trustScore} />
    </div>
  );
};
