import { type SwitchingDetails } from "@/store/useJoinFlowStore";

export const otsCompleted = (
  switchingDetails: SwitchingDetails | null,
): boolean => {
  return (
    switchingDetails?.otsSwitchStatus !== undefined &&
    switchingDetails?.otsSwitchStatus !== "FIRST_ATTEMPT_FAILED"
  );
};
