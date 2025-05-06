import { CloseIcon } from "@icons/CloseIcon";
import { JSX, RefObject } from "react";
interface FullScreenModalProps {
  title: string;
  modalRef: RefObject<HTMLDialogElement | null>;
}

export const FullScreenModal = ({
  title,
  modalRef,
  children,
}: React.PropsWithChildren<FullScreenModalProps>): JSX.Element => {
  return (
    <dialog
      ref={modalRef}
      className="ds:bg-[#3B3B3B] ds:max-w-[100vw] ds:max-h-[100vh] ds:w-full ds:h-full ds:px-5 ds:py-3 ds:md:px-23 ds:md:py-25"
      role="dialog"
      aria-label={`${title} modal`}
      aria-modal="true"
    >
      <div className="ds:flex ds:justify-between ds:items-end ds:gap-2 ds:mb-4 ds:md:mb-13">
        <h2 className="ds:text-core-white ds:text-sm ds:md:text-md ds:font-medium">
          {title}
        </h2>
        <button
          onClick={() => modalRef.current?.close()}
          className="ds:text-core-white ds:text-sm ds:md:text-md ds:font-medium ds:cursor-pointer ds:flex ds:flex-row ds:gap-2 ds:items-center"
          aria-label="Close modal"
        >
          Close
          <CloseIcon color="#FFFFFF" width={30} height={30} />
        </button>
      </div>
      <div className="ds:bg-core-white ds:rounded-lg ds:md:px-20 ds:lg:px-29 ds:md:pt-16 ds:md:pb-25 flex justify-center">
        {children}
      </div>
    </dialog>
  );
};
