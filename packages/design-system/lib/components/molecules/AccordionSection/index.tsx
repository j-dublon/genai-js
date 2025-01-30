import { spacing } from "../../../tokens/spacing";
import { AccordionItem, QuestionsArrProps } from "../../atoms/Accordion";

interface Props {
  backgroundColour?: string;
  questionColour?: string;
  heading: string;
  text: string;
  questionsArr: QuestionsArrProps[];
  paddingY: keyof typeof spacing;
}

export const AccordionSection: React.FC<Props> = ({
  backgroundColour,
  questionColour,
  text,
  heading,
  questionsArr,
  paddingY,
}: Props) => (
  <div className={`py-${paddingY} bg-${backgroundColour} p-20`}>
    <div className="grid grid-cols-1 md:grid-cols-1 gap-20">
      <div className="flex flex-col max-w-[70%] gap-4">
        <h2 className="font-bold text-[64px]">{heading}</h2>
        <p className="text-[36px]">{text}</p>
      </div>
      <div className="pt-4 md:pt-0">
        <div className="flex flex-col gap-6">
          {questionsArr.map((question, index) => (
            <AccordionItem
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
