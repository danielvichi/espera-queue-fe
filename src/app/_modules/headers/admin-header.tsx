'use client';
import type { JSX } from 'react';
import LogoutButton from './logout-button';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import LoginAdminButton from './login-admin-button';

export function AdminHeader(): JSX.Element {
  const { user } = useAdminAuthenticationContext();

  return (
    <div className="absolute top-0 right-0 left-0 flex items-center justify-between bg-gray-400 p-2 z-50">
      ADMIN HEADER
      {user ? <LogoutButton /> : <LoginAdminButton />}
    </div>
  );
}
