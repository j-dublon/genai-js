"use client";
import { HowFastCanYouGo } from "@react-component-library/ui";

import { usePostcode } from "@/hooks/usePostcode";

export const HowFastCanYouGoWrapper = () => {
  const { postcode, setPostcode } = usePostcode();
  return <HowFastCanYouGo postcode={postcode} setPostcode={setPostcode} />;
};
