import { Image, Tag } from "../../../types";
import { ColourPill } from "../ColourPill";

export interface GuideCardProps {
  title: string;
  image: Image;
  tags: Tag[];
  onClick?: () => void;
}

export const GuideCard = ({ title, image, tags, onClick }: GuideCardProps) => {
  const cardProps = onClick
    ? {
        role: "button",
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <div
      className="flex flex-col sm:w-[466px] w-[292px] h-[310px]"
      {...cardProps}
    >
      <div className="relative w-full aspect-video">
        <img
          src={image.src}
          className="rounded-md object-cover"
          draggable={false}
          alt={image.alt}
          loading="lazy"
        />
      </div>
      <div
        className="flex flex-row mt-2 gap-2 pl-0"
        role="list"
        aria-label="Tags"
      >
        {tags.map((t, i) => (
          <div key={`${t.text}${i}`} role="listitem">
            <ColourPill
              colourPillText={t.text}
              backgroundColor={t.backgroundColor}
            />
          </div>
        ))}
      </div>

      <h3 className="mt-2 text-[20px] md:text-[26px] font-bold">{title}</h3>
    </div>
  );
};
