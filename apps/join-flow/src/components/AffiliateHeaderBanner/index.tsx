import Link from "next/link";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { affiliateHeaderBannerProps } from "./affiliateHeaderBannerProps";

export const AffiliateHeaderBanner = () => {
  const [processedDescription, setProcessedDescription] = useState("");
  const [shortProcessedDescription, setShortProcessedDescription] =
    useState("");
  const { affiliateSession } = useJoinFlowStore();
  const headerBanner = affiliateSession?.displayItems?.headerBanner?.[0];
  const termsAndConditionsLink =
    affiliateSession?.displayItems?.termsAndConditionsLink;

  useEffect(() => {
    const renderMarkdownToHtml = async () => {
      if (headerBanner?.text) {
        const description = await remark()
          .use(html)
          .process(headerBanner?.text);
        setProcessedDescription(description.toString().replace(/p>/g, "span>"));
      }
      if (headerBanner?.shortText) {
        const shortDescription = await remark()
          .use(html)
          .process(headerBanner?.shortText);
        setShortProcessedDescription(
          shortDescription.toString().replace(/p>/g, "span>"),
        );
      }
    };

    renderMarkdownToHtml();
  }, [headerBanner?.text, headerBanner?.shortText]);

  if (!headerBanner) return null;

  return (
    <div className="flex px-5 py-3 md:p-3 items-center justify-center bg-secondary-green text-center text-xs leading-[1.6] z-50">
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
        <Link
          href={termsAndConditionsLink || "/error"}
          className="text-ui-link"
        >
          {affiliateHeaderBannerProps.linkText}
        </Link>
      </span>
    </div>
  );
};
