import { InsertFormattedText } from "@react-component-library/ui";

export const OtsFailBanner = ({
  bannerText,
  highlightText,
}: {
  bannerText: string;
  highlightText: string;
}) => {
  return (
    <div className="absolute top-30 md:top-35 lg:top-48 left-0 flex flex-row bg-core-yellow text-core-black p-6 w-[100vw] z-30 justify-center items-center">
      <p className="text-xs lg:text-sm leading-[1.6] font-normal">
        <span className="font-semibold">Important info:</span>{" "}
        <InsertFormattedText
          text={bannerText}
          searchText={highlightText}
          className="font-medium underline"
        />
      </p>
    </div>
  );
};
