import { InfoModal, useClickOutside } from "@react-component-library/ui";
import { useRef, useState } from "react";

import { HoverTooltip } from "@/components/HoverTooltip";

export interface ToolTipOrModalProps {
  tooltipText: string;
  tooltipContent: string;
}

export const ToolTipOrModal = ({
  tooltipText,
  tooltipContent,
}: ToolTipOrModalProps) => {
  const mobileModalRef = useRef<HTMLDialogElement>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const closeModal = (e?: MouseEvent) => {
    if (mobileModalRef.current) {
      e?.preventDefault();
      mobileModalRef.current.close();
      setIsMobileModalOpen(false);
    }
  };
  useClickOutside(mobileModalRef, isMobileModalOpen, closeModal);

  return (
    <>
      {/* Desktop tooltip */}
      <HoverTooltip tooltipText={tooltipText} tooltipContent={tooltipContent} />

      {/* Mobile button and modal */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          mobileModalRef.current?.showModal();
          setIsMobileModalOpen(true);
        }}
        className="mt-6 inline md:hidden cursor-help text-left"
      >
        <span className="text-xs text-core-black border-b border-dotted border-core-black">
          {tooltipText}
        </span>
      </button>

      <InfoModal
        title={tooltipText}
        modalRef={mobileModalRef}
        buttonText="Close"
        buttonType="button"
      >
        <p className="py-4 text-sm text-core-black">{tooltipContent}</p>
      </InfoModal>
    </>
  );
};
