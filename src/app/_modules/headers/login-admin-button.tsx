import type React from 'react';
import { useRouter } from 'next/navigation';
import Button from '~/app/_components/button';

export default function LoginAdminButton() {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push('/admin/login');
  }

  return <Button onClick={handleClick}>Login</Button>;
}
