'use client';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import { CreateClientForm } from '~/app/_modules/create-client-form/create-client-form';
import PageWrapperLayout from '~/app/_modules/headers/page-wrapper-layout';

export default function CreateClientPage() {
  const { user } = useAdminAuthenticationContext();

  const isAdminAuthenticated = Boolean(user?.id);

  return (
    <PageWrapperLayout>
      Create Business Account
      {isAdminAuthenticated ? 'CREATED' : <CreateClientForm />}
    </PageWrapperLayout>
  );
}
