import { PostcodeChecker } from "@components/molecules/PostcodeChecker"


export const HowFastCanYouGo: React.FC = () => {
  return (
    <div className="relative">
      <video
        autoPlay
        playsInline
        loop
        muted
        disableRemotePlayback
        className="object-cover w-full max-h-[635px] order-none"
      >
        <source
          src="https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/1ed68638-5926-4c9e-b5a1-c0a1342dd5c2_CK_Flex_Master.webm"
          type="video/webm"
        />
      </video>

      <div className="absolute inset-0 flex justify-start items-center pl-[140px]">
        <div className="mt-4 rounded-[22px] bg-core-white drop-shadow-lg max-w-[564px] max-h-[324px]">
          <PostcodeChecker
            titleText="How fast can you go?"
            topText="Check your speed"
            placeholderText="Enter postcode"
          />
        </div>
      </div>
    </div>
  )
}

HowFastCanYouGo.displayName = "HowFastCanYouGo";
