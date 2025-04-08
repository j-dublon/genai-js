import { Button } from "@components/atoms/Button";
import { CloseIcon } from "@icons/CloseIcon";
import { JSX, RefObject } from "react";

interface InfoModalProps {
  title: string;
  content: string;
  modalRef: RefObject<HTMLDialogElement | null>;
  subtitle?: string;
  image?: string;
  buttonText?: string;
}

export const InfoModal = ({
  title,
  subtitle,
  content,
  image,
  buttonText,
  modalRef,
}: InfoModalProps): JSX.Element => {
  return (
    <dialog
      ref={modalRef}
      className="ds:bg-core-white ds:w-[90vw] ds:sm:w-[65vw] ds:md:w-[45vw] ds:md:max-w-[652px] ds:justify-self-center ds:self-center ds:p-6 ds:pb-4 ds:md:p-8 ds:rounded-md ds:md:rounded-lg ds:border-2 ds:border-ui-grey-200 ds:[&::backdrop]:bg-core-black ds:[&::backdrop]:opacity-40"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby={
        subtitle ? "modal-subtitle modal-content" : "modal-content"
      }
      aria-modal="true"
    >
      <div className="ds:flex ds:justify-between ds:items-start ds:gap-2">
        <h2
          id="modal-title"
          className="ds:text-md ds:md:text-[26px] ds:font-semibold ds:leading-relaxed"
        >
          {title}
        </h2>
        <button
          onClick={() => modalRef.current?.close()}
          className="ds:text-gray-500 ds:hover:text-gray-700 ds:cursor-pointer"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
      </div>
      {image && (
        <img
          src={image}
          alt="Modal Image"
          className="ds:my-8 ds:md:my-4 ds:w-full"
        />
      )}
      {subtitle && (
        <p
          id="modal-subtitle"
          className="ds:text-xs ds:md:text-sm ds:font-semibold ds:leading-relaxed ds:text-core-black ds:pb-4"
        >
          {subtitle}
        </p>
      )}
      <p
        id="modal-content"
        className="ds:text-core-black ds:leading-relaxed ds:pb-8 ds:md:pb-6 ds:font-normal ds:text-xs ds:md:text-sm"
      >
        {content}
      </p>
      {buttonText && (
        <div className="ds:flex ds:justify-end">
          <Button
            size="small"
            variant="solid"
            tint="yellow"
            onClick={() => modalRef.current?.close()}
            aria-label="Confirm and close modal"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </dialog>
  );
};
