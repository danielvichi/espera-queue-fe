'use client';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import PageWrapperLayout from '~/app/_modules/headers/page-wrapper-layout';

export default function CreateClientPage() {
  const { user } = useAdminAuthenticationContext();

  // CHECK CREDENTIALS

  return <PageWrapperLayout>Create Admin Account</PageWrapperLayout>;
}
