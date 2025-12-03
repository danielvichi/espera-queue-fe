import type React from 'react';
import Button from '~/app/_components/button';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';

export default function LogoutButton() {
  const { adminLogout } = useAdminAuthenticationContext();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    void adminLogout();
  }

  return <Button onClick={handleClick}>Logout</Button>;
}
