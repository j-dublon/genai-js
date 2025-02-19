import { PostcodeChecker } from "@components/molecules/PostcodeChecker";

export const HowFastCanYouGo = () => {
  return (
    <div className="relative pb-16 px-5 gap-0 grid bg-[#f4f3ef] md:[grid-template-rows:160px_auto_160px] md:pb-0 md:items-center">
      <div className="rounded-lg p-6 md:p-10 bg-core-white drop-shadow-lg w-full h-fit order-2 md:order-none md:col-start-1 md:col-span-6 md:row-start-2 md:z-[1] md:max-w-[565px] md:ml-12 lg:ml-32">
        <PostcodeChecker
          titleText="How fast can you go?"
          inputBoxButtonText="Let's go"
          placeholderText="Enter postcode"
          isChevron={true}
        />
      </div>
      <video
        data-test-id="how-fast-can-you-go-video"
        autoPlay
        playsInline
        loop
        muted
        className="order-1 w-full max-h-[635px] object-cover md:col-start-5 md:col-span-8 md:row-start-1 md:row-span-3"
      >
        <source
          src="https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/1ed68638-5926-4c9e-b5a1-c0a1342dd5c2_CK_Flex_Master.webm"
          type="video/webm"
        />
        <source
          src="https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/7d413c03-5afb-4c9b-8934-f6f21ebda40c_CK_Flex_Master.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};
