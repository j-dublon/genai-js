import { AccountAppButton } from "@components/atoms/AccountAppButton";
import { TextWithTick } from "@components/atoms/TextWithTick";

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
      <h2 className="ds:lg:text-5xl ds:md:text-4xl ds:text-3xl ds:font-semibold ds:leading-[1.2]">
        {headingText}
      </h2>

      <div className="ds:pt-5 ds:pb-8 ds:md:py-10 ds:flex ds:flex-col ds:gap-1 ds:md:gap-4">
        {textItems.map((item, index) => (
          <div
            key={item.itemText}
            className="ds:cursor-pointer"
            onClick={() => handleItemClick(index)}
          >
            <TextWithTick
              textInput={item.itemText}
              iconSize={24}
              padding="none"
              className={
                selectedTextIndex === index
                  ? "ds:!font-semibold ds:md:font-semibold ds:text-core-black"
                  : "ds:!font-normal ds:md:font-normal ds:text-ui-grey-500"
              }
            />
          </div>
        ))}
      </div>

      <AccountAppButton />
    </div>
  );
};
