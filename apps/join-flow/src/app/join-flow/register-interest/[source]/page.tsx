import { notFound } from "next/navigation";

import { RegisterOfInterest } from "@/screens/RegisterOfInterest";

const validSources = [
  "not-shown",
  "cannot-service-address",
  "unavailable",
] as const;
type ValidSource = (typeof validSources)[number];

interface RegisterInterestPageProps {
  params: Promise<{
    source: string;
  }>;
}

const RegisterInterestPage = async ({ params }: RegisterInterestPageProps) => {
  const { source } = await params;

  if (!validSources.includes(source as ValidSource)) {
    notFound();
  }

  return <RegisterOfInterest source={source as ValidSource} />;
};

export default RegisterInterestPage;
