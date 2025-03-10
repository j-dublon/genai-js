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
      className="ds:flex ds:gap-[30px] ds:will-change-transform"
    >
      {images.map((image: ImageProps) => (
        <div key={`${image.altText}`} className="ds:flex ds:items-center">
          <img
            alt={image.altText}
            loading="lazy"
            width={image.width}
            height={image.height}
            src={image.imgSrc}
            className="ds:object-scale-down ds:max-w-[40vw] ds:md:max-w-none ds:rounded-lg"
          />
        </div>
      ))}
    </motion.div>
  );
};
