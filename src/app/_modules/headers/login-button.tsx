import type React from 'react';
import Button from '../button';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push('/login');
  }

  return <Button onClick={handleClick}>Login</Button>;
}
