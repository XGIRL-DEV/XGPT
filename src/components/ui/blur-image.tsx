/* eslint-disable @next/next/no-img-element */
export interface BlurImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className: string;
  isBlur?: boolean;
}

export function BlurImage(props: BlurImageProps) {
  const { src, alt, className, isBlur = false, ...rest } = props;

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isBlur ? "blur-xl" : ""}`}
      {...rest}
    />
  );
}
