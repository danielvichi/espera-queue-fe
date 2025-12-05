import type { JSX } from 'react';
import AdminAuthenticationProvider from '~/app/_contexts/admin-authentication-provider';
import ClientDataProvider from '~/app/_contexts/client-data-provider';
import { AdminHeader } from '~/app/_modules/headers/admin-header';

export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <ClientDataProvider>
      <AdminAuthenticationProvider>
        <>
          <AdminHeader />
          {children}
        </>
      </AdminAuthenticationProvider>
    </ClientDataProvider>
  );
}
