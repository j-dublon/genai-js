"use client";

import {
  InfoModal,
  SimpleNavBar,
  useClickOutside,
} from "@react-component-library/ui";
import { useRef, useState } from "react";

import { useClearFocus } from "@/hooks/useClearFocus";
import { getAssetPath } from "@/lib/get-asset-path";

import { FibreModalContents } from "./FibreModalContents";
import { props } from "./NavWrapperProps";

export const NavWrapper = () => {
  const {
    additionalInfoText,
    infoText,
    title,
    subtitle,
    content,
    image,
    buttonText,
  } = props;
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useClearFocus(modalRef, "close");

  const closeFunction = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
  };
  useClickOutside(modalRef, isModalOpen, closeFunction);

  return (
    <>
      <SimpleNavBar
        logo={
          <img
            alt="Cuckoo"
            width={130}
            height={50}
            src={getAssetPath("/images/cuckoo.svg")}
            className="min-w-[130px] min-h-[50px]"
          />
        }
        additionalInfoText={additionalInfoText}
        infoText={infoText}
        onInfoClick={() => {
          modalRef.current?.showModal();
          setIsModalOpen(true);
        }}
      />
      <InfoModal title={title} modalRef={modalRef} buttonText={buttonText}>
        <FibreModalContents
          subtitle={subtitle}
          content={content}
          image={image}
        />
      </InfoModal>
    </>
  );
};
