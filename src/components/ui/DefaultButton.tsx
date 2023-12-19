import React, { PropsWithChildren } from "react";

import { forwardRefWithAs } from "@/utils/forwardRefWithAs";

export const DefaultButton = forwardRefWithAs<
  "button",
  PropsWithChildren<{ className?: string; type?: "button" | "submit" }>
>((props, ref) => {
  const { as: Tag = "button", children, type = "button", ...rest } = props;

  const btnClass = " btn-ui btn-ui-default ";

  if (!rest.className) {
    rest.className = "";
  }

  rest.className += btnClass;

  return (
    <Tag ref={ref} type={type} {...rest}>
      {children}
    </Tag>
  );
});