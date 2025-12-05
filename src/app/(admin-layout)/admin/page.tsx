'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import AdminDashboard from '~/app/_modules/admin-dashboard/admin-dashboard';
import AnimatedLoadingIcon from '~/app/_modules/create-client-form/animated-loading-icon';
import PageWrapperLayout from '~/app/_modules/headers/page-wrapper-layout';

function LoadingPageState() {
  return (
    <PageWrapperLayout>
      <AnimatedLoadingIcon size="large" />
    </PageWrapperLayout>
  );
}

function LoadedPageState() {
  return (
    <PageWrapperLayout>
      <AdminDashboard />
    </PageWrapperLayout>
  );
}

export default function AdminDashboardPage() {
  const { user, isLoading } = useAdminAuthenticationContext();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const router = useRouter();

  useEffect(
    function checkFirstAdminDashboardPageLoadEffect() {
      if (!isLoading && user !== undefined) {
        setIsFirstLoad(false);
      }
    },
    [user, isLoading],
  );

  const isAdminAuthenticated = Boolean(user?.id);

  if (isFirstLoad) {
    return <LoadingPageState />;
  }

  if (!isAdminAuthenticated) {
    void router.push('/admin/login');
  }

  return <LoadedPageState />;
}
