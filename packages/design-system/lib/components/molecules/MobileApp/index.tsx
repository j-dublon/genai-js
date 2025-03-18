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
    <div className="ds:lg:py-[50px] ds:sm:px-tablet ds:md:px-5 ds:lg:px-10 ds:p-6 ds:pb-10 ds:bg-core-white ds:md:rounded-lg ds:w-full ds:md:max-w-[564px] ">
      <h2 className="ds:lg:text-5xl ds:md:text-4xl ds:text-3xl ds:font-semibold">
        {headingText}
      </h2>

      <div className="ds:pt-5 ds:pb-8 ds:md:py-10 ds:flex ds:flex-col ds:gap-1 ds:md:gap-4">
        {textItems.map((item, index) => (
          <div
            key={item.itemText}
            className={cx(
              "ds:cursor-pointer",
              selectedTextIndex === index
                ? "ds:font-bold ds:text-core-black"
                : "ds:text-ui-grey-500",
            )}
            onClick={() => handleItemClick(index)}
          >
            <TextWithTick
              key={index}
              textInput={item.itemText}
              iconSize={24}
              padding="none"
            />
          </div>
        ))}
      </div>

      <AccountAppButton />
    </div>
  );
};
