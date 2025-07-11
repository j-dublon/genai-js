interface ErrorHeadingProps {
  heading: string;
}

export const ErrorHeading = ({ heading }: ErrorHeadingProps) => {
  return (
    <h1 className="text-[26px] leading-[150%] font-semibold md:text-5xl md:leading-[120%]">
      {heading}
    </h1>
  );
};
