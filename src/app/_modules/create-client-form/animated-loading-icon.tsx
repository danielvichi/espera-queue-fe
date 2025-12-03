type size = 'small' | 'medium' | 'large';

const containerSize = {
  small: 15,
  medium: 40,
  large: 60,
};

const dotSize = {
  small: 3,
  medium: 10,
  large: 20,
};

function Dot({ delay, size }: { delay: string; size?: size }) {
  return (
    <svg
      className="inline-block animate-bounce "
      style={{
        animationDelay: delay,
      }}
      width={dotSize[size ?? 'medium']}
      height={dotSize[size ?? 'medium']}
      viewBox={`0 0 ${dotSize[size ?? 'medium']} ${dotSize[size ?? 'medium']}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" fill="black" />
    </svg>
  );
}

interface AnimatedLoadingIconProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: size;
}

export default function AnimatedLoadingIcon(props: AnimatedLoadingIconProps) {
  const { size, className, ...rest } = props;
  return (
    <div
      className={` ${className}`}
      style={{
        width: containerSize[size ?? 'medium'],
        height: containerSize[size ?? 'medium'],
      }}
      {...rest}
    >
      <div className="flex h-full w-full flex-row items-end gap-1">
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </div>
    </div>
  );
}
