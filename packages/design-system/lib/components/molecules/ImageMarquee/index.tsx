import { motion } from "framer-motion";
import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<ImageBitmap> {
  altText: string;
  width: string;
  height: string;
  imgSrc: string;
}

export interface ImageMarqueeProps {
  images: ImageProps[];
}

export const ImageMarquee = ({ images }: ImageMarqueeProps) => {
  return (
    <motion.div
      transition={{
        duration: 50,
        ease: "linear",
        repeat: Infinity,
      }}
      initial={{ translateX: 0 }}
      animate={{ translateX: "-50%" }}
      className="flex gap-[30px] will-change-transform"
    >
      {images.map((image: ImageProps, index: number) => (
        <div key={`${image.altText}${index}`} className="flex">
          <img
            alt={image.altText}
            loading="lazy"
            width={image.width}
            height={image.height}
            src={image.imgSrc}
            className="object-scale-down md:max-w-none max-w-[40vw]"
          />
        </div>
      ))}
    </motion.div>
  );
};
