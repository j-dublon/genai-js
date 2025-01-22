export interface CompanyLogoProps extends React.ImgHTMLAttributes<ImageBitmap> {
  altText: string;
  width: string;
  height: string;
  imgSrc: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = (
  props: CompanyLogoProps
) => {
  const { altText, width, height, imgSrc } = props;
  return (
    <img
      alt={altText}
      loading="lazy"
      width={width}
      height={height}
      src={imgSrc}
    />
  );
};

CompanyLogo.displayName = "CompanyLogo";
