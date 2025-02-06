import { HeroBanner } from "@/components/organisms/heroBanner";
import { CompanyLogoStripWrapper } from "@/components/molecules/companyLogoStrip";
import { AccordionWrapper } from "@/components/molecules/accordion";

export const HomePage = () => {
  return (
    <div className="blur-xs">
      <HeroBanner />
      <CompanyLogoStripWrapper />
      <AccordionWrapper />
    </div>
  );
};
