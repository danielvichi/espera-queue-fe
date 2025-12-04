export function CardContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 h-full px-2 w-full max-w-4xl">
      {props.children}
    </div>
  );
}

interface CardCarrouselContainerProps {
  activeIndex?: number;
  getTotalChildrenAmount?: (amount: number) => void;
  children: React.ReactNode;
}

export function CardCarrouselContainer(props: CardCarrouselContainerProps) {
  const { children, activeIndex, getTotalChildrenAmount } = props;

  const childrenAmount = children
    ? Array.isArray(children)
      ? children.length
      : 1
    : 0;

  getTotalChildrenAmount?.(childrenAmount);

  return (
    <div className="relative min-h-[270px] md:min-h-[200px] flex flex-row gap-4 overflow-hidden max-w-4xl">
      <div
        className="absolute flex flex-row min-h-[230px] h-full"
        style={{
          width: `${childrenAmount * 100}%`,
          transform: `translateX(-${(activeIndex ?? 0) * (100 / childrenAmount)}%)`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
