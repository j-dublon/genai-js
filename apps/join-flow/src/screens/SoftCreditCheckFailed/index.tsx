"use client";
import {
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";
import { useState } from "react";

import { NavBar } from "@/components/NavBar";
import { getAssetPath } from "@/lib/get-asset-path";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import { softCreditCheckFailedProps } from "./SoftCreditCheckFailedProps";

const SoftCreditCheckFailed = () => {
  const { personalDetails } = useJoinFlowStore();
  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleClick = () => {
    setShowAdditionalInfo(true);
  };

  return (
    <div className="w-full">
      <NavBar isContentPage={true} />
      <div className="relative flex min-h-[calc(100vh-100px)] flex-row overflow-x-hidden px-6 pt-4 pb-10 md:py-20 md:px-40">
        <div className="pointer-events-none absolute top-[-50px] left-[800px] -z-10 hidden h-[850px] w-[850px] md:block">
          <img
            src={getAssetPath("/images/3d_evolve_full.png")}
            alt=""
            className="scale-x-[-1] rotate-[-65deg] transform"
            aria-hidden="true"
          />
        </div>
        <div className="flex w-full flex-col gap-10 md:gap-16 items-start sm:max-w-[657px]">
          {showAdditionalInfo ? (
            <div className="flex flex-col gap-6">
              <h1 className="text-[26px] leading-[150%] font-semibold md:text-5xl md:leading-[120%]">
                {softCreditCheckFailedProps.additionalInfoPage.heading}
              </h1>
              <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                {softCreditCheckFailedProps.additionalInfoPage.paragraph1}
              </p>
              <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                {softCreditCheckFailedProps.additionalInfoPage.paragraph2}
              </p>
              <p className="text-xs leading-[160%] font-semibold md:text-sm md:leading-[162.5%]">
                {softCreditCheckFailedProps.additionalInfoPage.subtitle1}
              </p>
              <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                {softCreditCheckFailedProps.additionalInfoPage.paragraph3}
              </p>
              <div className="flex flex-col align-items-start">
                <p className="text-xs leading-[160%] font-semibold md:text-sm md:leading-[162.5%]">
                  {
                    softCreditCheckFailedProps.additionalInfoPage
                      .transUnionSection.title
                  }
                </p>
                <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                  {
                    softCreditCheckFailedProps.additionalInfoPage
                      .transUnionSection.address
                  }
                </p>
                <a
                  href={`tel:${softCreditCheckFailedProps.additionalInfoPage.transUnionSection.phone.replace(/\s/g, "")}`}
                  className="text-xs leading-[160%] font-normal text-ui-link underline md:text-sm md:leading-[162.5%]"
                >
                  {
                    softCreditCheckFailedProps.additionalInfoPage
                      .transUnionSection.phone
                  }
                </a>
                <a
                  href={
                    softCreditCheckFailedProps.additionalInfoPage
                      .transUnionSection.websiteHref
                  }
                  target="_blank"
                  className="text-xs leading-[160%] font-normal text-ui-link underline md:text-sm md:leading-[162.5%]"
                >
                  {
                    softCreditCheckFailedProps.additionalInfoPage
                      .transUnionSection.websiteText
                  }
                </a>
              </div>
              <div className="flex flex-col gap-8 rounded-md border border-ui-grey-100 bg-ui-grey-100 p-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-md leading-[162.5%] md:leading-[150%] font-semibold">
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .heading
                    }
                  </h2>
                  <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .paragraph
                    }
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 rounded-md border border-core-white bg-core-white p-6">
                  <h3 className="text-xs leading-[160%] font-semibold md:text-sm md:leading-[162.5%]">
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.heading1
                    }
                  </h3>
                  <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.paragraph1
                    }
                  </p>
                  <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                    <span className="font-semibold">
                      {
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.heading2
                      }
                    </span>
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.paragraph2
                    }{" "}
                    <a
                      href={
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.websiteHref1
                      }
                      target="_blank"
                      className="text-ui-link underline"
                    >
                      {
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.websiteText1
                      }
                    </a>
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.phone
                    }
                    .
                  </p>
                  <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                    <span className="font-semibold">
                      {
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.heading3
                      }
                    </span>
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.paragraph3
                    }
                    <a
                      href={
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.websiteHref2
                      }
                      target="_blank"
                      className="text-ui-link underline"
                    >
                      {
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.websiteText2
                      }
                    </a>
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.phone2
                    }
                  </p>
                  <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
                    <span className="font-semibold">
                      {
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.heading4
                      }
                    </span>
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.paragraph4
                    }
                    <a
                      href={
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.websiteHref3
                      }
                      target="_blank"
                      className="text-ui-link underline"
                    >
                      {
                        softCreditCheckFailedProps.additionalInfoPage
                          .cardSection.subsection.websiteText3
                      }
                    </a>
                    {
                      softCreditCheckFailedProps.additionalInfoPage.cardSection
                        .subsection.phone3
                    }
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-[26px] leading-[150%] font-semibold md:text-5xl md:leading-[120%]">
                {softCreditCheckFailedProps.initialPage.heading.replace(
                  "FIRST_NAME",
                  personalDetails?.firstName || "",
                )}
              </h1>
              <p className="pt-4 text-xs leading-[160%] font-normal md:pt-6 md:text-sm md:leading-[162.5%]">
                {softCreditCheckFailedProps.initialPage.paragraph}
              </p>
              <p className="pt-2 text-xs leading-[160%] font-normal md:pt-4 md:text-sm md:leading-[162.5%]">
                {softCreditCheckFailedProps.initialPage.buttonLabel}
                <button
                  onClick={handleClick}
                  className="text-ui-link underline"
                >
                  {softCreditCheckFailedProps.initialPage.buttonText}
                </button>
                .
              </p>
            </>
          )}
          {trustScore && (
            <TrustpilotHorizontal
              trustScore={trustScore}
              numberOfReviews={numberOfReviews}
              className="align-self-center"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SoftCreditCheckFailed;
