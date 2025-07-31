import useJoinFlowStore from "@store/useJoinFlowStore";
import Link from "next/link";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { TermLength } from "@/lib/createOfferContent";

import { includedOffersProps } from "./includedOffersProps";

export const IncludedOffers = () => {
  const { selectedPackage, eeroSelection, affiliateSession } =
    useJoinFlowStore();
  const { monthlySaving } = usePricingCalculations(
    selectedPackage,
    eeroSelection,
  );

  if (!selectedPackage?.offers || selectedPackage.offers.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-col gap-4 md:gap-6">
      {selectedPackage.offers.map((offer, index) => {
        const offerProps = includedOffersProps[offer.blockType];
        switch (offer.blockType) {
          case "promotionBlock":
            offerProps.content = offerProps.content.replace(
              "DISCOUNT_VALUE",
              monthlySaving,
            );
            offerProps.content = offerProps.content.replace(
              "DISCOUNT_TERM",
              TermLength[offer.promotion.term || "wholeContract"],
            );
            break;
          case "billCreditBlock":
            offerProps.content = offerProps.content.replace(
              "CREDIT_AMOUNT",
              offer.value.toString(),
            );
            break;
        }

        return (
          <div key={index} className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-sm md:text-md font-semibold leading-[1.5] md:leading-[1.6]">
              {offerProps.title}
            </h3>
            <div className="bg-ui-grey-100 p-5 md:p-6 rounded-md md:rounded-sm">
              <p className="text-xs font-normal leading-[1.6]">
                {offerProps.content}
                <Link
                  href={
                    affiliateSession?.displayItems?.termsAndConditionsLink ||
                    "/"
                  }
                  target="_blank"
                  className="text-ui-link"
                >
                  {offerProps.linkText}
                </Link>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
