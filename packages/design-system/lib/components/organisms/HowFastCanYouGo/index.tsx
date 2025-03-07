import { PostcodeChecker } from "@components/molecules/PostcodeChecker";
import { Dispatch, SetStateAction } from "react";

interface HowFastCanYouGoProps {
  postcode: string;
  setPostcode: Dispatch<SetStateAction<string>>;
}

export const HowFastCanYouGo = ({
  postcode,
  setPostcode,
}: HowFastCanYouGoProps) => {
  return (
    <div className="ds:relative ds:pb-16 ds:px-5 ds:gap-0 ds:grid ds:bg-[#f4f3ef] ds:md:[grid-template-rows:160px_auto_160px] ds:md:pb-0 ds:md:items-center">
      <div className="ds:rounded-lg ds:p-6 ds:md:p-10 ds:bg-core-white ds:drop-shadow-lg ds:w-full ds:h-fit ds:order-2 ds:md:order-none ds:md:col-start-3 ds:md:col-span-6 ds:md:row-start-2 ds:md:z-[1] ds:md:max-w-[565px] ds:md:ml-12 ds:lg:ml-32">
        <PostcodeChecker
          titleText="Ready for ridiculously fast full fibre?"
          inputBoxButtonText="Let's go"
          placeholderText="Pop in your postcode"
          isChevron={true}
          postcode={postcode}
          setPostcode={setPostcode}
        />
      </div>
      <video
        data-test-id="how-fast-can-you-go-video"
        autoPlay
        playsInline
        loop
        muted
        className="ds:order-1 ds:w-full ds:max-h-[635px] ds:object-cover ds:md:col-start-5 ds:md:col-span-8 ds:md:row-start-1 ds:md:row-span-3"
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
