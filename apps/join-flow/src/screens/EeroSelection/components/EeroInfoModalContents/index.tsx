import { getAssetPath } from "@/lib/get-asset-path";

export const EeroInfoModalContents = ({
  subtitle,
  content,
  image,
}: {
  subtitle: string;
  content: string[];
  image?: string;
}) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row mt-4 mb-6 lg:mb-8 gap-6">
      <div className="flex flex-col gap-2 lg:gap-4 self-center">
        <h3
          id="modal-subtitle"
          className="text-xs md:text-xxs font-semibold leading-[1.6]"
        >
          {subtitle}
        </h3>
        <div
          id="modal-content"
          className="leading-[1.6] text-xs md:text-xxs flex flex-col gap-2 lg:gap-4"
        >
          {content.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
      {image && (
        <img
          data-testid="modal-image"
          src={getAssetPath(image)}
          className="w-64 m-auto"
          alt=""
          role="presentation"
        />
      )}
    </div>
  );
};
