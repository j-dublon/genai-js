"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";

export const Address = () => {
  const router = useRouter();
  const { serviceAddress, resetFlow } = useJoinFlowStore();

  const formattedAddress = serviceAddress
    ? [
        serviceAddress.line1,
        serviceAddress.line2,
        serviceAddress.line3,
        serviceAddress.postcode,
      ]
        .filter(Boolean)
        .join(", ")
    : "No address information available";

  const handleChangeAddress = () => {
    router.push("/join-flow");
    resetFlow();
  };

  return (
    <>
      <p className="text-core-black text-sm font-medium leading-[1.4] md:text-md md:font-semibold md:leading-[1.5]">
        {formattedAddress}
      </p>
      <button
        onClick={handleChangeAddress}
        className="underline text-ui-link text-sm font-medium leading-[1.4] md:text-sm md:leading-[1.6]"
      >
        Change my address
      </button>
    </>
  );
};
