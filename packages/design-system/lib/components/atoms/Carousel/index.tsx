interface CarouselProps {
  children: React.ReactNode[];
}

export function Carousel({ children }: CarouselProps) {
  return (
    <div className="flex flex-nowrap h-auto justify-start overflow-x-auto snap-x snap-mandatory scrollbar-none w-full">
      {children}
    </div>
  );
}
