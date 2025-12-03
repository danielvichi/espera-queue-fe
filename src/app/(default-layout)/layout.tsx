import type { JSX } from 'react';
import { DefaultHeader } from '../_modules/headers/default-header';

export default function DefaultPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <DefaultHeader />
      {children}
    </>
  );
}
