import { TipCard } from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";

export const EeroHelpModalContents = ({
  subtitle,
  content,
  tipCardText,
}: {
  subtitle: string;
  content: { subtitle: string; description: string }[];
  tipCardText?: string;
}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row mt-4 mb-6 md:mb-8 gap-6">
      <div className="flex flex-col gap-2 md:gap-4 self-center">
        <h3 id="modal-subtitle" className="text-xs md:text-sm leading-[1.6]">
          {subtitle}
        </h3>
        <div
          id="modal-content"
          className="leading-[1.6] text-xs md:text-sm flex flex-col gap-3 md:gap-4"
        >
          {content.map((item) => (
            <p key={item.subtitle}>
              <span className="font-semibold">{item.subtitle}</span>{" "}
              {item.description}
            </p>
          ))}
          {tipCardText && (
            <TipCard
              backgroundColor="green"
              image={getAssetPath("/images/eero-download.svg")}
              hideImageOnMobile
              className="mt-3 md:mt-2"
            >
              {tipCardText}
            </TipCard>
          )}
        </div>
      </div>
    </div>
  );
};
