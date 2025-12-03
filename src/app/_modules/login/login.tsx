'use client';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import LoginForm from './_components/login-form';

export default function LoginModule() {
  const { isLoading, adminLogin } = useAdminAuthenticationContext();

  return (
    <div className="flex flex-col gap-4 justify-center border-l px-8">
      <h2>Login</h2>
      <LoginForm onSubmit={adminLogin} isLoading={isLoading} />
    </div>
  );
}
