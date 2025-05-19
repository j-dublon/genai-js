import { FLOW_STEPS } from "./routeGuard";

export const DEFAULT_PAGE_NAMES: Record<string, string> = {
  "/join-flow": "Choose Your Address",
  "/join-flow/package-selection": "Select Package",
  "/join-flow/personal-details": "Personal Details",
  "/join-flow/eero-selection": "Adding your eero(s)",
  "/join-flow/one-touch-switching": "Switching & going live",
  "/join-flow/go-live-date": "Switching & going live",
  "/join-flow/payment-details": "Payment and Join Cuckoo",
  "/join-flow/order-summary": "Order Summary",
};

export const getNextPage = (
  currentStep: number,
): { path: string; name: string } => {
  const nextStepIndex = currentStep + 1;
  const nextStep =
    nextStepIndex < FLOW_STEPS.length
      ? FLOW_STEPS[nextStepIndex]
      : FLOW_STEPS[FLOW_STEPS.length - 1];

  return {
    path: nextStep.path,
    name: DEFAULT_PAGE_NAMES[nextStep.path],
  };
};
