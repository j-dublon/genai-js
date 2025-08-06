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

type BannerStyleBase = {
  useLogoAsTitle: boolean;
  backgroundColor?: string;
  textColor: string;
  tAndCLinkColor: string;
};

type BannerStyleWithBackgroundImage = BannerStyleBase & {
  showBackgroundImage: true;
  backgroundImageUrl: string;
  backgroundImageStyle: string;
};

type BannerStyleWithoutBackgroundImage = BannerStyleBase & {
  showBackgroundImage: false;
};

type BannerStyle =
  | BannerStyleWithBackgroundImage
  | BannerStyleWithoutBackgroundImage;

const bannerStyles: Record<"default" | "apfn" | "raf", BannerStyle> = {
  default: {
    useLogoAsTitle: false,
    showBackgroundImage: true,
    backgroundImageUrl:
      "bg-[url(/vc-ap-join-flow/assets/images/cuckoo-3d.png)]",
    backgroundImageStyle:
      "h-96 w-80 md:w-9/12 -top-4 -left-40 md:-top-4 md:-left-14 bg-contain",
    backgroundColor: "bg-core-yellow",
    textColor: "text-core-black",
    tAndCLinkColor: "text-ui-link",
  },
  apfn: {
    useLogoAsTitle: false,
    showBackgroundImage: false,
    backgroundColor: "bg-ui-blue",
    textColor: "text-core-white",
    tAndCLinkColor: "text-ui-link-teal",
  },
  raf: {
    useLogoAsTitle: true,
    showBackgroundImage: true,
    backgroundImageUrl: "bg-[url(/vc-ap-join-flow/assets/images/2d_world.png)]",
    backgroundImageStyle:
      "w-full h-130 sm:h-120 md:h-104 bg-cover bg-center -top-20",
    textColor: "text-core-black",
    tAndCLinkColor: "text-ui-link",
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

  const landingPageBanner = affiliateContent?.landingPageBanner?.[0];
  const termsAndConditionsLink = affiliateContent?.termsAndConditionsLink;

  useEffect(() => {
    const renderMarkdownToHtml = async () => {
      if (landingPageBanner?.descriptionText) {
        const description = await remark()
          .use(html)
          .process(landingPageBanner.descriptionText);
        setProcessedDescription(description.toString().replace(/p>/g, "span>"));
      } else {
        setProcessedDescription(defaultDescriptionText);
      }
    };

    renderMarkdownToHtml();
  }, [landingPageBanner?.descriptionText, defaultDescriptionText]);

  const bannerStyle = bannerStyles[landingPageBanner?.style || "default"];

  return (
    <div className="col-span-4 md:col-span-12 md:col-start-0 mb-10 md:mb-16">
      <div
        className={`relative flex flex-col items-center overflow-hidden rounded-md px-8 py-10 text-center md:rounded-lg md:px-32 md:py-14 ${bannerStyle.backgroundColor} ${bannerStyle.textColor}`}
      >
        {bannerStyle.showBackgroundImage && (
          <div
            className={`absolute ${bannerStyle.backgroundImageUrl} ${bannerStyle.backgroundImageStyle} bg-no-repeat`}
          />
        )}
        <div className="relative">
          {bannerStyle.useLogoAsTitle &&
          typeof landingPageBanner?.image !== "string" &&
          landingPageBanner?.image?.url ? (
            <Image
              src={landingPageBanner.image.url}
              alt={landingPageBanner.image.alt}
              width={100}
              height={100}
              className="mb-4 h-34 w-auto self-center justify-self-center md:h-25"
            />
          ) : (
            <h1 className="mb-4 text-3xl leading-[1.4] font-semibold md:text-6xl md:leading-[1.2]">
              {landingPageBanner?.primaryTitle
                ? landingPageBanner.primaryTitle
                : defaultPrimaryTitle}
            </h1>
          )}
          <div className="flex flex-col">
            <span className="mb-2 inline items-baseline justify-center md:inline-flex md:items-center">
              <span className="text-md leading-[1.5] font-semibold md:text-lg">
                {landingPageBanner?.secondaryTitle
                  ? landingPageBanner.secondaryTitle
                  : defaultSecondaryTitle}
              </span>
              {!bannerStyle.useLogoAsTitle &&
                typeof landingPageBanner?.image !== "string" &&
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
