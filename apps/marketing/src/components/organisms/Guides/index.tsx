import {
  GuideCard,
  GuideCardProps,
  SectionHeading,
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
          <SectionHeading headingText={guidesHeading} />
          <p className="pb-6 md:text-[26px] text-md font-normal whitespace-pre-line">
            {guidesSubHeading}
          </p>
        </div>
      </div>

      <Slider
        draggable
        margin="before:ml-5 before:lg:ml-36 before:xl:ml-[calc(((100vw-1152px)/3)+5vw)] before:2xl:ml-[calc(((100vw-1152px)/2.5)+5vw)]"
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
              url={g.url}
              title={g.title}
              onClick={g.onClick}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};
