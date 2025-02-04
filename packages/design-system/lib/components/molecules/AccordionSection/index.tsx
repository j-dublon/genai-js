import { AccordionItem, QuestionsArrProps } from "../../atoms/Accordion";

interface Props {
  heading: string;
  questionsArr: QuestionsArrProps[];
}

export const AccordionSection: React.FC<Props> = ({
  heading,
  questionsArr,
}: Props) => (
  <div className="bg-core-pink px-36 py-40">
    <div className="grid grid-cols-1 md:grid-cols-1 gap-16">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-5xl">{heading}</h2>
      </div>
      <div className="pt-4 md:pt-0">
        <div className="flex flex-col gap-5">
          {questionsArr.map((question, index) => (
            <AccordionItem key={`faq-question-${index}`} question={question} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
