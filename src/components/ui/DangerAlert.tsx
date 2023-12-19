import React, { PropsWithChildren } from "react";

import { forwardRefWithAs } from "@/utils/forwardRefWithAs";

export const DangerAlert = forwardRefWithAs<
  "div",
  PropsWithChildren<{ className?: string }>
>((props, ref) => {
  const { as: Tag = "div", children, ...rest } = props;

  const alertClass = " alert-ui alert-ui-danger ";

  if (!rest.className) {
    rest.className = "";
  }

  rest.className += alertClass;

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
});
