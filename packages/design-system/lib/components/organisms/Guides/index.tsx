import { GuideCard } from "@components/atoms/GuideCard";
import { Slider } from "@components/atoms/Slider";
import { Image, Tag } from "@lib/types";

export interface Guide {
  image: Image;
  tags: Tag[];
  title: string;
}

interface Props {
  guides: Guide[];
}
export const Guides = ({ guides }: Props) => {
  return (
    <Slider>
      {guides.map((g) => (
        <GuideCard
          image={g.image}
          tags={g.tags}
          title={g.title}
          key={g.title}
        />
      ))}
    </Slider>
  );
};
