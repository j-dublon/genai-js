import { useState } from "react";
import { Arrow } from "../../../icons/Arrow";
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
  questionColour: string | undefined;
}

export const AccordionItem: React.FC<FaqItemProps> = ({
  question,
  questionColour,
}: FaqItemProps) => {
  const [FAQDropdownOpen, setFAQDropdownOpen] = useState(false);
  return (
    <div className={`bg-${questionColour || "white"} py-4 px-6 rounded-lg `}>
      <Collapser
        toggle={
          <div className="flex items-center justify-between cursor-pointer">
            <p className="font-bold text-2xl">{question.dropdown_header}</p>
            <div className="flex-end border-2 rounded-full border-ui-grey-200">
              <Arrow FAQDropdownOpen={FAQDropdownOpen} />
            </div>
          </div>
        }
        FAQDropdownOpen={FAQDropdownOpen}
        setFAQDropdownOpen={setFAQDropdownOpen}
      >
        <div className="text-container pt-4">
          <div className="flex flex-col gap-4">
            {question.dropdown_content.map((content, index) => (
              <span key={index} className="block text-2xl">
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
