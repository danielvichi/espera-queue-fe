import type React from 'react';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import Button from '../button';

export default function LogoutButton() {
  const { adminLogout } = useAdminAuthenticationContext();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    void adminLogout();
  }

  return <Button onClick={handleClick}>Logout</Button>;
}
