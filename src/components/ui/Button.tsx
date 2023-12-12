import { PropsWithChildren, useCallback, useMemo } from "react";

import { LoadingIcon } from "@/icons/Loading";

type TVariantClass = "primary" | "light" | "theme" | "light-info" | "info";

type Props = {
  variant?: TVariantClass;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
};

export const Button = ({
  children,
  fullWidth = false,
  disabled = false,
  loading = false,
  variant = "primary",
  type = "button",
  onClick,
  className,
}: PropsWithChildren<Props>) => {
  const defaultClass: string = useMemo(() => {
    if (variant === "primary") return "btn btn-primary";
    if (variant === "light-info") return "btn btn-light-info";
    if (variant === "info") return "btn btn-info";
    return "btn btn-light-primary";
  }, [variant]);

  const btnClick = useCallback(() => {
    if (disabled) return;
    if (onClick) onClick();
  }, [disabled, onClick]);

  return (
    <button
      className={
        defaultClass +
        (className ? ` ${className} ` : "") +
        (fullWidth ? " w-full " : "")
      }
      disabled={disabled || loading}
      onClick={btnClick}
      type={type}
    >
      <div className="d-flex align-items-center justify-content-center">
        {loading && <LoadingIcon size={22} style={{ marginRight: "10px" }} />}
        {children}
      </div>
    </button>
  );
};
