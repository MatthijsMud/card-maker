import type { FC } from "react";
import NextImage, { ImageLoader, ImageProps, } from "next/image";

const customLoader: ImageLoader = ({ src }) => src;

export const Image: FC<ImageProps> = (props) => {
  return <NextImage
    loader={customLoader}
    {...props}
  />
}