interface CTAProps {
  children: React.ReactNode;
}

export const CTA = ({ children }: CTAProps) => {
  return (
    <div className="flex justify-center items-center gap-[10px] self-stretch p-4 md:p-2 bg-core-teal">
      {children}
    </div>
  );
};
