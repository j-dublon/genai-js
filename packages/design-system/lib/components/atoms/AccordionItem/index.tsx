import { ChevronVerticalWithCircle } from "@icons/ChevronVerticalWithCircle";
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
    <div className="ds:bg-core-white ds:rounded-lg">
      <Collapser
        toggle={
          <div className="ds:flex ds:items-center ds:justify-between ds:cursor-pointer ds:px-4 ds:md:px-8 ds:py-3">
            <h2 className="ds:font-semibold ds:md:text-[26px] ds:text-left ds:text-core-black">
              {question.dropdown_header}
            </h2>
            <div className="ds:flex ds:justify-center ds:items-center ds:border-2 ds:rounded-full ds:border-ui-grey-200 ds:w-10 ds:h-10 ds:md:w-16 ds:md:h-16">
              <ChevronVerticalWithCircle DropdownOpen={FAQDropdownOpen} />
            </div>
          </div>
        }
        FAQDropdownOpen={FAQDropdownOpen}
        setFAQDropdownOpen={setFAQDropdownOpen}
      >
        <div className="ds:text-container">
          <div className="ds:flex ds:flex-col ds:gap-6 ds:px-4 ds:md:px-8 ds:pt-3 ds:pb-6 ds:md:pb-8">
            {question.dropdown_content.map((content, index) => (
              <span
                key={index}
                className="ds:block ds:text-md ds:md:text-[26px] ds:text-core-black"
              >
                {content}
              </span>
            ))}
            {question.button_text && question.button_link && (
              <Button
                as="a"
                href={question.button_link}
                variant="outline"
                size="large"
                tint="white"
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
