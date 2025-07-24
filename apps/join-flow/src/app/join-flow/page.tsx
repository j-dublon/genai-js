"use client";

import { AccessibleLoadingEgg } from "@react-component-library/ui";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { getDefaultAffiliateSession } from "@/services/helpers/affiliate/getDefaultAffiliate";
import { AffiliateSession } from "@/store/useJoinFlowStore";

const JoinFlowPage = () => {
  const searchParams = useSearchParams();
  const awc = searchParams.get("awc");
  const [response, setResponse] = useState<AffiliateSession | null>(null);
  const [documentId, setDocumentId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDefaultAffiliateSession = async () => {
      const defaultAffiliateSessionResponse = await getDefaultAffiliateSession(
        awc || undefined,
      );
      if (defaultAffiliateSessionResponse.type === "success") {
        setResponse(defaultAffiliateSessionResponse.affiliateSession);
        setDocumentId(defaultAffiliateSessionResponse.id);
      }

      setIsLoading(false);
    };

    loadDefaultAffiliateSession();
  }, [awc]);

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
  return <div>Error</div>;
};

export default JoinFlowPage;
