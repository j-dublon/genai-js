import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { createAffiliateSession } from "@/services/helpers/affiliate/createAffiliateSession";
import { getDefaultAffiliateSession } from "@/services/helpers/affiliate/getDefaultAffiliate";

const AffiliateReferralPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const response = await createAffiliateSession(code);

  if (response.type === "success") {
    return (
      <ChooseYourAddress
        affiliateSession={response.affiliateSession}
        sessionDocumentId={response.id}
      />
    );
  }

  // For now, if something goes awry with the affiliate code, we'll fall back to the default affiliate
  const defaultResponse = await getDefaultAffiliateSession();

  if (defaultResponse.type === "success") {
    // TODO: If the affiliate code did fail but the default affiliate didn't (i.e. the journey can continue), do we need to tell the user? If so, what?
    return (
      <ChooseYourAddress
        affiliateSession={defaultResponse.affiliateSession}
        sessionDocumentId={defaultResponse.id}
      />
    );
  }

  // TODO: If we can't create a session, we need to fallback to the generic error page
  return <div>Affiliate not found</div>;
};

export default AffiliateReferralPage;
