import { AccountOverviewPhone } from "@icons/AccountOverviewPhone";
import { BillsOverviewPhone } from "@icons/BillsOverviewPhone";
import { EeroScreenPhone } from "@icons/EeroScreenPhone";
import { PlanDetailsPhone } from "@icons/PlanDetailsPhone";

interface MobilePhoneProps {
  selectedTextIndex: number;
}

export const MobilePhone = ({ selectedTextIndex }: MobilePhoneProps) => {
  const renderComponentBasedOnText = () => {
    switch (selectedTextIndex) {
      case 0:
        return (
          <AccountOverviewPhone
            ariaLabel={"Phone displaying the account overview"}
          />
        );
      case 1:
        return (
          <BillsOverviewPhone ariaLabel="Phone displaying the bills overview" />
        );
      case 2:
        return (
          <PlanDetailsPhone ariaLabel="Phone displaying the plan details" />
        );
      case 3:
        return <EeroScreenPhone ariaLabel="Phone displaying the eero screen" />;
      default:
        return (
          <AccountOverviewPhone ariaLabel="Phone displaying the account overview" />
        );
    }
  };

  return <div>{renderComponentBasedOnText()}</div>;
};
