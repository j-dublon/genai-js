"use client";

import { LoadingModal } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoadingModalSlide, useLoadingModal } from "@/hooks/useLoadingModal";

export const Address = ({ slides }: { slides: LoadingModalSlide[] }) => {
  const router = useRouter();
  const { serviceAddress } = useJoinFlowStore();
  const [isAddressLoadingModalOpen, setIsAddressLoadingModalOpen] =
    useState(false);

  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen: isAddressLoadingModalOpen,
    slides,
  });

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
    setIsAddressLoadingModalOpen(true);
    router.push("/join-flow");
  };

  return (
    <>
      <LoadingModal
        modalRef={loadingModalRef}
        loading={isAddressLoadingModalOpen}
        slides={slidesWithAssetPath}
      />
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
