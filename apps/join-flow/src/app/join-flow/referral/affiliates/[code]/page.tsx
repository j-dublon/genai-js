"use client";

import { AccessibleLoadingEgg } from "@react-component-library/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { createAffiliateSession } from "@/services/helpers/affiliate/createAffiliateSession";
import useJoinFlowStore from "@/store/useJoinFlowStore";

const AffiliateReferralPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = use(params);
  const searchParams = useSearchParams();
  const awc = searchParams.get("awc");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setErrorInfo, setAffiliateSession } = useJoinFlowStore();

  useEffect(() => {
    const loadAffiliateSession = async () => {
      try {
        const affiliateSessionResponse = await createAffiliateSession(
          code,
          awc,
        );

        if (affiliateSessionResponse.type === "success") {
          setAffiliateSession(affiliateSessionResponse.affiliateSession);
          return;
        }

        const errorType = affiliateSessionResponse.error.type;

        switch (errorType) {
          case "invalidSubdomain":
          case "noAffiliateFound":
          case "expiredAffiliate":
          case "inactiveAffiliate":
            setErrorInfo({
              type: "invalidAffiliateError",
            });
            router.push("/join-flow/error");
            return;
          case "joinSuspended":
            router.push("/join-flow/register-interest/unavailable");
            return;
          case "networkError":

          case "unknownError":
          case "generalError":
          case "validationError":
            setErrorInfo({
              type: errorType,
            });
            router.push("/join-flow/error");
            return;

          default:
            setErrorInfo({
              type: "generalError",
            });
            router.push("/join-flow/error");
            return;
        }
      } catch {
        setErrorInfo({
          type: "unknownError",
        });
        router.push("/join-flow/error");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    loadAffiliateSession();
  }, [code, awc, router, setErrorInfo, setAffiliateSession]);

  if (isLoading) {
    return (
      <AccessibleLoadingEgg
        wrapperClassName="flex items-center justify-center min-h-screen"
        height={200}
      />
    );
  }

  return <ChooseYourAddress />;
};

export default AffiliateReferralPage;
