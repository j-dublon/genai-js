import { GuideCard, GuideCardProps } from "@components/atoms/GuideCard";
import { Slider } from "@components/atoms/Slider";
import useIsDesktopScreen from "@lib/hooks/isDesktop";

interface Props {
  guides: GuideCardProps[];
}
export const Guides = ({ guides }: Props) => {
  const isDesktop = useIsDesktopScreen();
  return (
    <section aria-label="Guides">
      <Slider
        draggable
        showScrollbar={isDesktop}
        aria-roledescription="carousel"
      >
        {guides.map((g, i) => (
          <div
            key={`${g.title}${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${guides.length}`}
          >
            <GuideCard
              image={g.image}
              tags={g.tags}
              title={g.title}
              onClick={g.onClick}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};
