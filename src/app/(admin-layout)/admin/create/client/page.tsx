'use client';
import { useRouter } from 'next/navigation';
import PageBackground from '~/app/_components/page-background';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import { CreateClientForm } from '~/app/_modules/create-client-form/create-client-form';
import PageWrapperLayout from '~/app/_modules/headers/page-wrapper-layout';

export default function CreateClientPage() {
  const { user } = useAdminAuthenticationContext();
  const router = useRouter();

  const isAdminAuthenticated = Boolean(user?.id);

  if (isAdminAuthenticated) {
    void router.push('/admin');
  }

  return (
    <PageWrapperLayout className="p-8">
      <PageBackground />
      <div className="relative flex flex-col gap-8 w-full max-w-4xl justify-center py-8 px-4 md:px-8 bg-white">
        <CreateClientForm />
      </div>
    </PageWrapperLayout>
  );
}
