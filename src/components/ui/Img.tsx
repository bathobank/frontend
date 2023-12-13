import { useMemo } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  size?: number;
  circle?: boolean;
  [index: string]: boolean | number | string | undefined;
};

export const Img = ({ src, alt, size, circle, className, ...props }: Props) => {
  const newClassName = useMemo(() => {
    let cls = "";
    if (size) {
      cls += " mw-100 mh-100 ";
    } else {
      cls += " w-auto h-auto ";
    }
    if (circle) {
      cls += " rounded ";
    }
    return cls + className;
  }, [circle, className, size]);

  return (
    <picture>
      <img
        src={src}
        alt={alt ?? "Image"}
        className={newClassName}
        style={{
          width: size ? size + "px" : undefined,
          height: size ? size + "px" : undefined,
        }}
        {...props}
      />
    </picture>
  );
};
