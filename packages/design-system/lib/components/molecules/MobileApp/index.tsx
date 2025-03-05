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
    <div className="lg:py-[50px] lg:px-10 p-6 bg-core-white md:rounded-lg w-full md:max-w-[564px]">
      <h2 className="lg:text-5xl md:text-4xl text-3xl font-semibold">
        {headingText}
      </h2>

      <div className="py-5 flex flex-col md:gap-[16px]">
        {textItems.map((item, index) => (
          <div
            key={`${item.itemText}${index}`}
            className={cx(
              "cursor-pointer",
              `${selectedTextIndex === index ? "font-bold" : ""}`,
            )}
            onClick={() => handleItemClick(index)}
          >
            <TextWithTick key={index} textInput={item.itemText} noPadding />
          </div>
        ))}
      </div>

      <AccountAppButton />
    </div>
  );
};
