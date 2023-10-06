import { twMerge } from "tailwind-merge";

type Props = {
    src: string;
    alt?: string;
    className?: string;
    [index: string]: string|undefined;
};

export const Img = ({src, alt, className, ...props}: Props) => {
  return (
    <picture>
      <img
        src={src}
        alt={alt ?? 'Image'}
        className={twMerge('w-auto h-auto', className ?? '')}
        {...props}
      />
    </picture>
  );
}
