import { InfoModal, useClickOutside } from "@react-component-library/ui";
import { InfoIcon, TickWithCircle } from "@react-component-library/ui/icons";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { FieldError } from "react-hook-form";

import {
  type ModalContent,
  ModalContent as ModalContentComponent,
} from "../ModalContent";
import { ToolTip } from "../Tooltip";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: FieldError;
  iconTooltip?: string;
  modalTitle?: string;
  modalContent?: ModalContent[];
  hasSubmitted?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      error,
      iconTooltip,
      className,
      placeholder,
      modalTitle,
      modalContent,
      hasSubmitted,
      ...props
    },
    ref,
  ) => {
    const formModalRef = useRef<HTMLDialogElement>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeDobModal = (e?: MouseEvent) => {
      if (formModalRef.current) {
        e?.preventDefault();
        formModalRef.current.close();
        setIsModalOpen(false);
      }
    };

    useClickOutside(formModalRef, isModalOpen, closeDobModal);
    const showTick = !error && hasSubmitted;
    return (
      <div className="w-full">
        <div className="relative">
          <input
            id={id}
            ref={ref}
            className={`w-full px-4 py-2 h-[62px] border-2 ${error ? "border-ui-error" : "border-ui-grey-300"} rounded-[8px] placeholder-black pr-12 ${className || ""}`}
            aria-invalid={error ? "true" : "false"}
            placeholder={placeholder}
            {...props}
          />
          {showTick && (
            <div className="absolute inset-y-0 right-4 flex items-center group cursor-pointer">
              <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
            </div>
          )}
          {iconTooltip && !showTick && (
            <>
              <div className="absolute inset-y-0 right-4 md:flex hidden items-center group cursor-pointer">
                <ToolTip gap={30} content={iconTooltip}>
                  <InfoIcon color="#009EA8" height={24} width={24} />
                </ToolTip>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  formModalRef.current?.showModal();
                  setIsModalOpen(true);
                }}
                className="absolute inset-y-0 right-4 flex md:hidden items-center group cursor-pointer"
              >
                <InfoIcon color="#009EA8" height={24} width={24} />
              </button>
            </>
          )}
        </div>
        {error && <p className="text-ui-error text-sm mt-1">{error.message}</p>}
        {modalTitle && modalContent && (
          <InfoModal
            title={modalTitle}
            modalRef={formModalRef}
            buttonText="close"
            buttonType="button"
          >
            <ModalContentComponent content={modalContent} />
          </InfoModal>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
