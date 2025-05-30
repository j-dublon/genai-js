import { Button, ColorPill } from "@lib/index.client";
import Link from "next/link";

interface HeroProps {
  tag?: { text: string; tint: string };
  title?: string;
  text?: string;
  imageSrc: string;
  buttonText: string;
}

export const ReferAFriendHero = ({
  tag,
  title,
  text,
  imageSrc,
  buttonText,
}: HeroProps) => {
  return (
    <section className="ds:w-full ds:px-5 ds:md:px-12 ds:items-center ds:max-w-[1560px] ds:mx-auto">
      <div
        className={`ds:flex ds:flex-col ds:justify-between ds:md:flex-row ds:rounded-lg ds:relative ds:overflow-hidden`}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Main Content */}
        <div className="ds:order-2 ds:md:order-1 ds:md:w-1/2 ds:h-full ds:flex ds:flex-col ds:justify-between ds:md:pr-8 ds:md:pl-28 ds:px-5 ds:pt-4 ds:pb-8 ds:md:py-20">
          {tag && (
            <ColorPill
              colorPillText={tag.text}
              backgroundColor="yellow"
              size="small"
            />
          )}
          <p className="ds:text-3xl ds:md:text-6xl ds:font-semibold ds:my-4 ds:md:leading-16 ds:text-core-black">
            {title}
          </p>
          <div>
            <div className="ds:text-core-black ds:text-md ds:sm:text-[26px]">
              {text}
            </div>
            <div className="ds:text-core-black ds:mb-6 ds:md:mb-8 ds:text-md ds:sm:text-[26px]">
              <Link href="/legal/promotional-terms" className="ds:underline">
                T&Cs
              </Link>{" "}
              apply.
            </div>
          </div>
          {buttonText && (
            <Button tint="black" variant="solid" href="/account/login">
              Get your referral code
            </Button>
          )}
        </div>
        <div className="ds:order-1 ds:md:order-2 ds:w-full ds:flex ds:justify-center ds:md:w-1/2 ds:md:absolute ds:top-1 ds:md:right-2 ds:md:justify-end ds:pt-8 ds:md:pr-10">
          <img
            src="https://images.prismic.io/cuckoo-egg/aBxzSCdWJ-7kRvhJ_Group27238.png?auto=format,compress"
            className="ds:max-w-[300px] ds:sm:max-w-[360px]"
            alt="Refer a friend"
          />
        </div>
      </div>
    </section>
  );
};
