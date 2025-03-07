interface ArticleCardProps {
  imageAlt: string;
  imageUrl: string;
  title: string;
  slug: string;
  primaryTag: string;
}

export const ArticleCard = (props: ArticleCardProps) => {
  const { imageAlt, imageUrl, title, slug, primaryTag } = props;

  return (
    <div className="ds:mr-2 ds:space-y-4 ds:md:mr-6 ds:snap-center ds:max-w-[700px] ds:group ds:cursor-pointer">
      <figure
        className="ds:relative ds:m-0 ds:overflow-hidden ds:bg-transparent ds:rounded-sm"
        role="img"
        aria-label={imageAlt}
      >
        <picture className="ds:block ds:w-full ds:h-full">
          <img
            className="ds:transition-transform ds:duration-500 ds:ease-in-out ds:origin-center ds:scale-100 ds:group-hover:scale-110"
            src={imageUrl}
            alt={imageAlt}
            aria-hidden="false"
          />
        </picture>
      </figure>
      <div className="ds:flex ds:flex-col ds:mt-6 ds:space-y-4">
        <p className="ds:px-3 ds:py-1 ds:font-bold ds:bg-core-pink ds:w-fit ds:rounded-xl">
          {primaryTag}
        </p>
        <a
          href={slug}
          className="ds:text-xl ds:font-semibold ds:md:text-[26px] ds:hover:underline"
        >
          {title}
        </a>
      </div>
    </div>
  );
};
