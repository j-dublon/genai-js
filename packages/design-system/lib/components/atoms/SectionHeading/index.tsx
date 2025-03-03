export interface SectionHeadingProps {
  headingText: string;
}

export const SectionHeading = ({ headingText }: SectionHeadingProps) => {
  return (
    <h2 className="md:text-5xl text-3xl font-bold md:pb-4 pb-3">
      {headingText}
    </h2>
  );
};
