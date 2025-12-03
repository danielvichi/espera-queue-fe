import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '~/utils/cn';
import AnimatedLoadingIcon from '../_modules/create-client-form/animated-loading-icon';

const buttonVariants = cva(
  'inline-flex gap-2  justify-center items-center  border  hover:bg-gray-300 hover:cursor-pointer disabled:pointer-events-none disabled:text-gray-500 disabled:border-gray-500 transition-colors',
  {
    variants: {
      variant: {},
      size: {
        sm: 'py-2 px-4',
        md: 'py-3 px-6',
        lg: 'py-3 px-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, children, asChild = false, isLoading, ...rest } = props;
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp ref={ref} className={cn(buttonVariants({ className }))} {...rest}>
        {children}
        {isLoading ? (
          <AnimatedLoadingIcon
            className="flex items-baseline w-fit"
            size="small"
          />
        ) : null}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
export default Button;
