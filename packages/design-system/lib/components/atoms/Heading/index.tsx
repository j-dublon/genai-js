export interface HeadingProps {
  headingText: string;
}

export const Heading: React.FC<HeadingProps> = ({
  headingText,
}: HeadingProps) => {
  return <h2 className="md:text-5xl text-4xl font-bold pb-5">{headingText}</h2>;
};

Heading.displayName = "Heading";
