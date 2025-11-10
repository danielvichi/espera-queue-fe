import type { JSX } from "react";
import { AdminHeader } from "~/app/_components/headers/admin-header";

export default function DefaultPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
