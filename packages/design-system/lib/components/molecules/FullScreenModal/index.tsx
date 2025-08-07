import { ToggleSwitch } from "@components/atoms/ToggleSwitch";
import { CloseIcon } from "@icons/CloseIcon";
import { RefObject } from "react";
interface FullScreenModalProps {
  title: string;
  modalRef: RefObject<HTMLDialogElement | null>;
  toggle?: {
    isOn: boolean;
    onChange: (isOn: boolean) => void;
    leftLabel: string;
    rightLabel: string;
  };
}

export const FullScreenModal = ({
  title,
  modalRef,
  children,
  toggle,
}: React.PropsWithChildren<FullScreenModalProps>) => {
  return (
    <dialog
      ref={modalRef}
      className="ds:bg-[#3B3B3B] ds:max-w-[100vw] ds:max-h-[100vh] ds:w-full ds:h-full ds:px-5 ds:py-3 ds:md:px-23 ds:md:py-25"
      role="dialog"
      aria-label={`${title} modal`}
      aria-modal="true"
    >
      <div className="ds:flex ds:flex-col ds:items-center">
        <div className="ds:w-full ds:flex ds:flex-wrap ds:justify-between ds:mb-4 ds:md:mb-11 ds:items-center ds:md:max-w-[1252px] md:gap-4">
          <h2
            className="ds:text-core-white ds:text-xs ds:md:text-md ds:font-medium ds:align-middle"
            id="fullscreen-modal-title"
          >
            {title}
          </h2>
          {toggle && (
            <div className="ds:order-last ds:md:order-none ds:w-full ds:mt-6 ds:md:mt-0 ds:md:w-auto ds:md:ml-2 ds:md:mr-auto">
              <ToggleSwitch
                isOn={toggle.isOn}
                onChange={toggle.onChange}
                leftLabel={toggle.leftLabel}
                rightLabel={toggle.rightLabel}
              />
            </div>
          )}
          <button
            onClick={() => modalRef.current?.close()}
            className="ds:text-core-white ds:text-xs ds:md:text-md ds:font-medium ds:cursor-pointer ds:flex ds:flex-row ds:gap-2 ds:items-center"
            aria-label="Close modal"
          >
            Close
            <CloseIcon
              color="#FFFFFF"
              className="ds:max-w-[18px] ds:max-h-[18px] ds:md:max-w-[30px] ds:md:max-h-[30px]"
            />
          </button>
        </div>
        <div className="ds:bg-core-white ds:rounded-lg ds:md:max-w-[1252px] ds:w-full">
          {children}
        </div>
      </div>
    </dialog>
  );
};
