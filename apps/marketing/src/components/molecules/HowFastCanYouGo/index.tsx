"use client";
import { HowFastCanYouGo } from "@react-component-library/ui";

import { usePostcode } from "@/hooks";

export const HowFastCanYouGoWrapper = () => {
  const { postcode, setPostcode, handleFormSubmit } = usePostcode();
  return (
    <HowFastCanYouGo
      postcode={postcode}
      setPostcode={setPostcode}
      onPostcodeSubmit={handleFormSubmit}
    />
  );
};
