import { describe, expect, it } from "vitest";

import { RegisterOfInterestSubmissionsInputs } from "@/services/payloadTypes";
import type {
  ExpressionOfInterestFormData,
  NotReadyToJoinFormData,
} from "@/validation/join-flow-schema";

import { ROIOriginJourney } from "./constants";
import { formatRoiData } from "./formatRoiData";

const roiAddressDataWithFullAddress: RegisterOfInterestSubmissionsInputs["address"] =
  [
    {
      addressKeyType: "URN",
      addressKey: "ADDR123",
      formattedAddress:
        "line1=1+Test+Street&line2=example+line&postcode=AB1+2CD&addressKeyType=URN&addressKey=ADDR123",
      postcode: "AB1 2CD",
      additionalAddressKeys: [],
    },
  ];

const roiAddressPostcodeOnly: RegisterOfInterestSubmissionsInputs["address"] = [
  {
    postcode: "AB1 2CD",
  },
];

describe("formatRoiData", () => {
  it("sets originJourney to SERVICEABLE_ROI if source is 'not-ready-to-join' and addressKey present", () => {
    const data: NotReadyToJoinFormData = {
      fullName: "John Doe",
      email: "john@example.com",
      selectedDate: "2026-12-01",
    };
    const result = formatRoiData(
      data,
      roiAddressDataWithFullAddress,
      "not-ready-to-join",
    );
    expect(result.originJourney).toBe(ROIOriginJourney.SERVICEABLE_ROI);
    expect(result.isServiceable).toBe(true);
  });

  it("sets originJourney to PRE_REG if source is 'cannot-service-address'", () => {
    // they are directed to this page when there is no products offered for their address
    const data: ExpressionOfInterestFormData = {
      fullName: "Jane Doe",
      email: "jane@example.com",
    };
    const result = formatRoiData(
      data,
      roiAddressDataWithFullAddress,
      "cannot-service-address",
    );
    expect(result.originJourney).toBe(ROIOriginJourney.PRE_REG);
    expect(result.isServiceable).toBe(false);
  });

  it("sets originJourney to STOP_SELL_ROI if source is 'unavailable'", () => {
    // this is for when join flow is turned off and user redirected to the "unavailable" page - we don't know if they are serviceable or not; they may or may not have a full address selected
    const data: ExpressionOfInterestFormData = {
      fullName: "Unavailable",
      email: "unavailable@example.com",
    };
    const result = formatRoiData(
      data,
      roiAddressDataWithFullAddress,
      "unavailable",
    );
    expect(result.originJourney).toBe(ROIOriginJourney.STOP_SELL_ROI);
    expect(result.isServiceable).toBeUndefined();
  });

  it("sets originJourney to ERROR_ROI if source is 'not-shown'", () => {
    // this is for when the address finder has not found the user's address - we don't know if they are serviceable or not
    const data: ExpressionOfInterestFormData = {
      fullName: "Not Shown",
      email: "notshown@example.com",
    };
    const result = formatRoiData(data, roiAddressPostcodeOnly, "not-shown");
    expect(result.originJourney).toBe(ROIOriginJourney.ERROR_ROI);
    expect(result.isServiceable).toBeNull();
  });

  it("sets phoneNumber to undefined if empty or only whitespace", () => {
    const data: ExpressionOfInterestFormData = {
      fullName: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: "   ",
    };
    const result = formatRoiData(data, roiAddressPostcodeOnly, "not-shown");
    expect(result.phoneNumber).toBeUndefined();
  });
});
