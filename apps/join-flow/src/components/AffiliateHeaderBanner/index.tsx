import { Button } from "@react-component-library/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

import useJoinFlowStore, { AffiliateSession } from "@/store/useJoinFlowStore";

import { affiliateHeaderBannerProps } from "./affiliateHeaderBannerProps";

type HeaderBannerItem = NonNullable<
  NonNullable<AffiliateSession["displayItems"]>["headerBanner"]
>[number];

const isBasicPageBanner = (
  banner: HeaderBannerItem | undefined,
): banner is Extract<
  HeaderBannerItem,
  { blockType: "basicPageTitleBannerBlock" }
> => banner?.blockType === "basicPageTitleBannerBlock";

export const AffiliateHeaderBanner = () => {
  const [processedDescription, setProcessedDescription] = useState("");
  const [shortProcessedDescription, setShortProcessedDescription] =
    useState("");
  const { affiliateSession } = useJoinFlowStore();
  const headerBanner = affiliateSession?.displayItems?.headerBanner?.[0];
  const termsAndConditionsLink =
    affiliateSession?.displayItems?.termsAndConditionsLink;
  const isSalesAgent = headerBanner?.blockType === "salesAgentTitleBannerBlock";

  useEffect(() => {
    const renderMarkdownToHtml = async () => {
      if (isBasicPageBanner(headerBanner)) {
        if (headerBanner?.text) {
          const description = await remark()
            .use(html)
            .process(headerBanner?.text);
          setProcessedDescription(
            description.toString().replace(/p>/g, "span>"),
          );
        }
        if (headerBanner?.shortText) {
          const shortDescription = await remark()
            .use(html)
            .process(headerBanner?.shortText);
          setShortProcessedDescription(
            shortDescription.toString().replace(/p>/g, "span>"),
          );
        }
      }
    };

    if (isBasicPageBanner(headerBanner)) {
      renderMarkdownToHtml();
    }
  }, [headerBanner]);

  if (!headerBanner) return null;

  const AffiliateContent = () => (
    <span className="inline">
      <span
        dangerouslySetInnerHTML={{ __html: processedDescription }}
        className="hidden md:inline"
      />
      <span
        dangerouslySetInnerHTML={{
          __html: shortProcessedDescription || processedDescription,
        }}
        className="inline md:hidden"
      />
      <Link href={termsAndConditionsLink || "/error"} className="text-ui-link">
        {affiliateHeaderBannerProps.linkText}
      </Link>
    </span>
  );

  const SalesAgentContent = () => (
    <span className="flex flex-row w-full justify-between items-center md:px-8">
      <p className="font-semibold text-sm md:text-lg text-core-white">
        {affiliateHeaderBannerProps.salesAgentText}
      </p>
      <Button
        size="small"
        variant="solid"
        tint="white"
        href={`/join-flow/a/${affiliateSession?.code ?? "#"}`}
      >
        {affiliateHeaderBannerProps.salesAgentLinkText}
      </Button>
    </span>
  );

  return (
    <div
      className={`flex px-5 py-3 md:p-3 items-center justify-center text-center text-xs leading-[1.6] z-50 ${isSalesAgent ? "bg-core-red" : "bg-secondary-green"}`}
    >
      {isSalesAgent ? <SalesAgentContent /> : <AffiliateContent />}
    </div>
  );
};
