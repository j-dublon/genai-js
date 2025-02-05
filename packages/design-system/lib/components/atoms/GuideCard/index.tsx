import { Image, Tag } from "../../../types";
import { ColourPill } from "../ColourPill";

interface Props {
  title: string;
  image: Image;
  tags: Tag[];
}

export const GuideCard = ({ title, image, tags }: Props) => {
  return (
    <div className="flex flex-col sm:w-[466px] md:w-[292px] h-[310px]">
      <img src={image.src} className="rounded-md" />
      <div className="flex flex-row mt-2 gap-2">
        {tags.map((t) => (
          <ColourPill
            colourPillText={t.text}
            backgroundColor={t.backgroundColor}
          />
        ))}
      </div>

      <h3 className="mt-2 text-[20px] md:text-[26px] font-bold">{title}</h3>
    </div>
  );
};
