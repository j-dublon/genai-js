import {
  GuideCard,
  GuideCardProps,
  Heading,
  Slider,
} from "@react-component-library/ui";

export interface GuidesProps {
  guides: GuideCardProps[];
  guidesHeading: string;
  guidesSubHeading: string;
}
export const Guides = ({
  guides,
  guidesHeading,
  guidesSubHeading,
}: GuidesProps) => {
  return (
    <section aria-label="Cuckoo Guides" className="h-fit pb-12 lg:pb-40">
      <div className="pt-12 px-5 lg:px-36 lg:pt-40">
        <div className="max-w-[1152px] mx-auto">
          <Heading headingText={guidesHeading} />
          <p className="pb-6 md:text-[26px] text-[16px] font-normal whitespace-pre-line">
            {guidesSubHeading}
          </p>
        </div>
      </div>

      <Slider
        draggable
        margin="xl:before:w-[calc((100vw-1280px)/3)] xl:after:w-16 2xl:before:w-[calc((100vw-1536px)/1.75)]"
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
