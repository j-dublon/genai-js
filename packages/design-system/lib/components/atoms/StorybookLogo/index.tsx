export interface StorybookLogoProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  altText: string;
  imgSrc: string;
  width: number;
  height: number;
}

export const StorybookLogo: React.FC<StorybookLogoProps> = ({
  altText,
  imgSrc,
  width,
  height,
  ...rest
}) => {
  return (
    <img
      alt={altText}
      src={imgSrc}
      width={width}
      height={height}
      loading="lazy"
      aria-label={`Storybook Logo: ${altText}`}
      {...rest}
    />
  );
};
