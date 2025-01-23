import { JSX, useState } from "react";
import { Arrow } from "../../../icons/Arrow";
import Link from "next/link";
import { Button } from "../Button";

interface QuestionsArrProps {
  dropdown_header: string;
  dropdown_content: string[];
  button_text?: string;
  button_link?: string;
}

export const spacing = {
  acorn: "8px",
  leaf: "16px",
  bonsai: "24px",
  fern: "32px",
  shrub: "40px",
  palm: "48px",
  birch: "64px",
  oak: "80px",
  pine: "96px",
  redwood: "160px",
} as const;

interface Props {
  backgroundColour?: string;
  questionColour?: string;
  heading: string;
  text: string;
  questionsArr: QuestionsArrProps[];
  paddingY: keyof typeof spacing;
}

interface FaqItemProps {
  question: QuestionsArrProps;
  questionColour: string | undefined;
}

// Collapser Component
interface CollapserProps {
  close?: React.ReactNode;
  direction?: "up" | "down";
  isOpen?: boolean;
  toggle: React.ReactNode;
  children: React.ReactNode;
  FAQDropdownOpen: boolean;
  setFAQDropdownOpen: (arg0: boolean) => void;
}

export const Collapser = ({
  toggle,
  children,
  close,
  FAQDropdownOpen,
  setFAQDropdownOpen,
}: CollapserProps) => {
  return (
    <>
      <button
        onClick={() => setFAQDropdownOpen(!FAQDropdownOpen)}
        className="bg-transparent border-none cursor-pointer w-full"
        type="button"
      >
        {toggle}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          FAQDropdownOpen
            ? "max-h-[1000px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        {close && (
          <div
            className="cursor-pointer float-right"
            onClick={() => setFAQDropdownOpen(!FAQDropdownOpen)}
          >
            {close}
          </div>
        )}
        {children}
      </div>
    </>
  );
};

const FaqItem = ({ question, questionColour }: FaqItemProps) => {
  const [FAQDropdownOpen, setFAQDropdownOpen] = useState(false);
  return (
    <div className={`bg-${questionColour || "white"} py-4 px-6 rounded-lg `}>
      <Collapser
        toggle={
          <div className="flex items-center justify-between cursor-pointer">
            <p className="font-bold">{question.dropdown_header}</p>
            <div className="flex-end">
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
              <span key={index} className="block text-parrot">
                {content}
              </span>
            ))}
            {question.button_text && question.button_link && (
              <Link href={question.button_link} passHref legacyBehavior>
                <Button>{question.button_text}</Button>
              </Link>
            )}
          </div>
        </div>
      </Collapser>
    </div>
  );
};

export const AccordionSection = ({
  backgroundColour,
  questionColour,
  text,
  heading,
  questionsArr,
  paddingY,
}: Props): JSX.Element => (
  <div className={`py-${paddingY} bg-${backgroundColour} p-6`}>
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">{heading}</h2>
        <p className="text-lg">{text}</p>
      </div>
      <div className="pt-4 md:pt-0">
        <div className="flex flex-col gap-6">
          {questionsArr.map((question, index) => (
            <FaqItem
              questionColour={questionColour}
              key={`faq-question-${index}`}
              question={question}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
