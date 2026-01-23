import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '~/utils/cn';
import { inputVariants } from './input';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
  };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { className, asChild = false, ...rest } = props;
    const Comp = asChild ? Slot : 'select';

    return (
      <Comp ref={ref} className={cn(inputVariants({ className }))} {...rest} />
    );
  },
);

Select.displayName = 'Select';
export default Select;
