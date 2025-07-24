"use client";

import { AccessibleLoadingEgg } from "@react-component-library/ui";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { createReferralSession } from "@/services/helpers/affiliate/createReferralSession";
import { AffiliateSession } from "@/store/useJoinFlowStore";

const CustomerReferralPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = use(params);
  const searchParams = useSearchParams();
  const awc = searchParams.get("awc");
  const [response, setResponse] = useState<AffiliateSession | null>(null);
  const [documentId, setDocumentId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReferralSession = async () => {
      const referralSessionResponse = await createReferralSession(
        code,
        awc || undefined,
      );

      if (referralSessionResponse.type === "success") {
        setResponse(referralSessionResponse.affiliateSession);
        setDocumentId(referralSessionResponse.id);
      }
      setIsLoading(false);
    };

    loadReferralSession();
  }, [code, awc]);

  if (isLoading) {
    return (
      <AccessibleLoadingEgg
        wrapperClassName="flex items-center justify-center min-h-screen"
        height={200}
      />
    );
  }

  if (response) {
    return (
      <ChooseYourAddress
        affiliateSession={response}
        sessionDocumentId={documentId}
      />
    );
  }

  // TODO: If we can't create a session, we need to fallback to the generic error page
  return <div>Session error</div>;
};

export default CustomerReferralPage;
