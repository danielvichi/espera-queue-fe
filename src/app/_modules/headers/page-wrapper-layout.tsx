import type React from 'react';

type PageWrapperLayoutProps = React.HTMLAttributes<HTMLElement>;

export default function PageWrapperLayout(props: PageWrapperLayoutProps) {
  const { className, children, ...rest } = props;
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${className}`}
      {...rest}
    >
      {children}
    </main>
  );
}
