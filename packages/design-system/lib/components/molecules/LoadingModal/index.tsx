import { useEffect, useRef, useState } from "react";

export interface Slide {
  src: string;
  message: string;
}

export interface LoadingModalProps {
  className?: string;
  slidesClassName?: string;
  slides: Slide[];
  modalRef?: React.RefObject<HTMLDialogElement | null>;
  loading?: boolean;
}

export const LoadingModal = ({
  slides,
  className = "",
  slidesClassName = "",
  modalRef,
  loading = false,
}: LoadingModalProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const prevLoadingRef = useRef<boolean>(false);

  // Only reset currentSlide when loading transitions from false to true
  useEffect(() => {
    if (loading && !prevLoadingRef.current) {
      setCurrentSlide(0);
    }
    prevLoadingRef.current = loading;
  }, [loading]);

  // Only advance slides when loading is true
  useEffect(() => {
    if (!loading) return;
    const next = currentSlide + 1;
    const last = slides.length - 1;
    const interval =
      next <= last
        ? setTimeout(() => {
            setCurrentSlide(next);
          }, 3000)
        : null;
    return () => {
      if (interval) clearTimeout(interval);
    };
  }, [currentSlide, slides.length, loading]);

  return (
    <dialog
      ref={modalRef}
      className="ds:rounded-lg ds:fixed ds:inset-0 ds:z-50 ds:justify-self-center ds:self-center ds:[&::backdrop]:bg-core-black ds:[&::backdrop]:opacity-40 ds:[&::backdrop]:backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <div
        className={`ds:max-w-md ds:w-full ds:rounded-lg ds:shadow-lg ds:px-8 ds:py-8 ds:bg-secondary-teal ds:text-center ${className}`}
      >
        <div className="ds:grid ds:grid-cols-1 ds:grid-rows-1 ds:overflow-hidden ds:min-h-[200px]">
          {slides.map(({ message, src }, index) => (
            <div
              className={`ds:flex ds:flex-col ds:items-center ds:justify-center ds:gap-4 ds:col-start-1 ds:col-end-1 ds:row-start-1 ds:row-end-1 ds:transition-transform ds:duration-500 ds:ease-in-out ${
                index > currentSlide
                  ? "ds:translate-x-full ds:opacity-0"
                  : index === currentSlide
                    ? "ds:translate-x-0 ds:opacity-100"
                    : "ds:-translate-x-full ds:opacity-0"
              } ${slidesClassName}`}
              key={`${src}-slide-${index}`}
              aria-hidden={index !== currentSlide}
              aria-live={index === currentSlide ? "polite" : undefined}
            >
              <img
                role="presentation"
                className="ds:mx-auto ds:mb-4 ds:w-24 ds:h-24 ds:object-contain"
                height={96}
                width={96}
                src={src}
                loading="eager"
              />
              <p className="ds:text-md ds:font-medium ds:text-core-black">
                {message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};
