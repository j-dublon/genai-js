import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { getDefaultAffiliateSession } from "@/services/helpers/affiliate/getDefaultAffiliate";

const JoinFlowPage = async () => {
  const defaultAffiliateSession = await getDefaultAffiliateSession();

  if (defaultAffiliateSession.type === "success") {
    return (
      <ChooseYourAddress
        affiliateSession={defaultAffiliateSession.affiliateSession}
        sessionDocumentId={defaultAffiliateSession.id}
      />
    );
  }

  // TODO: If we can't create a session, we need to fallback to the generic error page
  return <div>Error</div>;
};

export default JoinFlowPage;
