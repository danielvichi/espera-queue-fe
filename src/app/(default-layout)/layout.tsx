import type { JSX } from "react";
import { Clients } from "../_components/clients";
import { DefaultHeader } from "../_components/headers/default-header";

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
