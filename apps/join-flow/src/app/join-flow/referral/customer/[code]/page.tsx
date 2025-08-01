"use client";

import { AccessibleLoadingEgg } from "@react-component-library/ui";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { createReferralSession } from "@/services/helpers/affiliate/createReferralSession";
import useJoinFlowStore from "@/store/useJoinFlowStore";

const CustomerReferralPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = use(params);
  const searchParams = useSearchParams();
  const awc = searchParams.get("awc");
  const [isLoading, setIsLoading] = useState(true);
  const { setAffiliateSession } = useJoinFlowStore();

  useEffect(() => {
    const loadReferralSession = async () => {
      const referralSessionResponse = await createReferralSession(
        code,
        awc || undefined,
      );

      if (referralSessionResponse.type === "success") {
        setAffiliateSession(referralSessionResponse.affiliateSession);
      }
      setIsLoading(false);
    };

    loadReferralSession();
  }, [code, awc, setAffiliateSession]);

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

export default CustomerReferralPage;
