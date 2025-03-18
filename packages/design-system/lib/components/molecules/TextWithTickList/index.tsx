import {
  TextWithTick,
  TextWithTickProps,
} from "@components/atoms/TextWithTick";

export interface TextWithTickListProps {
  textItems: TextWithTickProps[];
}

export const TextWithTickList = ({ textItems }: TextWithTickListProps) =>
  textItems.map((each) => {
    return <TextWithTick key={each.textInput} {...each} />;
  });
