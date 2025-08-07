import useJoinFlowStore from "@store/useJoinFlowStore";
import { usePathname } from "next/navigation";
import React from "react";

type Step = {
  id: number;
  label?: string;
};

interface StepperProps {
  showLabels?: boolean;
  steps?: Step[];
}

const defaultSteps = [
  { id: 0, label: "Your info" },
  { id: 1, label: "Choose your routers" },
  { id: 2, label: "Switching & going live" },
  { id: 3, label: "Pay and join Cuckoo" },
];

const pathToStepperIndex = {
  "/join-flow": 0,
  "/join-flow/personal-details": 0,
  "/join-flow/eero-selection": 1,
  "/join-flow/one-touch-switching": 2,
  "/join-flow/go-live-date": 2,
  "/join-flow/payment-details": 3,
  "/join-flow/order-summary": 3,
};

const Stepper = ({ showLabels = true, steps = defaultSteps }: StepperProps) => {
  const pathname = usePathname();
  const { setCurrentStep } = useJoinFlowStore();

  const activeStep =
    pathToStepperIndex[pathname as keyof typeof pathToStepperIndex] || 0;

  return (
    <div className="w-full absolute left-1/2 transform -translate-x-1/2 max-w-[360px] py-4 hidden md:block">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={`relative flex items-center justify-center h-10 w-10 rounded-full border-2 border-core-black
                ${
                  index < activeStep
                    ? "bg-core-yellow text-core-black"
                    : index === activeStep
                      ? "bg-core-yellow text-core-black font-medium"
                      : "bg-core-white text-ui-grey-500"
                } transition-all duration-300 cursor-pointer`}
              onClick={() => {
                setCurrentStep(index + 1);
              }}
            >
              {index < activeStep ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}

              {showLabels && step.label && index === activeStep && (
                <span className="absolute -bottom-10 w-max text-xxs lg:text-xs text-center text-core-black px-2 py-1 rounded-md bg-core-yellow border-2 border-core-black">
                  {step.label}
                </span>
              )}
            </div>

            {index < steps.length - 1 && (
              <div
                className="flex-1 h-0.5
                 bg-core-black
                transition-all duration-300"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
