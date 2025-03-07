import { AccordionItem, QuestionsArrProps } from "../../atoms/AccordionItem";

interface Props {
  heading: string;
  subText?: string;
  questionsArr: QuestionsArrProps[];
}

export const AccordionSection = ({ heading, questionsArr, subText }: Props) => (
  <div className="ds:bg-core-pink ds:py-12 ds:px-5 ds:md:px-36 ds:md:py-40">
    <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-1 ds:gap-6 ds:md:gap-16 ds:max-w-[1152px] ds:justify-center ds:items-center ds:mx-auto">
      <div className="ds:flex ds:flex-col ds:gap-4">
        <h2 className="ds:font-semibold ds:text-[26px] ds:sm:text-3xl ds:lg:text-5xl">
          {heading}
        </h2>
        {subText && <p className="ds:text-xl ds:md:text-[26px]">{subText}</p>}
      </div>
      <div>
        <div className="ds:flex ds:flex-col ds:gap-4 ds:md:gap-5">
          {questionsArr.map((question, index) => (
            <AccordionItem key={`faq-question-${index}`} question={question} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
