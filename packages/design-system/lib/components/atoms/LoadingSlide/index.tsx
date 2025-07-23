export const LoadingSlide = ({
  src,
  message,
  className,
}: {
  src: string;
  message: string;
  className?: string;
}) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={`ds:max-w-md ds:w-full ds:rounded-lg ds:shadow-lg ds:px-8 ds:py-8 ds:bg-secondary-teal ds:text-center ${className}`}
    >
      <div className="ds:grid ds:grid-cols-1 ds:grid-rows-1 ds:overflow-hidden ds:min-h-[200px]">
        <div
          className={`ds:flex ds:flex-col ds:items-center ds:justify-center ds:gap-4 ds:col-start-1 ds:col-end-1 ds:row-start-1 ds:row-end-1 ds:transition-transform ds:duration-500 ds:ease-in-out`}
        >
          <img
            role="presentation"
            className="ds:mx-auto ds:mb-4 ds:w-24 ds:h-24 ds:object-contain"
            height={96}
            width={96}
            src={src}
            loading="eager"
            alt=""
          />
          <p className="ds:text-md ds:font-medium ds:text-core-black">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
