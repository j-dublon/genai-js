import { Heading, TextWithTick, AccountAppButton } from "@lib/index";

export interface MobileAppProps {
  headingText: string;
  textItems: MobileAppTextItemsProps[];
}

type MobileAppTextItemsProps = {
  itemText: string;
};

export const MobileApp = ({ headingText, textItems }: MobileAppProps) => {
  return (
    <div className="md:py-12 md:px-10 p-6 bg-core-white md:rounded-lg md:w-[35%]">
      <div className="md:pr-12">
        <Heading headingText={headingText} />
      </div>

      <div className="py-10 md:flex flex-col gap-[10px] hidden">
        {textItems.map((item, index) => (
          <div key={index} className={index === 0 ? "font-bold" : ""}>
            <TextWithTick
              key={index}
              textInput={item.itemText}
              ariaLabel={`Text item with statement: ${item.itemText}`}
            />
          </div>
        ))}
      </div>

      <div className="md:hidden py-6 flex flex-col gap-4">
        {textItems.map((item, index) => (
          <TextWithTick
            key={index}
            textInput={item.itemText}
            ariaLabel={`Text item with statement: ${item.itemText}`}
          />
        ))}
      </div>

      <AccountAppButton />
    </div>
  );
};
