interface CTAProps {
  children: React.ReactNode;
}

export const CTA = ({ children }: CTAProps) => {
  return (
    <div className="ds:flex ds:justify-center ds:items-center ds:gap-[10px] ds:self-stretch ds:p-4 ds:md:p-2 ds:bg-core-teal">
      {children}
    </div>
  );
};
