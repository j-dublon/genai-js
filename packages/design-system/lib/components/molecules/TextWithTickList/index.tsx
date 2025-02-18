import {
  TextWithTick,
  TextWithTickProps,
} from "@components/atoms/TextWithTick";

export interface TextWithTickListProps {
  TextWithTickList: TextWithTickProps[];
}

export const TextWithTickList = ({ TextWithTickList }: TextWithTickListProps) =>
  TextWithTickList.map((TextWithTickItem) => {
    return (
      <TextWithTick key={TextWithTickItem.textInput} {...TextWithTickItem} />
    );
  });
