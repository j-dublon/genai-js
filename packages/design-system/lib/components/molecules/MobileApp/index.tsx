import { AccountAppButton } from "@components/atoms/AccountAppButton";
import { TextWithTick } from "@components/atoms/TextWithTick";
import cx from "classnames";

export interface MobileAppProps {
  headingText: string;
  textItems: MobileAppTextItemsProps[];
  selectedTextIndex: number;
  setSelectedTextIndex: (index: number) => void;
}

type MobileAppTextItemsProps = {
  itemText: string;
};

export const MobileApp = ({
  headingText,
  textItems,
  selectedTextIndex,
  setSelectedTextIndex,
}: MobileAppProps) => {
  const handleItemClick = (index: number) => {
    setSelectedTextIndex(index);
  };

  return (
    <div className="md:py-[50px] md:px-10 p-6 bg-core-white md:rounded-lg w-full">
      <h2 className="md:text-5xl text-3xl font-semibold">{headingText}</h2>

      <div className="py-10 flex flex-col gap-[10px]">
        {textItems.map((item, index) => (
          <div
            key={`${item.itemText}${index}`}
            className={cx(
              "cursor-pointer",
              `${selectedTextIndex === index ? "font-bold" : ""}`,
            )}
            onClick={() => handleItemClick(index)}
          >
            <TextWithTick key={index} textInput={item.itemText} />
          </div>
        ))}
      </div>

      <AccountAppButton />
    </div>
  );
};
