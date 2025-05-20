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
          setAffiliateSession({
            sessionId: response.affiliateSession.sessionID || "",
            affiliateName: response.affiliateSession.affiliateName || "",
            useCreditcheckResult:
              response.affiliateSession.useCreditcheckResult || false,
            doEmailValidation:
              response.affiliateSession.doEmailValidation || false,
            cuckooAffiliate: response.affiliateSession.cuckooAffiliate || "",
          });
        } else {
          setAffiliateSession({
            sessionId: affiliateCode,
            affiliateName: "",
            useCreditcheckResult: false,
            doEmailValidation: false,
            cuckooAffiliate: "",
          });
        }
      } catch (error) {
        console.error("Error fetching affiliate session:", error);
        setAffiliateSession({
          sessionId: affiliateCode,
          affiliateName: "",
          useCreditcheckResult: false,
          doEmailValidation: false,
          cuckooAffiliate: "",
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
