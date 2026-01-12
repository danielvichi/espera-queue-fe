'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import AdminDashboard from '~/app/_modules/admin-dashboard/admin-dashboard';
import AnimatedLoadingIcon from '~/app/_components/animated-loading-icon';
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
  const isAdminAuthenticated = Boolean(user?.id);

  useEffect(
    function checkFirstAdminDashboardPageLoadEffect() {
      if (!isLoading && user !== undefined) {
        setIsFirstLoad(false);
      }

      if (!isAdminAuthenticated) {
        void router.push('/admin/login');
      }
    },
    [user, isLoading, isAdminAuthenticated, router],
  );

  useEffect(() => {
    if (!isAdminAuthenticated) {
      void router.push('/admin/login');
    }
  }, [isAdminAuthenticated, router]);

  if (isFirstLoad) {
    return <LoadingPageState />;
  }

  if (!isAdminAuthenticated) {
    return null;
  }

  return <LoadedPageState />;
}
