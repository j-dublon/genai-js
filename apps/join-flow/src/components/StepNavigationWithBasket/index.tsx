import { ColorPill, SimpleNavBar } from "@react-component-library/ui";
import { useEffect, useRef, useState } from "react";

import { AffiliateHeaderBanner } from "@/components/AffiliateHeaderBanner";
import Stepper from "@/components/Stepper";

import { BasketDialog } from "./components/BasketDialog";
import { SummaryBar } from "./components/SummaryBar";
import {
  headerText,
  nextStepPillText,
  reviewYourBasketContent,
} from "./StepNavigationWithBasketProps";

export const StepNavigationWithBasket = ({
  step,
  totalSteps = 4,
  hideBasket,
  hideLabels,
}: {
  step: number;
  totalSteps?: number;
  hideBasket?: boolean;
  hideLabels?: boolean;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const stickyRef = useRef<HTMLDivElement>(null);
  const text = nextStepPillText[step as keyof typeof nextStepPillText];

  useEffect(() => {
    const updateHeight = () => {
      if (stickyRef.current) {
        setStickyHeight(stickyRef.current.offsetHeight);
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    const resizeObserver = new ResizeObserver(updateHeight);
    if (stickyRef.current) {
      resizeObserver.observe(stickyRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      resizeObserver.disconnect();
    };
  }, [hideBasket, hideLabels, step, totalSteps]);

  return (
    <>
      <div ref={stickyRef} className="sticky top-0 z-50">
        <AffiliateHeaderBanner />
        <SimpleNavBar>
          <Stepper showLabels={!hideLabels && !isDialogOpen} />
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
        {!hideBasket && (
          <SummaryBar
            openDialog={() => setIsDialogOpen(true)}
            isDialogOpen={isDialogOpen}
          />
        )}
      </div>
      <BasketDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        eeroProductContent={reviewYourBasketContent.eeroProducts}
        stickyHeight={stickyHeight}
      />
    </>
  );
};
