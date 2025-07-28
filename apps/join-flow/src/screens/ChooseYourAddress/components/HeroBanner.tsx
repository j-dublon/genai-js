import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

import { AffiliateSession } from "@/store/useJoinFlowStore";

import { heroBannerProps } from "./heroBannerProps";

interface HeroBannerProps {
  affiliateContent: AffiliateSession["displayItems"];
}

const bannerStyles: Record<
  "default" | "apfn",
  {
    showBackgroundImage: boolean;
    backgroundColor: string;
    textColor: string;
    tAndCLinkColor: string;
  }
> = {
  default: {
    showBackgroundImage: true,
    backgroundColor: "bg-core-yellow",
    textColor: "text-core-black",
    tAndCLinkColor: "text-ui-link",
  },
  apfn: {
    showBackgroundImage: false,
    backgroundColor: "bg-ui-blue",
    textColor: "text-core-white",
    tAndCLinkColor: "text-ui-link-teal",
  },
};

export const HeroBanner = ({ affiliateContent }: HeroBannerProps) => {
  const [processedDescription, setProcessedDescription] = useState<string>("");
  const {
    defaultDescriptionText,
    defaultPrimaryTitle,
    defaultSecondaryTitle,
    tAndCLinkText,
  } = heroBannerProps;

  useEffect(() => {
    const renderMarkdownToHtml = async () => {
      if (affiliateContent?.landingPageBanner?.[0]?.descriptionText) {
        const description = await remark()
          .use(html)
          .process(affiliateContent.landingPageBanner[0].descriptionText);
        setProcessedDescription(description.toString().replace(/p>/g, "span>"));
      } else {
        setProcessedDescription(defaultDescriptionText);
      }
    };

    renderMarkdownToHtml();
  }, [affiliateContent?.landingPageBanner, defaultDescriptionText]);

  // TODO: Should handle an error here as the T&C is a hard requirement...although I don't think this can actually happen
  if (!affiliateContent) return null;

  const { landingPageBanner: landingPageBannerArray, termsAndConditionsLink } =
    affiliateContent;
  const landingPageBanner = landingPageBannerArray?.[0];

  const bannerStyle = bannerStyles[landingPageBanner?.style || "default"];

  return (
    <div className="col-span-4 mt-7 md:col-span-12 md:col-start-0 md:mt-16 md:mb-6">
      <div
        className={`relative flex flex-col items-center overflow-hidden rounded-md px-8 py-10 text-center md:rounded-lg md:px-32 md:py-14 ${bannerStyle.backgroundColor} ${bannerStyle.textColor}`}
      >
        {bannerStyle.showBackgroundImage && (
          <div className="absolute -top-4 -left-40 h-96 w-80 bg-[url(/vc-ap-join-flow/assets/images/cuckoo-3d.png)] bg-contain bg-no-repeat md:-top-4 md:-left-14 md:h-96 md:w-9/12" />
        )}
        <div className="relative">
          <h1 className="mb-4 text-3xl leading-[1.4] font-semibold md:text-6xl md:leading-[1.2]">
            {landingPageBanner?.primaryTitle
              ? landingPageBanner.primaryTitle
              : defaultPrimaryTitle}
          </h1>
          <div className="flex flex-col">
            <span className="mb-2 inline items-baseline justify-center md:inline-flex md:items-center">
              <span className="text-md leading-[1.5] font-semibold md:text-lg">
                {landingPageBanner?.secondaryTitle
                  ? landingPageBanner.secondaryTitle
                  : defaultSecondaryTitle}
              </span>
              {typeof landingPageBanner?.image !== "string" &&
                landingPageBanner?.image?.url && (
                  <span className="inline-block align-text-bottom md:inline-flex">
                    <Image
                      src={landingPageBanner.image.url}
                      alt={landingPageBanner.image.alt}
                      width={100}
                      height={100}
                      className="align-text-baseline h-6 w-auto self-center pl-2 md:h-8"
                    />
                  </span>
                )}
            </span>
          </div>
          <div className="justify-self-center text-center text-xs leading-[1.6] font-normal md:w-[700px] md:text-sm">
            <span
              dangerouslySetInnerHTML={{
                __html: processedDescription || "",
              }}
            />{" "}
            <Link
              className={bannerStyle.tAndCLinkColor}
              target="_blank"
              href={termsAndConditionsLink || "/"}
            >
              {tAndCLinkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
