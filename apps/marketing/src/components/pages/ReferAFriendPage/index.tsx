"use client";

import { useTrustpilotScore } from "@react-component-library/ui";
import { ReferAFriendHero } from "@react-component-library/ui";

import { FAQSection } from "@/components/molecules/FAQSection";
import { HowFastCanYouGoWrapper } from "@/components/molecules/HowFastCanYouGo";
import { FooterWrapper } from "@/components/organisms/Footer";
import { Guides } from "@/components/organisms/Guides";
import { guides } from "@/components/organisms/Guides/guidesProps";
import { NavBarWrapper } from "@/components/organisms/NavBar";

import EveryoneWinsSection from "./EveryoneWinsSection";
import { faqSection, questions } from "./faqSectionProps";
import { guides as rafGuides } from "./guidesSectionProps";
import WhyGoCuckooSection from "./WhyGoCuckooSection";

export const ReferAFriendPage = () => {
  const { data: trustpilotRating } = useTrustpilotScore();

  return (
    <div className="w-full">
      <NavBarWrapper isContentPage={true} />
      <main>
        <ReferAFriendHero
          tag={{ text: "Get rewarded!", tint: "grey" }}
          title="Share the love and get £50 each"
          text="Invite your nearest and dearest to join Cuckoo, and every time you do, we'll give you both £50 credit. Yep - it's really that simple."
          imageSrc="https://images.prismic.io/cuckoo-egg/Z9wiVDiBA97Giukj_refer-2D.png?auto=format,compress"
          buttonText="Get your referral code"
        />
        <EveryoneWinsSection />
        <WhyGoCuckooSection />
        <FAQSection
          questions={questions}
          heading={faqSection.heading}
          subText={faqSection.subHeading}
        />
        <Guides
          guides={guides}
          guidesHeading={rafGuides.heading}
          guidesSubHeading={rafGuides.subHeading}
        />
        <HowFastCanYouGoWrapper />
      </main>
      <FooterWrapper trustScore={trustpilotRating?.trustScore} />
    </div>
  );
};
