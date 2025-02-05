import { JSX } from "react";

interface ArticleCardProps {
  imageAlt: string;
  imageUrl: string;
  title: string;
  slug: string;
  primaryTag: string;
}

export const ArticleCard = (props: ArticleCardProps): JSX.Element => {
  const { imageAlt, imageUrl, title, slug, primaryTag } = props;

  return (
    <div className="mr-2 space-y-4 md:mr-6 snap-center max-w-[700px] group cursor-pointer">
      <figure className="relative m-0 overflow-hidden bg-transparent rounded-sm" role="img" aria-label={imageAlt}>
        <picture className="block w-full h-full">
          <img 
            className="transition-transform duration-500 ease-in-out origin-center scale-100 group-hover:scale-110" 
            src={imageUrl} 
            alt={imageAlt}
            aria-hidden="false"
          />
        </picture>
      </figure>
      <div className="flex flex-col mt-6 space-y-4">
        <p className="px-3 py-1 font-bold bg-core-pink w-fit rounded-xl">{primaryTag}</p>
        <a href={slug} className="text-xl font-semibold md:text-[26px] hover:underline">{title}</a>
      </div>
    </div>
  
  )
}
