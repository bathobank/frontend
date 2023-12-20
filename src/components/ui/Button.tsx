import React, { PropsWithChildren } from "react";

import { forwardRefWithAs } from "@/utils/forwardRefWithAs";

const ButtonVarian = {
  danger: "btn-ui-danger",
  default: "btn-ui-default",
  info: "btn-ui-info",
  success: "btn-ui-success",
  warning: "btn-ui-warning",
};

type TProps = PropsWithChildren<{
  className?: string;
  type?: "button" | "submit";
  variant?: keyof typeof ButtonVarian;
  size?: "sm" | "nomal";
}>;

export const Button = forwardRefWithAs<"button", TProps>((props, ref) => {
  const {
    as: Tag = "button",
    children,
    type = "button",
    variant = "default",
    size = "nomal",
    ...rest
  } = props;

  const clsSize = size === "sm" ? "btn-ui-sm" : "";
  rest.className =
    `btn-ui ${ButtonVarian[variant]} ${clsSize} ` + (rest.className ?? "");

  return (
    <Tag ref={ref} type={type} {...rest}>
      {children}
    </Tag>
  );
});

export const DangerButton = forwardRefWithAs<"button", TProps>((props, ref) => {
  return <Button ref={ref} {...props} variant="danger" />;
});

export const DefaultButton = forwardRefWithAs<"button", TProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} variant="default" />;
  },
);

export const InfoButton = forwardRefWithAs<"button", TProps>((props, ref) => {
  return <Button ref={ref} {...props} variant="info" />;
});

export const SuccessButton = forwardRefWithAs<"button", TProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} variant="success" />;
  },
);

export const WarningButton = forwardRefWithAs<"button", TProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} variant="warning" />;
  },
);
