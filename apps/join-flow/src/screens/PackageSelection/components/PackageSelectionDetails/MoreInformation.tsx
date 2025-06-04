import { InfoAccordionItem } from "@react-component-library/ui";

import { moreInformationItems } from "./PackageSelectionDetailsProps";

export const MoreInformation = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <h3 className="text-sm md:text-md font-medium">More Information</h3>
      <div className="flex flex-col gap-5">
        {moreInformationItems.map((each) => (
          <InfoAccordionItem
            key={`more-information-${each.question}`}
            question={each.question}
            answer={each.answer}
          />
        ))}
      </div>
    </div>
  );
};
