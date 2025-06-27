"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { getAffiliateSessionByCode } from "@/services/helpers/affiliateSession";

export const useAffiliateSession = () => {
  const pathname = usePathname();
  const { setAffiliateSession } = useJoinFlowStore();

  useEffect(() => {
    const affiliateMatch = pathname.match(/\/a\/([^\/]+)/);
    const affiliateCode = affiliateMatch ? affiliateMatch[1] : "headline";

    const fetchAffiliateSession = async () => {
      try {
        const response = await getAffiliateSessionByCode(affiliateCode);

        if (response && response.affiliateSession) {
          const {
            sessionID,
            affiliateName,
            useCreditcheckResult,
            doEmailValidation,
            cuckooAffiliate,
            termsAndConditionsLink,
            privacyPolicyLink,
          } = response.affiliateSession;

          setAffiliateSession({
            id: response.id || "",
            sessionId: sessionID || "",
            affiliateName: affiliateName || "",
            useCreditcheckResult: useCreditcheckResult || false,
            doEmailValidation: doEmailValidation || false,
            cuckooAffiliate: cuckooAffiliate || "",
            termsAndConditionsLink: termsAndConditionsLink || "",
            privacyPolicyLink: privacyPolicyLink || "",
          });
        } else {
          setAffiliateSession({
            id: "",
            sessionId: affiliateCode,
            affiliateName: "",
            useCreditcheckResult: false,
            doEmailValidation: false,
            cuckooAffiliate: "",
            termsAndConditionsLink: "",
            privacyPolicyLink: "",
          });
        }
      } catch (error) {
        console.error("Error fetching affiliate session:", error);
        setAffiliateSession({
          id: "",
          sessionId: affiliateCode,
          affiliateName: "",
          useCreditcheckResult: false,
          doEmailValidation: false,
          cuckooAffiliate: "",
          termsAndConditionsLink: "",
          privacyPolicyLink: "",
        });
      }
    };

    fetchAffiliateSession();
  }, [pathname, setAffiliateSession]);

  const getAffiliateCode = () => {
    const affiliateMatch = pathname.match(/\/a\/([^\/]+)/);
    return affiliateMatch ? affiliateMatch[1] : "headline";
  };

  return {
    getAffiliateCode,
  };
};
