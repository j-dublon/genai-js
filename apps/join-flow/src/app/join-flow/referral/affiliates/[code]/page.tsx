"use client";

import { AccessibleLoadingEgg } from "@react-component-library/ui";
import { use, useEffect, useState } from "react";

import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { createAffiliateSession } from "@/services/helpers/affiliate/createAffiliateSession";
import { getDefaultAffiliateSession } from "@/services/helpers/affiliate/getDefaultAffiliate";
import { AffiliateSession } from "@/store/useJoinFlowStore";

const AffiliateReferralPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = use(params);
  const [response, setResponse] = useState<AffiliateSession | null>(null);
  const [documentId, setDocumentId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAffiliateSession = async () => {
      const affiliateSessionResponse = await createAffiliateSession(code);

      if (affiliateSessionResponse.type === "success") {
        setResponse(affiliateSessionResponse.affiliateSession);
        setDocumentId(affiliateSessionResponse.id);
      } else {
        // For now, if something goes awry with the affiliate code, we'll fall back to the default affiliate
        const defaultResponse = await getDefaultAffiliateSession();
        if (defaultResponse.type === "success") {
          // TODO: If the affiliate code did fail but the default affiliate didn't (i.e. the journey can continue), do we need to tell the user? If so, what?
          setResponse(defaultResponse.affiliateSession);
          setDocumentId(defaultResponse.id);
        }
      }

      setIsLoading(false);
    };

    loadAffiliateSession();
  }, [code]);

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
  return <div>Affiliate not found</div>;
};

export default AffiliateReferralPage;
