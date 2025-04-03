import { AccountOverviewPhone } from "@icons/AccountOverviewPhone";
import { BillsOverviewPhone } from "@icons/BillsOverviewPhone";
import { EeroScreenPhone } from "@icons/EeroScreenPhone";
import { PhoneFrame } from "@icons/PhoneFrame";
import { PlanDetailsPhone } from "@icons/PlanDetailsPhone";
import { AnimatePresence, motion } from "framer-motion";

export const MobilePhone = ({
  selectedTextIndex,
}: {
  selectedTextIndex: number;
}) => {
  let screenLabel: string;
  let MobileScreen: React.ComponentType;

  switch (selectedTextIndex) {
    case 0:
      screenLabel = "Phone displaying the account overview";
      MobileScreen = AccountOverviewPhone;
      break;
    case 1:
      screenLabel = "Phone displaying the bills overview";
      MobileScreen = BillsOverviewPhone;
      break;
    case 2:
      screenLabel = "Phone displaying the plan details";
      MobileScreen = PlanDetailsPhone;
      break;
    case 3:
      screenLabel = "Phone displaying the eero screen";
      MobileScreen = EeroScreenPhone;
      break;
    default:
      screenLabel = "Phone displaying the account overview";
      MobileScreen = AccountOverviewPhone;
  }

  return (
    <div className="relative" role="none" data-testid="mobile-screen">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedTextIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 left-0"
          data-testid={screenLabel}
        >
          <MobileScreen />
        </motion.div>
      </AnimatePresence>
      <PhoneFrame />
    </div>
  );
};
