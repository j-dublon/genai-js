import {
  TextWithTickList,
  TipCard,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";

import { ContactInfo } from "@/components/ContactInfo";
import { getAssetPath } from "@/lib/get-asset-path";

import { contactInfo, heading, reminders } from "./FooterProps";

export const Footer = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};

  return (
    <footer className="bg-core-white md:bg-ui-grey-100 px-mobile sm:px-tablet lg:px-desktop py-10 md:py-14">
      <div className="md:max-w-[1152px] mx-auto">
        <div className="flex flex-col-reverse w-full items-center md:items-start md:flex-row md:justify-between">
          <div className="w-full md:w-1/2 max-w-[505px] md:mr-10">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="hidden md:block font-semibold text-medium text-core-black pb-6">
                Prefer to talk to someone?
              </h2>
              <TipCard
                image={getAssetPath("/images/love.svg")}
                backgroundColor="grey"
                className="mt-10 md:mt-0 mb-10 md:mb-12 md:bg-core-white sm:max-w-[505px]"
              >
                <ContactInfo
                  phoneNumber={contactInfo.phoneNumber}
                  openingHoursText={contactInfo.openingHoursText}
                />
              </TipCard>
              {trustScore && (
                <TrustpilotHorizontal
                  trustScore={trustScore}
                  numberOfReviews={numberOfReviews}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col max-w-[505px] w-full md:w-1/2">
            <h2 className="font-semibold text-sm md:text-md text-core-black pb-6 leading-[1.6]">
              {heading}
            </h2>
            <div className="flex flex-col gap-3">
              <TextWithTickList textItems={reminders} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
