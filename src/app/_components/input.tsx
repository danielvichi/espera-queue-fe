import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '~/utils/cn';

const inputVariants = cva('border disabled:bg-gray-300', {
  variants: {
    variant: {},
    size: {
      sm: 'py-1 px-2',
      md: 'py-1 px-3',
      lg: 'py-2 px-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : 'input';

  return (
    <Comp ref={ref} className={cn(inputVariants({ className }))} {...rest} />
  );
});

Input.displayName = 'Input';
export default Input;
