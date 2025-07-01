import { TipCard } from "@react-component-library/ui";

import { ContactInfo } from "@/components/ContactInfo";
import { getAssetPath } from "@/lib/get-asset-path";

import { NotReadyToJoinForm } from "./NotReadyToJoinForm";
import { notReadyToJoinProps } from "./NotReadyToJoinProps";

export const NotReadyToJoin = () => {
  const {
    heading,
    description,
    contactInfoHeading,
    contactInfo: { phoneNumber, openingHours },
  } = notReadyToJoinProps;

  return (
    <section
      className="bg-core-yellow px-mobile sm:px-tablet lg:px-desktop py-10 md:pb-[90px] md:pt-[117px]"
      aria-label="Not ready to join section"
    >
      <div className="md:max-w-[1152px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-20 justify-center w-full">
          <div className="flex flex-col gap-5 md:gap-6 md:w-1/2">
            <h2 className="font-semibold text-[26px] md:text-3xl text-core-black max-w-[260px] md:max-w-[400px]">
              {heading}
            </h2>
            <p className="text-md max-w-[400px]">{description}</p>
            <h3 className="hidden md:block font-semibold text-md text-core-black">
              {contactInfoHeading}
            </h3>
            <TipCard
              image={getAssetPath("/images/love.svg")}
              className="bg-core-white sm:max-w-[505px]"
            >
              <ContactInfo
                phoneNumber={phoneNumber}
                openingHoursText={openingHours}
              />
            </TipCard>
          </div>
          <NotReadyToJoinForm />
        </div>
      </div>
    </section>
  );
};
