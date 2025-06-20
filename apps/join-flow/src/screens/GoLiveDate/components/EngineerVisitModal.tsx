import { InfoModal } from "@react-component-library/ui";
import { RefObject } from "react";

import { InsertLink } from "@/components/InsertLink";

import { GoLiveDateProps } from "../GoLiveDateProps";

export const EngineerVisitModal = ({
  modalRef,
  modalContent,
}: {
  modalRef: RefObject<HTMLDialogElement | null>;
  modalContent: GoLiveDateProps["engineerVisitModal"];
}) => {
  const { title, paragraphs, link } = modalContent;
  return (
    <InfoModal
      title={title}
      modalRef={modalRef}
      buttonText={modalContent.buttonText}
      buttonType="button"
    >
      <div className="pt-4 pb-6 md:pb-8 text-xs md:text-sm leading-[1.6] flex flex-col gap-2 md:gap-4">
        <p>{paragraphs[0]}</p>
        <p className="font-semibold">{paragraphs[1]}</p>
        <p>{paragraphs[2]}</p>
        <ul className="list-disc ml-6">
          <li>{paragraphs[3]}</li>
          <li>{paragraphs[4]}</li>
        </ul>
        <p>
          <InsertLink
            href={link}
            text={paragraphs[5]}
            searchText="what happens on the day of the installation/activation?"
            openInNewTab
          />
        </p>
      </div>
    </InfoModal>
  );
};
