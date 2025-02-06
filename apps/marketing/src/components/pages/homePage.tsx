import { HeroBanner } from "@/components/organisms/heroBanner";
import { CompanyLogoStripWrapper } from "@/components/molecules/companyLogoStrip";
import { AccordionWrapper } from "@/components/molecules/accordion";
import { FooterWrapper } from "@/components/organisms/Footer";

export const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <CompanyLogoStripWrapper />
      <AccordionWrapper />
      <FooterWrapper />
    </div>
  );
};
