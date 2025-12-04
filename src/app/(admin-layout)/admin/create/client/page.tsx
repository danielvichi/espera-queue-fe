'use client';
import { useRouter } from 'next/navigation';
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
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-linear-to-br from-teal-300 via-blue-400 to-purple-600" />
      <div className="relative flex flex-col gap-8 w-full max-w-4xl justify-center py-8 px-4 md:px-8 bg-white">
        <CreateClientForm />
      </div>
    </PageWrapperLayout>
  );
}
