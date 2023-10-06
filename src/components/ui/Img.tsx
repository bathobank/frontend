import { twMerge } from "tailwind-merge";

type Props = {
    src: string;
    alt?: string;
    className?: string;
    size?: number;
    circle?: boolean;
    [index: string]: boolean|number|string|undefined;
};

export const Img = ({src, alt, size, circle, className, ...props}: Props) => {
  return (
    <picture>
      <img
        src={src}
        alt={alt ?? 'Image'}
        className={twMerge(
          'w-auto h-auto',
          size ? `w-[${size}px] h-[${size}px]` : '',
          circle ? 'rounded-[50%]' : '',
          className ?? ''
        )}
        {...props}
      />
    </picture>
  );
}
