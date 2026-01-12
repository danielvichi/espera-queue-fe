'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import { CreateUnityForm } from '~/app/_modules/create-unity-form/create-unity-form';
import PageWrapperLayout from '~/app/_modules/headers/page-wrapper-layout';

export default function CreateUnityPage() {
  const { user } = useAdminAuthenticationContext();
  const router = useRouter();

  // CHECK CREDENTIALS

  const isAdminAuthenticated = Boolean(user?.id);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      void router.push('/admin/login?redirect=/admin/create/unity');
      return;
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <PageWrapperLayout>
      <CreateUnityForm />
    </PageWrapperLayout>
  );
}
