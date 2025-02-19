"use client";
import { CompanyLogoStripWrapper } from "@/components/molecules/CompanyLogoStrip";
import { FAQSection } from "@/components/molecules/FAQSection";
import { HowFastCanYouGoWrapper } from "@/components/molecules/HowFastCanYouGo";
import { CardSectionWrapper } from "@/components/organisms/CardSectionWrapper";
import { ClickSwitchDoneSection } from "@/components/organisms/ClickSwitchDoneSection";
import { CuckooProtect } from "@/components/organisms/CuckooProtect";
import { FooterWrapper } from "@/components/organisms/Footer";
import { HeroBanner } from "@/components/organisms/HeroBanner";
import { JoinTheFlock } from "@/components/organisms/JoinTheFlock";
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
      <HeroBanner
        trustScore={trustpilotRating?.trustScore}
        numberOfReviews={trustpilotRating?.numberOfReviews}
        broadbandOffer={broadbandOffer}
      />
      <CompanyLogoStripWrapper />
      <CardSectionWrapper />
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
      <HowFastCanYouGoWrapper />
      <FooterWrapper trustScore={trustpilotRating?.trustScore} />
    </div>
  );
};
