import { AccordionItem, QuestionsArrProps } from "../../atoms/AccordionItem";

interface Props {
  heading: string;
  subText?: string;
  questionsArr: QuestionsArrProps[];
}

export const AccordionSection = ({ heading, questionsArr, subText }: Props) => (
  <div className="bg-core-pink py-12 px-5 md:px-36 md:py-40">
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-16 max-w-[1152px] justify-center items-center mx-auto">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-[26px] sm:text-3xl lg:text-5xl">
          {heading}
        </h2>
        {subText && <p className="text-xl md:text-[26px]">{subText}</p>}
      </div>
      <div>
        <div className="flex flex-col gap-4 md:gap-5">
          {questionsArr.map((question, index) => (
            <AccordionItem key={`faq-question-${index}`} question={question} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
