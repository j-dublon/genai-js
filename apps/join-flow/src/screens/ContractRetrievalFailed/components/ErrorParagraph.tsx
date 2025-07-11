interface ErrorParagraphProps {
  children: React.ReactNode;
}

export const ErrorParagraph = ({ children }: ErrorParagraphProps) => {
  return (
    <p className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]">
      {children}
    </p>
  );
};
