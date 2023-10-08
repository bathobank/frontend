import {cn} from "@/utils/ui";
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
        className={cn(
          size ? '' : 'w-auto h-auto',
          size ? `max-w-full max-h-full` : '',
          circle ? 'rounded-[50%]' : '',
          className ?? ''
        )}
        style={{ width: size ? (size + 'px') : undefined, height: size ? (size + 'px') : undefined }}
        {...props}
      />
    </picture>
  );
}
