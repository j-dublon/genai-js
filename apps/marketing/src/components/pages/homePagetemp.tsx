import { HeroBanner } from "@/components/organisms/heroBannertemp";
import { CompanyLogoStripWrapper } from "@/components/molecules/companyLogoStriptemp";
import { AccordionWrapper } from "@/components/molecules/accordion";

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <CompanyLogoStripWrapper />
      <AccordionWrapper />
    </div>
  );
};
