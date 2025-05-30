import { ReasonCard } from "@react-component-library/ui";

const WhyGoCuckooSection = () => {
  return (
    <div className="pb-16 sm:pb-36 ds:bg-core-white ds:px-mobile ds:sm:px-tablet ds:lg:px-desktop ds:md:pt-10">
      <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-1 ds:gap-6 ds:md:gap-16 ds:max-w-[1152px] ds:justify-center ds:items-center ds:mx-auto">
        <div className="space-y-4">
          <h2 className="font-semibold text-[26px] sm:text-3xl md:text-5xl text-core-black max-w-[90%] md:max-w-[75%]">
            You get it
            <br />
            (here&apos;s why they will too)
          </h2>
          <span className="text-[26px]">
            As if £50 referral credit wasn&apos;t enough, we think your nearest
            and dearest are going to love Cuckoo. Here&apos;s why:
          </span>
        </div>
        <div className="flex flex-col justify-between space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          <ReasonCard
            iconUrl="https://images.prismic.io/cuckoo-egg/Z8AM-Z7c43Q3gSgS_Speed.png?auto=format,compress"
            heading="Ridiculously fast full fibre"
            subHeading="Broadband with speeds up to 900Mbps handles all the streaming, gaming or WFHing you can throw at it."
          />
          <ReasonCard
            iconUrl="https://images.prismic.io/cuckoo-egg/Z780h57c43Q3gRLN_eero_live.png?auto=format,compress"
            heading="Really fancy eero router"
            subHeading="The eero Pro 6E router shuts down viruses, malware and phishing threats before they ever reach you."
          />
          <ReasonCard
            iconUrl="https://images.prismic.io/cuckoo-egg/Z8A5ep7c43Q3gTJP_Eggsperts.png?auto=format,compress"
            heading="UK-based Customer Care"
            subHeading="Our lovely team are only ever a phone call or email away, and can't wait to talk about all things broadband."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyGoCuckooSection;
