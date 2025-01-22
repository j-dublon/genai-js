import React from "react";

export interface StorybookLogoProps
  extends React.ImgHTMLAttributes<ImageBitmap> {
  altText: string;
  imgSrc: string;
  width: number;
  height: number;
}

export const StorybookLogo: React.FC<StorybookLogoProps> = (
  props: StorybookLogoProps
) => {
  const { altText, imgSrc, width, height } = props;
  return (
    <img
      alt={altText}
      loading="lazy"
      src={imgSrc}
      width={width}
      height={height}
    />
  );
};

StorybookLogo.displayName = "StoryBookLogo";
