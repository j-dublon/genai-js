import { Arrow } from "@icons/Arrow";
import { useState } from "react";

import { Button } from "../Button";
import { Collapser } from "./collapser";

export interface QuestionsArrProps {
  dropdown_header: string;
  dropdown_content: string[];
  button_text?: string;
  button_link?: string;
}

interface FaqItemProps {
  question: QuestionsArrProps;
}

export const AccordionItem = ({ question }: FaqItemProps) => {
  const [FAQDropdownOpen, setFAQDropdownOpen] = useState(false);
  return (
    <div className="bg-core-white rounded-lg">
      <Collapser
        toggle={
          <div className="flex items-center justify-between cursor-pointer px-4 lg:px-8 py-3">
            <p className="font-bold md:text-2xl">{question.dropdown_header}</p>
            <div className="flex justify-center items-center border-2 rounded-full border-ui-grey-200 w-10 h-10 lg:w-16 lg:h-16">
              <Arrow FAQDropdownOpen={FAQDropdownOpen} />
            </div>
          </div>
        }
        FAQDropdownOpen={FAQDropdownOpen}
        setFAQDropdownOpen={setFAQDropdownOpen}
      >
        <div className="text-container pt-4">
          <div className="flex flex-col gap-4 px-4 lg:px-8 py-3">
            {question.dropdown_content.map((content, index) => (
              <span key={index} className="block lg:text-2xl">
                {content}
              </span>
            ))}
            {question.button_text && question.button_link && (
              <Button
                as="a"
                href={question.button_link}
                variant="outline"
                size={"medium"}
              >
                {question.button_text}
              </Button>
            )}
          </div>
        </div>
      </Collapser>
    </div>
  );
};
