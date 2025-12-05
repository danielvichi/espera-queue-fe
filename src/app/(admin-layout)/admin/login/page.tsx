'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageBackground from '~/app/_components/page-background';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import AnimatedLoadingIcon from '~/app/_modules/create-client-form/animated-loading-icon';
import PageWrapperLayout from '~/app/_modules/headers/page-wrapper-layout';
import LoginModule from '~/app/_modules/login/login';

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
      <PageBackground />
      <div className="relative bg-white p-8 px-4 md:px-8 mx-4 ">
        <LoginModule />
      </div>
    </PageWrapperLayout>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAdminAuthenticationContext();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isAdminAuthenticated = Boolean(user?.id);
  if (isAdminAuthenticated) {
    void router.push('/admin');
  }

  console.log('AdminDashboardPage user:', user);

  useEffect(
    function checkFirstAdminDashboardPageLoadEffect() {
      if (!isLoading && user !== undefined) {
        setIsFirstLoad(false);
      }
    },
    [user, isLoading],
  );

  if (isFirstLoad) {
    return <LoadingPageState />;
  }

  return <LoadedPageState />;
}
