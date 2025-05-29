"use client";

import { useTrustpilotScore } from "@react-component-library/ui";
import { LegalClaims } from "@react-component-library/ui/server";

import { TermsAndConditions } from "@/components/atoms/TermsAndConditions";
import { CompanyLogoStripWrapper } from "@/components/molecules/CompanyLogoStrip";
import { FAQSection, Question } from "@/components/molecules/FAQSection";
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
export const HomePage = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const broadbandOffer = true;
  const enableCuckooProtect =
    process.env.NEXT_PUBLIC_ENABLE_CUCKOO_PROTECT === "true";

  const enableTermsAndConditionsText =
    process.env.NEXT_PUBLIC_ENABLE_TERMS_AND_CONDITIONS === "true";

  const termsAndConditionsText =
    "*Lorem ipsum dolor sit amet consectetur. Diam ullamcorper felis at vel amet nunc sed phasellus. Odio rhoncus.";

  const questions: Question[] = [
    {
      dropdown_header: "Why should I choose Cuckoo?",
      dropdown_content: [
        "There's no one good reason to join Cuckoo. There are four: We only offer full fibre broadband which can easily handle all the streaming, gaming and WFHing you can throw at it. And is amazingly reliable too.",
      ],
      button_text: "Discover feel good broadband",
      button_link: "/broadband",
    },
    {
      dropdown_header: "Isn't switching a hassle?",
      dropdown_content: [
        "We’ve made the whole thing oh-so-simple. Just pop in your postcode at the top of the page, pick your speed and contract length, and then choose a start date. Our friendly, UK-based Customer Care team will guide you every step of the way and answer any questions you have. For more info, our switching page shows you just how easy it is.",
      ],
      button_text: "Make the switch",
      button_link: "/switching",
    },
    {
      dropdown_header: "Can I sign up over the phone?",
      dropdown_content: [
        "Yes! We understand that everyone does things differently, so our friendly team are always happy to help.",
        `You can sign up by calling us directly on: 0330 912 9955`,
      ],
    },
    {
      dropdown_header: "What are the benefits of full fibre?",
      dropdown_content: [
        "Full fibre gives you brilliantly fast, brilliantly reliable speeds of up to 900Mbps, all thanks to a fibre optic cable that connects directly to your home. ",
        "Unlike some providers, we don’t use the older, copper wire connections from those green cabinets on the street. Not only are they much, much slower and more likely to break, they also force you to share the bandwidth with your neighbours (which is what causes the dreaded buffering). ",
        "With Cuckoo, you have your very own future-proof connection. ",
      ],
      button_text: "Learn more",
      button_link: "https://www.cuckoo.co/guide/what-is-full-fibre",
    },
    {
      dropdown_header: "What speed do I need?",
      dropdown_content: [
        "Our full fibre broadband speeds of 150, 500 and 900Mbps are built for all your streaming, gaming and WFH needs. But what you need for your home depends on how many people you live with and how you all use the internet. Before you choose, our handy speed guide will tell you all you need to know.",
      ],
      button_text: "What speeds do you need",
      button_link: "https://www.cuckoo.co/guide/what-is-a-good-broadband-speed",
    },
  ];

  return (
    <>
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
            <TermsAndConditions
              termsAndConditionsText={termsAndConditionsText}
            />
          )}
          <CompanyLogoStripWrapper />
          <JoinTheFlock
            trustScore={trustpilotRating?.trustScore}
            numberOfReviews={trustpilotRating?.numberOfReviews}
          />
          <FAQSection
            questions={questions}
            heading="Questions about full fibre, broadband, or anything else at all?"
          />
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
          <LegalClaims />
        </main>
        <FooterWrapper trustScore={trustpilotRating?.trustScore} />
      </div>
    </>
  );
};
