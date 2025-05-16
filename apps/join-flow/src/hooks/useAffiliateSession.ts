"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { getAffiliateSessionByCode } from "@/services/helpers/affiliateSession";

import { AffiliateSession } from "../../payload-types";

export interface ExtendedAffiliateSessionResponse {
  doc: AffiliateSession;
  message: string;
}

export const useAffiliateSession = () => {
  const pathname = usePathname();
  const { setAffiliateSession } = useJoinFlowStore();

  useEffect(() => {
    const affiliateMatch = pathname.match(/\/a\/([^\/]+)/);
    const affiliateCode = affiliateMatch ? affiliateMatch[1] : "headline";

    const fetchAffiliateSession = async () => {
      try {
        const response = (await getAffiliateSessionByCode(
          affiliateCode,
        )) as ExtendedAffiliateSessionResponse;

        if (
          response &&
          response.doc &&
          response.doc.outputs &&
          response.doc.outputs.apiSuccess
        ) {
          const apiSuccess = response.doc.outputs.apiSuccess;

          setAffiliateSession({
            sessionId: apiSuccess.sessionID || "",
            affiliateName: apiSuccess.affiliateName || "",
            useCreditcheckResult: apiSuccess.useCreditcheckResult || false,
            doEmailValidation: apiSuccess.doEmailValidation || false,
            cuckooAffiliate: apiSuccess.cuckooAffiliate || "",
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
