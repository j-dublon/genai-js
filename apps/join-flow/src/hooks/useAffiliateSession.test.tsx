import { waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";

import { useAffiliateSession } from "./useAffiliateSession";

const mockAffiliateSessionSuccessResponse = {
  affiliateSession: {
    sessionID: "6852b406eb7af90001c66918",
    affiliateName: "default",
    useCreditcheckResult: "true",
    doEmailValidation: "true",
    cuckooAffiliate: "",
    termsAndConditionsLink: "https://cms.cuckoo.co/tacs",
    privacyPolicyLink: "https://cms.cuckoo.co/privacy",
  },
  id: "6852b3b112ee05e9509f3450",
};

const mockGetAffiliateSession = vi.fn();
mockGetAffiliateSession.mockReturnValueOnce(
  mockAffiliateSessionSuccessResponse,
);

const mockSetAffiliateSession = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "",
}));

vi.mock("@/services/helpers/affiliateSession", () => ({
  getAffiliateSessionByCode: (affiliateCode: string = "") =>
    mockGetAffiliateSession(affiliateCode),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: () => ({
    setAffiliateSession: mockSetAffiliateSession,
  }),
}));

// This shouldn't be necessary for testing a hook.
const MockPage = () => {
  useAffiliateSession();

  return <></>;
};

describe("useAffiliateSession", () => {
  it("populates the store with affiliate data if the code matches", async () => {
    render(<MockPage />);

    const {
      sessionID,
      affiliateName,
      useCreditcheckResult,
      doEmailValidation,
      cuckooAffiliate,
      termsAndConditionsLink,
      privacyPolicyLink,
    } = mockAffiliateSessionSuccessResponse.affiliateSession;

    await waitFor(() => {
      expect(mockGetAffiliateSession).toHaveBeenCalledWith("headline");
      expect(mockSetAffiliateSession).toHaveBeenCalledTimes(1);
      expect(mockSetAffiliateSession).toHaveBeenCalledWith({
        id: mockAffiliateSessionSuccessResponse.id,
        sessionId: sessionID,
        affiliateName: affiliateName,
        useCreditcheckResult: useCreditcheckResult,
        doEmailValidation: doEmailValidation,
        cuckooAffiliate: cuckooAffiliate,
        termsAndConditionsLink: termsAndConditionsLink,
        privacyPolicyLink: privacyPolicyLink,
      });
    });
  });
});
