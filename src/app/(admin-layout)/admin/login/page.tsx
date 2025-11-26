"use client";
import { useAdminAuthenticationContext } from "~/app/_auth/admin-authentication-provider";
import LoginForm from "./_components/login-form";

export default function AdminHome() {
  const { user, isLoading, adminLogin } = useAdminAuthenticationContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        Login admin
        {user?.id ? (
          "Signed id"
        ) : (
          <LoginForm onSubmit={adminLogin} isLoading={isLoading} />
        )}
      </div>
    </main>
  );
}
