import { PostcodeChecker } from "@components/molecules/PostcodeChecker"

export interface HowFastCanYouGoProps {
  inputBackgroundVideoWebm: {
    url: string
  };
  inputBackgroundVideoMp4: {
    url: string
  };
}

export const HowFastCanYouGo: React.FC<HowFastCanYouGoProps> = ({
  inputBackgroundVideoWebm,
  inputBackgroundVideoMp4
}) => {
  return (
    <div className="relative pb-16 gap-0 grid bg-[#f4f3ef] md:[grid-template-rows:160px_auto_160px] md:pb-0 md:items-center">
      <div className="rounded-[22px] bg-core-white drop-shadow-lg w-full h-fit order-2 md:order-none md:col-start-1 md:col-span-6 md:row-start-2 md:z-[1]">
        <PostcodeChecker
          titleText="How fast can you go?"
          topText="Check your speed"
          placeholderText="Enter postcode"
        />
      </div>
      <video
        data-test-id="how-fast-can-you-go-video"
        autoPlay
        playsInline
        loop
        muted
        className="order-1 w-full max-h-[635px] object-cover md:col-start-5 md:col-span-8 md:row-start-1 md:row-span-3">
        {inputBackgroundVideoWebm?.url && (
          <source src={inputBackgroundVideoWebm.url} type="video/webm" />
        )}
        {inputBackgroundVideoMp4?.url && (
          <source src={inputBackgroundVideoMp4.url} type="video/mp4" />
        )}
      </video>
    </div>

  )
}

HowFastCanYouGo.displayName = "HowFastCanYouGo";


