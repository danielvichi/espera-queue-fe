import type React from 'react';
import { useAdminAuthenticationContext } from '~/app/_auth/admin-authentication-provider';
import Button from '../button';

export default function LogoutButton() {
  const { adminLogout } = useAdminAuthenticationContext();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    void adminLogout();
  }

  return (
    <Button onClick={handleClick} className="bg-white p-2 hover:font-bold">
      Logout
    </Button>
  );
}
