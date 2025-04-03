export interface ImageProps extends React.ImgHTMLAttributes<ImageBitmap> {
  altText: string;
  width: string;
  height: string;
  imgSrc: string;
}

export interface ImageMarqueeProps {
  images: ImageProps[];
}

const ImageSet = ({
  images,
  keyPrefix,
}: ImageMarqueeProps & { keyPrefix: "set1" | "set2" }) => {
  const WRAPPER_CLASSES =
    "ds:flex ds:items-center ds:justify-center ds:md:justify-start ds:animate-marquee-slow ds:gap-6 ds:md:gap-[30px] ds:mr-6 ds:md:mr-[30px]";
  const IMAGE_CLASSES =
    "ds:w-[inherit] ds:h-[inherit] ds:max-w-[329px] ds:md:max-w-[485px] ds:max-h-[330px] ds:md:max-h-[495px] ds:rounded-lg";

  return (
    <div
      className={WRAPPER_CLASSES}
      aria-hidden={keyPrefix === "set2"}
      data-testid="image-marquee-set"
    >
      {images.map(({ altText, width, height, imgSrc }: ImageProps) => (
        <div
          key={`${keyPrefix}-${altText}`}
          className="ds:flex ds:items-center"
        >
          <img
            alt={altText}
            loading="lazy"
            width={width}
            height={height}
            src={imgSrc}
            className={IMAGE_CLASSES}
          />
        </div>
      ))}
    </div>
  );
};

export const ImageMarquee = ({ images }: ImageMarqueeProps) => {
  return (
    <div className="ds:w-full ds:inline-flex ds:flex-nowrap ds:overflow-hidden">
      <ImageSet images={images} keyPrefix="set1" />
      <ImageSet images={images} keyPrefix="set2" />
    </div>
  );
};
