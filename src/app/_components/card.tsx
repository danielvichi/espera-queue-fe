import { forwardRef } from 'react';

type UnityCardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, UnityCardProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div
      ref={ref}
      className={`border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = 'UnityCard';
export default Card;
