import { PostcodeChecker } from "@components/molecules/PostcodeChecker"


export const HowFastCanYouGo: React.FC = () => {
  return (
    <div className="relative flex grid-cols-1 grid-rows-2 md:grid-cols-12 gap-4 bg-[#f4f3ef] h-[635px] p-4">
      <div className="z-10 flex order-last h-full col-span-12 md:items-center md:col-span-6 md:order-first">
        {/* Card component to be vertically centered */}
        <div className="rounded-[22px] bg-core-white drop-shadow-lg w-full h-fit md:max-w-[564px]">
          <PostcodeChecker
            titleText="How fast can you go?"
            topText="Check your speed"
            placeholderText="Enter postcode"
          />
        </div>
      </div>

      <div className="col-span-12 md:col-span-8 bg-[#f4f3ef] absolute md:bottom-0 right-0 z-0 order-first md:order-last">
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
      </div>
    </div>
  )
}

HowFastCanYouGo.displayName = "HowFastCanYouGo";


