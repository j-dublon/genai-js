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
          <div className="ds:flex ds:items-center ds:justify-between ds:cursor-pointer ds:px-4 ds:lg:px-8 ds:py-3">
            <h2 className="ds:font-semibold ds:md:text-[26px] ds:text-left ds:text-core-black">
              {question.dropdown_header}
            </h2>
            <div className="ds:flex ds:justify-center ds:items-center ds:border-2 ds:rounded-full ds:border-ui-grey-200 ds:w-10 ds:h-10 ds:lg:w-16 ds:lg:h-16">
              <ChevronVerticalWithCircle DropdownOpen={FAQDropdownOpen} />
            </div>
          </div>
        }
        FAQDropdownOpen={FAQDropdownOpen}
        setFAQDropdownOpen={setFAQDropdownOpen}
      >
        <div className="ds:text-container ds:pt-1">
          <div className="ds:flex ds:flex-col ds:gap-4 ds:px-4 ds:lg:px-8 ds:py-3">
            {question.dropdown_content.map((content, index) => (
              <span
                key={index}
                className="ds:block ds:text-sm ds:md:text-[26px] ds:text-core-black"
              >
                {content}
              </span>
            ))}
            {question.button_text && question.button_link && (
              <Button
                as="a"
                href={question.button_link}
                variant="outline"
                size="medium"
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
