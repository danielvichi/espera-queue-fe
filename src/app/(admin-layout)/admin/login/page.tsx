'use client';
import { useRouter } from 'next/navigation';
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
  return (
    <PageWrapperLayout>
      <LoginModule />
    </PageWrapperLayout>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isLoading } = useAdminAuthenticationContext();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isAdminAuthenticated = Boolean(user?.id);
  if (isAdminAuthenticated) {
    void router.push('/admin');
  }

  useEffect(
    function checkFirstAdminLoginPageLoadEffect() {
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
