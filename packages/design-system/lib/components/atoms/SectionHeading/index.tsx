export interface SectionHeadingProps {
  headingText: string;
}

export const SectionHeading = ({ headingText }: SectionHeadingProps) => {
  return (
    <h2 className="ds:md:text-5xl ds:text-3xl ds:font-bold ds:md:pb-4 ds:pb-3">
      {headingText}
    </h2>
  );
};
