'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import AnimatedLoadingIcon from '~/app/_components/animated-loading-icon';
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
  const params = useSearchParams();

  const { user, isLoading } = useAdminAuthenticationContext();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isAdminAuthenticated = Boolean(user?.id);
  const navigationCallback = params.get('redirect');

  useEffect(
    function checkFirstAdminLoginPageLoadEffect() {
      if (!isLoading && user !== undefined) {
        setIsFirstLoad(false);
      }
    },
    [user, isLoading],
  );

  useEffect(() => {
    if (isAdminAuthenticated && navigationCallback) {
      void router.push(navigationCallback);
      return;
    }

    if (isAdminAuthenticated) {
      void router.push('/admin');
      return;
    }
  }, [isAdminAuthenticated, navigationCallback, router]);

  if (isAdminAuthenticated && navigationCallback) {
    return null;
  }

  if (isAdminAuthenticated) {
    return null;
  }

  if (isFirstLoad) {
    return <LoadingPageState />;
  }

  return <LoadedPageState />;
}
