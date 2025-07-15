import { ChooseYourAddress } from "@/screens/ChooseYourAddress";
import { createReferralSession } from "@/services/helpers/affiliate/createReferralSession";

const CustomerReferralPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const response = await createReferralSession(code);

  if (response.type === "success") {
    return (
      <ChooseYourAddress
        affiliateSession={response.affiliateSession}
        sessionDocumentId={response.id}
      />
    );
  }

  // TODO: If we can't create a session, we need to fallback to the generic error page
  return <div>Session error</div>;
};

export default CustomerReferralPage;
