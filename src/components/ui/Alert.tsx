import React, { PropsWithChildren } from "react";

import { forwardRefWithAs } from "@/utils/forwardRefWithAs";

const AlertVarian = {
  danger: "alert-ui-danger",
  info: "alert-ui-info",
  warning: "alert-ui-warning",
};

type TProps = PropsWithChildren<{
  className?: string;
  variant?: keyof typeof AlertVarian;
}>;

export const Alert = forwardRefWithAs<"div", TProps>((props, ref) => {
  const { as: Tag = "div", children, variant = "info", ...rest } = props;

  rest.className = `alert-ui ${AlertVarian[variant]} ` + (rest.className ?? "");

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
});

export const DangerAlert = forwardRefWithAs<"div", TProps>((props, ref) => {
  return <Alert ref={ref} {...props} variant="danger" />;
});

export const InfoAlert = forwardRefWithAs<"div", TProps>((props, ref) => {
  return <Alert ref={ref} {...props} variant="danger" />;
});

export const WarningAlert = forwardRefWithAs<"div", TProps>((props, ref) => {
  return <Alert ref={ref} {...props} variant="warning" />;
});
