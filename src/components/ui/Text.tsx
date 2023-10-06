import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/ui';

const textVariants = cva('m-0 not-italic tracking-normal leading-none', {
  variants: {
    size: {
      lg: 'text-lg',
      base: 'text-base', // P2 Small Text Body
      md: 'text-xl', // P1 Medium Text Body
      sm: 'text-sm',
      xs: 'text-xs',
    },
    col: {
      red: 'text-[red]',
      white: 'text-white',
      primary: 'text-primary',
      black: 'text-black',
      none: '',
    },
    weight: {
      bold: 'font-bold',
      semibold: 'font-semibold',
      medium: 'font-medium',
      normal: 'font-normal',
      light: 'font-light',
    },
    align: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'base',
    col: 'black',
    weight: 'light',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'small' | 'b' | 'strong' | 'i' | 'em';
}

const Text = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, weight, col, align, as = 'p', children, ...props }, ref) => {
    const Comp = as;

    return (
      <Comp
        className={cn(textVariants({ size, weight, col, align, className }), 'mobile:text-base')}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Text.displayName = 'Text';

export { Text, textVariants };
