import * as React from 'react';

import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/utils/ui';
import {Box} from "@/components/ui/Box";

const containerVariants = cva('w-auto', {
  variants: {
    background: {
      base: 'bg-background',
      transparent: 'bg-transparent',
      almost: 'bg-almost',
      black: 'bg-black',
      primary: 'bg-primary',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    background: 'transparent',
  },
});

export interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof containerVariants> {
    fullWidth?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({className, background, fullWidth, ...props}, ref) => (
    <Box
      ref={ref}
      className={cn('m-auto', containerVariants({background, className}), {
        container: !fullWidth,
      })}
      {...props}
    />
  )
);
Container.displayName = 'Container';

export {Container};
