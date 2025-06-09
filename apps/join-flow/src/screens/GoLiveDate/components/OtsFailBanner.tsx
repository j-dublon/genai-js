import { InsertLink } from "@/components/InsertLink";

export const OtsFailBanner = ({ bannerText }: { bannerText: string }) => {
  return (
    <div className="absolute top-14 lg:top-21 left-0 flex flex-row bg-core-yellow text-core-black p-6 w-[100vw] z-30 justify-center items-center">
      <p className="text-xs lg:text-sm leading-[1.6] font-normal">
        <span className="font-semibold">Important info:</span>{" "}
        {/* TODO: add actual functionality / link here */}
        <InsertLink text={bannerText} searchText="let them know" href="/" />
      </p>
    </div>
  );
};
