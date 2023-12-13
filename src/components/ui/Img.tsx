import { useMemo } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  size?: number | string;
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

  const newSize = useMemo(() => {
    if (!size) {
      return {};
    }
    if (typeof size === "string") {
      return {
        width: size,
        height: size,
      };
    }
    return {
      width: size + "px",
      height: size + "px",
    };
  }, [size]);

  return (
    <picture>
      <img
        src={src}
        alt={alt ?? "Image"}
        className={newClassName}
        style={{ ...newSize }}
        {...props}
      />
    </picture>
  );
};
