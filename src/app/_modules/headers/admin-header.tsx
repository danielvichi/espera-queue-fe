'use client';
import type { JSX } from 'react';
import LogoutButton from './logout-button';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';

export function AdminHeader(): JSX.Element {
  const { user } = useAdminAuthenticationContext();

  return (
    <div className="absolute top-0 right-0 left-0 bg-gray-400 p-2">
      ADMIN HEADER
      {user ? <LogoutButton /> : ''}
    </div>
  );
}
