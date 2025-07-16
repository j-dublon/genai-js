import { RegisterOfInterestSubmissionsInputs } from "@/services/payloadTypes";
import {
  ExpressionOfInterestFormData,
  NotReadyToJoinFormData,
} from "@/validation/join-flow-schema";

import { ROIOriginJourney } from "./constants";

const ROI_JOURNEY_MAP: Record<string, ROIOriginJourney> = {
  "not-ready-to-join": ROIOriginJourney.SERVICEABLE_ROI,
  "cannot-service-address": ROIOriginJourney.PRE_REG,
  unavailable: ROIOriginJourney.STOP_SELL_ROI,
  "not-shown": ROIOriginJourney.ERROR_ROI,
};

const getIsServiceable = (
  address: RegisterOfInterestSubmissionsInputs["address"],
  source?: string,
) => {
  // if we don't have an address key we can't know if its serviceable
  if (!address[0].addressKey) return null;
  // if they come from not-ready-to-join then its serviceable
  if (source === "not-ready-to-join") return true;
  // if they come from "cannot-service-address" we know there's no products
  if (source === "cannot-service-address") return false;
  // otherwise we don't send it and leave it up to the backend to check (this could happen for "unavailable")
  return undefined;
};

export const formatRoiData = (
  data: ExpressionOfInterestFormData | NotReadyToJoinFormData,
  roiAddressData: RegisterOfInterestSubmissionsInputs["address"],
  source:
    | "not-shown"
    | "cannot-service-address"
    | "unavailable"
    | "not-ready-to-join",
  affiliateName?: string,
): RegisterOfInterestSubmissionsInputs => {
  const roiJourney = ROI_JOURNEY_MAP[source];
  return {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber?.trim() ? data.phoneNumber : undefined,
    endOfContractDate: "selectedDate" in data ? data.selectedDate : undefined,
    address: roiAddressData,
    originJourney: roiJourney,
    affiliateCode: affiliateName,
    isServiceable: getIsServiceable(roiAddressData, source),
  };
};
