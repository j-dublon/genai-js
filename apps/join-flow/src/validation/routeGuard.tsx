"use client";
import useJoinFlowStore, { JoinFlowState } from "@store/useJoinFlowStore";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type FlowStep = {
  path: string;
  field: keyof JoinFlowState | null;
  index: number;
};

const FLOW_STEPS: FlowStep[] = [
  { path: "/join-flow", field: null, index: 0 },
  { path: "/join-flow/personal-details", field: "selectedPackage", index: 1 },
  { path: "/join-flow/eero-selection", field: "personalDetails", index: 2 },
  { path: "/join-flow/one-touch-switching", field: "eeroSelection", index: 3 },
  { path: "/join-flow/go-live-date", field: "switchingDetails", index: 4 },
  { path: "/join-flow/payment-details", field: "goLiveDetails", index: 5 },
  { path: "/join-flow/order-summary", field: "paymentDetails", index: 6 },
];

const findNextRequiredStep = (storeState: JoinFlowState): string => {
  switch (true) {
    case !storeState.selectedPackage:
      return "/join-flow";
    case !storeState.personalDetails ||
      !storeState.personalDetails.personalDetailsCompleted:
      return "/join-flow/personal-details";
    case !storeState.eeroSelection:
      return "/join-flow/eero-selection";
    case !storeState.switchingDetails ||
      storeState.switchingDetails.isWillingToSwitch === undefined:
      return "/join-flow/one-touch-switching";
    case !storeState.goLiveDetails:
      return "/join-flow/go-live-date";
    case !storeState.paymentDetails:
      return "/join-flow/payment-details";
    case storeState.paymentDetails !== null &&
      !storeState.paymentDetails.allTermsAgreed:
      return "/join-flow/payment-details";
    default:
      return "/join-flow/order-summary";
  }
};

const isPathAllowed = (
  path: string | null,
  nextRequiredStep: string,
): boolean => {
  if (path === null) return false;

  const pathIndex = FLOW_STEPS.find((step) => step.path === path)?.index ?? -1;
  const requiredStepIndex =
    FLOW_STEPS.find((step) => step.path === nextRequiredStep)?.index ?? -1;

  if (path === "/join-flow" || pathIndex === -1) return true;

  return pathIndex <= requiredStepIndex;
};

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const store = useJoinFlowStore();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const safetyTimeout = setTimeout(() => {
      if (isMounted) setIsValidating(false);
    }, 3000);

    const validate = async (): Promise<void> => {
      if (!isMounted) return;

      try {
        const nextRequiredStep = findNextRequiredStep(store);
        const allowed = isPathAllowed(pathname, nextRequiredStep);

        if (!allowed) {
          router.replace(nextRequiredStep);
          return;
        }

        if (
          pathname === "/join-flow/payment-details" &&
          store.paymentDetails?.allTermsAgreed
        ) {
          router.replace("/join-flow/order-summary");
          return;
        }

        setIsValidating(false);
      } catch (error) {
        console.log(error);
        if (isMounted) setIsValidating(false);
      } finally {
        clearTimeout(safetyTimeout);
      }
    };

    const validationDelay = setTimeout(validate, 100);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      clearTimeout(validationDelay);
    };
  }, [pathname, router, store]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="spinner animate-spin w-10 h-10 border-4 border-ui-grey-300 border-t-yellow-500 rounded-full"
          role="status"
        ></div>
      </div>
    );
  }

  return children;
};

export default RouteGuard;
