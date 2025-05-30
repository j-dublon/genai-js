import { AccordionItem, QuestionsArrProps } from "../../atoms/AccordionItem";

interface Props {
  heading: string;
  subText?: string;
  questionsArr: QuestionsArrProps[];
}

export const AccordionSection = ({ heading, questionsArr, subText }: Props) => (
  <section
    aria-label="Accordion Section"
    className="ds:bg-secondary-pink ds:py-12 ds:px-mobile ds:sm:px-tablet ds:lg:px-desktop ds:md:py-40"
  >
    <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-1 ds:gap-6 ds:md:gap-16 ds:max-w-[1152px] ds:justify-center ds:items-center ds:mx-auto">
      <div className="ds:flex ds:flex-col ds:gap-4">
        <h2 className="ds:font-semibold ds:text-[26px] ds:sm:text-3xl ds:md:text-5xl ds:text-core-black ds:max-w-[90%] ds:md:max-w-[75%] ds:md:leading-[1.2]">
          {heading}
        </h2>
        {subText && <p className="ds:text-sm ds:md:text-[26px]">{subText}</p>}
      </div>
      <div>
        <div className="ds:flex ds:flex-col ds:gap-4 ds:md:gap-5">
          {questionsArr.map((question) => (
            <AccordionItem
              key={`faq-question-${question.dropdown_header}`}
              question={question}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
