import { PostcodeChecker } from "@components/molecules/PostcodeChecker";
import { Dispatch, SetStateAction } from "react";

interface HowFastCanYouGoProps {
  postcode: string;
  setPostcode: Dispatch<SetStateAction<string>>;
  onPostcodeSubmit: (event: React.FormEvent) => void;
}

export const HowFastCanYouGo = ({
  postcode,
  setPostcode,
  onPostcodeSubmit,
}: HowFastCanYouGoProps) => {
  return (
    <div className="ds:relative ds:pb-16 ds:md:py-36 ds:bg-ui-grey-150 ds:flex ds:flex-col-reverse ds:md:items-center ds:px-mobile ds:sm:pl-tablet ds:lg:px-desktop">
      <div className="ds:relative ds:flex ds:flex-col ds:md:flex-row ds:items-center ds:w-full ds:max-w-[1152px] ds:gap-0 ds:z-10">
        <div className="ds:rounded-lg ds:p-6 ds:md:p-10 ds:-mt-16 ds:md:mt-0 ds:bg-core-white ds:w-full ds:h-fit  ds:order-2 ds:md:order-none ds:md:z-[1] ds:md:max-w-[565px]">
          <PostcodeChecker
            titleText="Ready for ridiculously fast full fibre?"
            inputBoxButtonText="Let's go"
            placeholderText="Pop in your postcode"
            postcode={postcode}
            setPostcode={setPostcode}
            onClickFunction={onPostcodeSubmit}
          />
        </div>
      </div>
      <div className="ds:md:absolute ds:md:top-0 ds:md:right-0 ds:w-full ds:md:h-full ds:z-0 ds:md:w-[calc(100%-565px)]">
        <video
          data-test-id="how-fast-can-you-go-video"
          autoPlay
          playsInline
          loop
          muted
          className="ds:w-full ds:h-full ds:object-cover"
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
    </div>
  );
};
