interface SkeletonLineProps {
  width: string;
  height: string;
  className?: string;
}

const SkeletonLine = ({ width, height, className = "" }: SkeletonLineProps) => (
  <div
    className={`${width} ${height} bg-ui-grey-200 rounded animate-shimmer ${className}`}
  />
);

export const ReviewCardSkeleton = () => {
  return (
    <article
      role="article"
      className="flex flex-col bg-core-white w-[290px] md:w-[368px] rounded-sm sm:rounded-md px-4 py-6 h-[340px] md:h-[380px]"
    >
      <div className="md:h-16 h-auto">
        <SkeletonLine width="w-3/4" height="h-10" />
      </div>
      <div className="mt-6 md:mt-12">
        <SkeletonLine width="w-28" height="h-7" />
      </div>
      <div className="mt-6 space-y-3">
        <SkeletonLine width="w-full" height="h-4" />
        <SkeletonLine width="w-full" height="h-4" />
        <SkeletonLine width="w-3/4" height="h-4" />
      </div>
      <div className="mt-4">
        <SkeletonLine width="w-1/3" height="h-4" />
      </div>
    </article>
  );
};
