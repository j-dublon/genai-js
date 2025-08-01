"use client";

import { AccessibleLoadingEgg } from "@react-component-library/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { getDefaultAffiliateSession } from "@/services/helpers/affiliate/getDefaultAffiliate";
import useJoinFlowStore from "@/store/useJoinFlowStore";

const JoinFlowPage = () => {
  const searchParams = useSearchParams();
  const awc = searchParams.get("awc");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setErrorInfo, setAffiliateSession } = useJoinFlowStore();

  useEffect(() => {
    const loadDefaultAffiliateSession = async () => {
      try {
        const defaultAffiliateSessionResponse =
          await getDefaultAffiliateSession(awc || undefined);

        if (defaultAffiliateSessionResponse.type === "success") {
          setAffiliateSession(defaultAffiliateSessionResponse.affiliateSession);
          return;
        }

        const errorType = defaultAffiliateSessionResponse.error.type;

        switch (errorType) {
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

    loadDefaultAffiliateSession();
  }, [awc, router, setErrorInfo, setAffiliateSession]);

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

export default JoinFlowPage;
