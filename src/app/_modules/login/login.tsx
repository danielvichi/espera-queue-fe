'use client';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import LoginForm from './_components/login-form';
import PageBackground from '~/app/_components/page-background';

export default function LoginModule() {
  const { isLoading, adminLogin } = useAdminAuthenticationContext();

  return (
    <div className="absolute w-full h-full flex flex-col items-center justify-center">
      <PageBackground />
      <div className="flex flex-col gap-8 relative bg-white p-8 px-4 md:px-8 mx-4 ">
        <h2>Login</h2>
        <LoginForm onSubmit={adminLogin} isLoading={isLoading} />
      </div>
    </div>
  );
}
