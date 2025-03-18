export interface HeadingProps {
  headingText: string;
}

export const Heading = ({ headingText }: HeadingProps) => {
  return (
    <h1 className="ds:md:text-[64px] ds:text-5xl ds:font-semibold ds:md:pb-5 ds:pb-3 ds:leading-[1.2]">
      {headingText}
    </h1>
  );
};
