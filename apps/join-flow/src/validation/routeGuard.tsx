"use client";
import { AccessibleLoadingEgg } from "@react-component-library/ui";
import useJoinFlowStore, { JoinFlowState } from "@store/useJoinFlowStore";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { EXPIRY_DURATION } from "@/lib/constants";
import { otsCompleted } from "@/lib/otsCompleted";

const isDev = process.env.NEXT_PUBLIC_IS_DEV || "false";

export type FlowStep = {
  path: string;
  index: number;
};

export const FLOW_STEPS: FlowStep[] = [
  { path: "/join-flow", index: 0 },
  { path: "/join-flow/package-selection", index: 1 },
  {
    path: "/join-flow/personal-details",
    index: 1,
  },
  {
    path: "/join-flow/eero-selection",
    index: 2,
  },
  {
    path: "/join-flow/one-touch-switching",
    index: 3,
  },
  {
    path: "/join-flow/go-live-date",
    index: 4,
  },
  {
    path: "/join-flow/payment-details",
    index: 5,
  },
  {
    path: "/join-flow/order-summary",
    index: 6,
  },
];

const findNextRequiredStep = (storeState: JoinFlowState): string => {
  switch (true) {
    case !storeState.serviceAddress:
      return "/join-flow";
    case !storeState.selectedPackage:
      return "/join-flow/package-selection";
    case !storeState.personalDetails ||
      !storeState.personalDetails.personalDetailsCompleted:
      return "/join-flow/personal-details";
    case !storeState.eeroSelection:
      return "/join-flow/eero-selection";
    case !otsCompleted(storeState.switchingDetails):
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

  if (path === "/join-flow/error") return true;

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

  const {
    serviceAddress,
    selectedPackage,
    personalDetails,
    eeroSelection,
    switchingDetails,
    goLiveDetails,
    paymentDetails,
    timestamp,
    setErrorInfo,
    setTimestamp,
    complete,
  } = store;

  useEffect(() => {
    let isMounted = true;
    const safetyTimeout = setTimeout(() => {
      if (isMounted) setIsValidating(false);
    }, 3000);

    const validate = async (): Promise<void> => {
      if (!isMounted) return;

      try {
        if (pathname === "/join-flow/order-summary" && complete) return;

        const nextRequiredStep = findNextRequiredStep({
          serviceAddress,
          selectedPackage,
          personalDetails,
          eeroSelection,
          switchingDetails,
          goLiveDetails,
          paymentDetails,
        } as JoinFlowState);

        const otsComplete = otsCompleted(switchingDetails);

        const allowed = isPathAllowed(pathname, nextRequiredStep);

        if (!allowed) {
          router.replace(nextRequiredStep);
          return;
        }

        if (pathname === "/join-flow/one-touch-switching" && otsComplete) {
          router.replace("/join-flow/go-live-date");
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
  }, [
    pathname,
    router,
    serviceAddress,
    selectedPackage,
    personalDetails,
    eeroSelection,
    switchingDetails,
    goLiveDetails,
    paymentDetails,
    complete,
  ]);

  useEffect(() => {
    if (!timestamp) {
      setTimestamp(Date.now());
    }
  }, [timestamp, setTimestamp]);

  // Update timestamp when user progresses through the journey
  useEffect(() => {
    if (timestamp && isDev !== "true") {
      // Check if session has expired
      if (Date.now() - timestamp > EXPIRY_DURATION) {
        setErrorInfo({ type: "sessionExpiredError" });
        router.push("/join-flow/error");
        return;
      }

      // Refresh timestamp if user is actively progressing (has completed steps)
      const hasProgress =
        serviceAddress ||
        selectedPackage ||
        personalDetails ||
        eeroSelection ||
        switchingDetails ||
        goLiveDetails ||
        paymentDetails;

      if (hasProgress) {
        setTimestamp(Date.now());
      }
    }
  }, [
    timestamp,
    serviceAddress,
    selectedPackage,
    personalDetails,
    eeroSelection,
    switchingDetails,
    goLiveDetails,
    paymentDetails,
    setErrorInfo,
    setTimestamp,
    router,
  ]);

  if (isValidating) {
    return (
      <AccessibleLoadingEgg
        wrapperClassName="flex items-center justify-center min-h-screen"
        height={200}
      />
    );
  }

  return children;
};

export default RouteGuard;
