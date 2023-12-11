import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

import { Box } from "@/components/ui/Box";
import { cn } from "@/utils/ui";

const flexVariants = cva("flex", {
  variants: {
    justify: {
      normal: "justify-normal",
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      evenly: "justify-evenly",
      stretch: "justify-stretch",
    },
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
    },
    wrap: {
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
      nowrap: "flex-nowrap",
    },
    items: {
      baseline: "items-baseline",
      start: "items-start",
      end: "items-end",
      center: "items-center",
      stretch: "items-stretch",
      normal: "items-normal",
    },
    flex: {
      1: "flex-1",
      auto: "flex-auto",
      initial: "flex-initial",
      none: "flex-none",
    },
  },
  defaultVariants: {
    justify: "normal",
    items: "center",
    direction: "row",
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, justify, items, wrap, direction, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn(
        flexVariants({ justify, items, wrap, direction, className }),
      )}
      {...props}
    />
  ),
);
Flex.displayName = "Flex";

export { Flex };
