'use client';
import { useEffect, useState } from 'react';
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
  const { user } = useAdminAuthenticationContext();
  return (
    <PageWrapperLayout>
      {user?.id ? 'DASHBOARD' : <LoginModule />}
    </PageWrapperLayout>
  );
}

export default function AdminDashboardPage() {
  const { user, isLoading } = useAdminAuthenticationContext();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
