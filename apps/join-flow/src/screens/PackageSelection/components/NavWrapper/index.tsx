"use client";

import {
  InfoModal,
  SimpleNavBar,
  useClickOutside,
} from "@react-component-library/ui";
import { useRef, useState } from "react";

import { useClearFocus } from "@/hooks/useClearFocus";

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
      <SimpleNavBar fixed={false} backgroundColor="yellow">
        <div className="flex items-center gap-2 ml-2 text-nowrap text-right font-medium leading-[1.6] text-core-black text-xxs sm:text-sm">
          <button
            onClick={() => {
              modalRef.current?.showModal();
              setIsModalOpen(true);
            }}
            className="leading-[1.6] underline cursor-pointer text-ui-link"
          >
            {infoText}
          </button>
          <span className="hidden md:inline">{additionalInfoText}</span>
        </div>
      </SimpleNavBar>
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
