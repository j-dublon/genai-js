import { ColorPill, SimpleNavBar } from "@react-component-library/ui";

import { ReviewYourBasket } from "../ReviewYourBasket";
import Stepper from "../Stepper";
import { headerText, nextStepPillText } from "./StepNavigationWithBasketProps";

export const StepNavigationWithBasket = ({
  step,
  totalSteps = 4,
}: {
  step: number;
  totalSteps?: number;
}) => {
  const text = nextStepPillText[step as keyof typeof nextStepPillText];
  return (
    <>
      <SimpleNavBar>
        <Stepper />
        {step <= totalSteps && (
          <p className="block md:hidden text-xs leading-[1.6] font-normal text-ui-grey-500">
            Step <span className="font-semibold">{step}</span> of{" "}
            <span className="font-semibold">{totalSteps}</span>
          </p>
        )}
        {text && (
          <div className="items-center gap-[2px] md:gap-2 hidden md:flex md:flex-col">
            <p className="text-xxs leading-[1.6] font-normal text-ui-grey-500">
              {headerText}
            </p>
            <ColorPill
              colorPillText={text}
              backgroundColor="secondary-teal"
              size="extraSmall"
              className="px-4 md:w-[240px] justify-center"
            />
          </div>
        )}
      </SimpleNavBar>
      <ReviewYourBasket />
    </>
  );
};
