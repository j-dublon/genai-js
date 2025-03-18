import { Image, Tag } from "../../../types";
import { ColorPill } from "../ColorPill";

export interface GuideCardProps {
  title: string;
  image: Image;
  url: string;
  tags: Tag[];
  onClick?: () => void;
}

export const GuideCard = ({
  title,
  image,
  url,
  tags,
  onClick,
}: GuideCardProps) => {
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
      className="ds:flex ds:flex-col ds:sm:w-[466px] ds:w-[292px] ds:group"
      {...cardProps}
    >
      <div className="ds:relative ds:w-full ds:aspect-video">
        <div className="ds:rounded-md ds:overflow-hidden">
          <img
            src={image.src}
            className="ds:object-cover ds:transition-transform ds:duration-500 ds:group-hover:scale-105 ds:h-[173px] ds:sm:h-[262px] ds:w-full"
            draggable={false}
            alt={image.alt}
            loading="lazy"
          />
        </div>
      </div>
      <div
        className="ds:flex ds:flex-row ds:pt-6 ds:gap-2 ds:pl-0"
        role="list"
        aria-label="Tags"
      >
        {tags.map((t, i) => (
          <div key={`${t.text}${i}`} role="listitem">
            <ColorPill
              colorPillText={t.text}
              backgroundColor={t.backgroundColor}
              size="small"
            />
          </div>
        ))}
      </div>

      <h2 className="ds:mt-2 ds:text-md ds:md:text-[26px] ds:font-bold">
        <a href={url} className="ds:text-inherit">
          {title}
        </a>
      </h2>
    </div>
  );
};
