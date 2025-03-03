export interface HeadingProps {
  headingText: string;
}

export const Heading = ({ headingText }: HeadingProps) => {
  return (
    <h1 className="md:text-[64px] text-5xl font-semibold md:pb-5 pb-3">
      {headingText}
    </h1>
  );
};
