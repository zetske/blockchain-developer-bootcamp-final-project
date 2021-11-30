import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface Props {
  src: string;
  fallbackSrc: string;
  // key: string | number;
}

const ImageWithFallback = (props: Props & ImageProps) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
