"use client";
import {
  Heading,
  TextWithTick,
  PostcodeChecker,
  TrustpilotVertical,
} from "@react-component-library/ui";

export const HeroBanner: React.FC = () => {
  return (
    <div
      className="flex md:p-20 justify-between w-full gap-14 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/cuckoo_background.png')" }}
      data-testid="hero-banner"
    >
      <div className="flex-1 flex flex-col pr-10">
        <Heading headingText="Ridiculously fast full fibre broadband" />
        <p className="pb-5">
          Stream, game and WFH, all at the same time, with no drop-offs.
        </p>
        <form>
          <PostcodeChecker
            placeholderText="Pop in your address"
            inputBoxButtonText="Let's go"
          />
        </form>
        <TrustpilotVertical
          trustScore={4}
          width={100}
          height={100}
          trustPilotLogo={{
            altText: "Trustpilot Logo",
            imgSrc: "/assets/images/trustpilot-logo.svg",
          }}
        />
      </div>
      <div className="flex-1 py-10 md:flex flex-col gap-2 font-bold">
        {/* This will be updated to use data from the CMS */}
        <TextWithTick
          textInput="Full fibre speeds up to 900Mbps"
          ariaLabel="Full fibre speeds up to 900Mbps"
        />
        <TextWithTick
          textInput="5x more reliable than traditional broadband"
          ariaLabel="5x more reliable than traditional broadband"
        />
        <TextWithTick
          textInput="eero Pro 6E router"
          ariaLabel="eero Pro 6E router"
        />
        <TextWithTick
          textInput="UK-based Customer Care team"
          ariaLabel="UK-based Customer Care team"
        />
      </div>
    </div>
  );
};
