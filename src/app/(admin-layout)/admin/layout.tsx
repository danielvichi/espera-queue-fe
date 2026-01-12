import type { JSX } from 'react';
import AdminAuthenticationProvider from '~/app/_contexts/admin-authentication-provider';
import UnityDataProvider from '~/app/_contexts/unity-data-provider';
import { AdminHeader } from '~/app/_modules/headers/admin-header';

export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <AdminAuthenticationProvider>
      <UnityDataProvider>
        <>
          <AdminHeader />
          {children}
        </>
      </UnityDataProvider>
    </AdminAuthenticationProvider>
  );
}
