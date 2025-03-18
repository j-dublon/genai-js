"use client";
import { TermsAndConditions } from "@/components/atoms/TermsAndConditions";
import { CompanyLogoStripWrapper } from "@/components/molecules/CompanyLogoStrip";
import { FAQSection } from "@/components/molecules/FAQSection";
import { HowFastCanYouGoWrapper } from "@/components/molecules/HowFastCanYouGo";
import { CardSection } from "@/components/organisms/CardSection";
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
import { useTrustpilotScore } from "@/hooks";

export const HomePage = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const broadbandOffer = true;

  const enableCuckooProtect =
    process.env.NEXT_PUBLIC_ENABLE_CUCKOO_PROTECT === "true";

  const enableTermsAndConditionsText =
    process.env.NEXT_PUBLIC_ENABLE_TERMS_AND_CONDITIONS === "true";

  const termsAndConditionsText =
    "*Lorem ipsum dolor sit amet consectetur. Diam ullamcorper felis at vel amet nunc sed phasellus. Odio rhoncus.";

  return (
    <div className="w-full">
      <NavBarWrapper />
      <main>
        <HeroBanner
          trustScore={trustpilotRating?.trustScore}
          numberOfReviews={trustpilotRating?.numberOfReviews}
          broadbandOffer={broadbandOffer}
          enableTermsAndConditionsText={enableTermsAndConditionsText}
          termsAndConditionsText={termsAndConditionsText}
        />
        <CardSection />
        {enableTermsAndConditionsText && (
          <TermsAndConditions termsAndConditionsText={termsAndConditionsText} />
        )}
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
        />
        <MobileAppWrapper />
        <LifeAtCuckoo />
        <Guides
          guides={guides}
          guidesHeading={guidesHeading}
          guidesSubHeading={guidesSubHeading}
        />
        <HowFastCanYouGoWrapper />
      </main>
      <FooterWrapper trustScore={trustpilotRating?.trustScore} />
    </div>
  );
};
