import { ChevronVerticalWithCircle } from "@icons/ChevronVerticalWithCircle";
import { useState } from "react";

import { Collapser } from "../AccordionItem/collapser";

interface InformationItemProps {
  question: string;
  answer: string[];
}

export const InfoAccordionItem = ({
  question,
  answer,
}: InformationItemProps) => {
  const [InfoDropdownOpen, setInfoDropdownOpen] = useState(false);
  return (
    <div className="ds:bg-core-white ds:rounded-sm ds:border-2 ds:border-ui-grey-300">
      <Collapser
        toggle={
          <div className="ds:flex ds:items-center ds:justify-between ds:cursor-pointer ds:px-4 ds:py-3">
            <h2 className="ds:font-medium ds:text-xs ds:md:text-sm ds:text-left ds:text-core-black">
              {question}
            </h2>
            <div className="ds:flex ds:justify-center ds:items-center ds:rounded-full ds:w-8 ds:h-8">
              <ChevronVerticalWithCircle
                DropdownOpen={InfoDropdownOpen}
                borderColor="#F0F0E9"
                backgroundColor="#F0F0E9"
              />
            </div>
          </div>
        }
        FAQDropdownOpen={InfoDropdownOpen}
        setFAQDropdownOpen={setInfoDropdownOpen}
      >
        <div data-testid="accordion-content" className="ds:text-container">
          <div className="ds:flex ds:flex-col ds:gap-3 ds:px-4 ds:md:px-8 ds:pt-1 ds:pb-6 ds:md:pb-8">
            {answer.map((content, index) => (
              <p
                key={`${index}-${content.split(" ").slice(0, 3).join("-")}...`}
                className="ds:block ds:text-xs ds:md:text-sm ds:text-ui-grey-500"
              >
                {content}
              </p>
            ))}
          </div>
        </div>
      </Collapser>
    </div>
  );
};
