import type React from 'react';
import { useRouter } from 'next/navigation';
import Button from '~/app/_components/button';

export default function LogoutButton() {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push('/login');
  }

  return <Button onClick={handleClick}>Login</Button>;
}
