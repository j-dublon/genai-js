import { Button } from "@components/atoms/Button";
import { CloseIcon } from "@icons/CloseIcon";
import { RefObject } from "react";

interface InfoModalProps {
  title: string;
  titleStyling?: string;
  modalRef: RefObject<HTMLDialogElement | null>;
  buttonText?: string;
  onButtonClick?: () => void;
  validateBeforeClose?: () => boolean;
  buttonType?: "submit" | "button" | "reset";
}

export const InfoModal = ({
  title,
  titleStyling,
  buttonText,
  modalRef,
  onButtonClick,
  validateBeforeClose,
  children,
  buttonType = "submit",
}: React.PropsWithChildren<InfoModalProps>) => {
  const onClick = () => {
    if (validateBeforeClose && !validateBeforeClose()) {
      return;
    }

    modalRef.current?.close();
    if (onButtonClick) onButtonClick();
  };

  return (
    <dialog
      ref={modalRef}
      className="ds:bg-core-white ds:w-[90vw] ds:sm:w-[65vw] ds:md:w-[50vw] ds:md:max-w-[652px] ds:justify-self-center ds:self-center ds:p-6 ds:pb-4 ds:md:p-8 ds:rounded-md ds:md:rounded-lg ds:border-2 ds:border-core-grey-200 ds:[&::backdrop]:bg-core-black ds:[&::backdrop]:opacity-40 ds:overflow-y-auto ds:scrollbar-none"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="ds:flex ds:justify-between ds:items-start ds:gap-2">
        <h2
          id="modal-title"
          className={`ds:text-md ds:md:text-[26px] ds:font-semibold ds:leading-relaxed ${titleStyling}`}
        >
          {title}
        </h2>
        <button
          type={buttonType}
          onClick={() => modalRef.current?.close()}
          className="ds:text-gray-500 ds:hover:text-gray-700 ds:cursor-pointer"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
      </div>
      {children}
      {buttonText && (
        <div className="ds:flex ds:justify-end">
          <Button
            size="small"
            variant="solid"
            tint="yellow"
            onClick={onClick}
            aria-label="Confirm and close modal"
            type={buttonType}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </dialog>
  );
};
