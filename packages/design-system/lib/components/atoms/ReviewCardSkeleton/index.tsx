interface SkeletonLineProps {
  width: string;
  height: string;
}

const SkeletonLine = ({ width, height }: SkeletonLineProps) => (
  <div
    className={`${width} ${height} ds:bg-ui-grey-200 ds:rounded ds:animate-shimmer`}
  />
);

export const ReviewCardSkeleton = () => {
  return (
    <article
      role="article"
      className="ds:flex ds:flex-col ds:bg-core-white ds:w-[290px] ds:md:w-[368px] ds:rounded-sm ds:sm:rounded-md ds:px-4 ds:py-6 ds:h-[340px] ds:md:h-[380px]"
    >
      <div className="ds:md:h-16 ds:h-auto">
        <SkeletonLine width="ds:w-3/4" height="ds:h-10" />
      </div>
      <div className="ds:mt-6 ds:md:mt-12">
        <SkeletonLine width="ds:w-28" height="ds:h-7" />
      </div>
      <div className="ds:mt-6 ds:space-y-3">
        <SkeletonLine width="ds:w-full" height="ds:h-4" />
        <SkeletonLine width="ds:w-full" height="ds:h-4" />
        <SkeletonLine width="ds:w-3/4" height="ds:h-4" />
      </div>
      <div className="ds:mt-4">
        <SkeletonLine width="ds:w-1/3" height="ds:h-4" />
      </div>
    </article>
  );
};
