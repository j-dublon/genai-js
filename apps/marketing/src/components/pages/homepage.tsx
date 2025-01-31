import { HeroBanner } from "@/components/organisms/HeroBanner";
import { CompanyLogoStripWrapper } from "@/components/molecules/CompanyLogoStrip";

export const HomePage: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start p-24">
        <HeroBanner />
        <CompanyLogoStripWrapper />
      </main>
    </div>
  );
};
