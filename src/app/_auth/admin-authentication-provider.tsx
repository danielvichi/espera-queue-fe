'use client';
import { createContext, useContext, useState, type JSX } from 'react';
import type { AdminWithClientDto, SignInDto } from '../api/generated/model';
import {
  authControllerCheckAdminCredentials,
  authControllerLogout,
  useAuthControllerVerify,
} from '../api/generated/auth/auth';
import { jwtDecode } from 'jwt-decode';
import { type AxiosError, type AxiosResponse } from 'axios';
import setUserFromJWT from '~/utils/setUserFromJWT';

interface AdminAuthenticationContextType {
  user: AdminWithClientDto | null;
  setUser: (userState: AdminWithClientDto) => void;
  isLoading: boolean;
  errorMessage: string | null;
  adminLogin: (authCredential: SignInDto) => Promise<void>;
  adminLogout: () => Promise<void>;
  verifySession: () => Promise<AxiosResponse<string> | undefined>;
}

const AdminAuthenticationContext =
  createContext<AdminAuthenticationContextType | null>(null);

interface AdminAuthenticationProviderProps {
  children: React.ReactNode;
}

function AdminAuthenticationProvider(
  props: AdminAuthenticationProviderProps,
): JSX.Element {
  const [user, setUser] = useState<AdminWithClientDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Determine when to run the credentials verification check on mount and on user login
   */
  const onMountState = !user && isLoading;
  const onUserLoggedInState = !!user && !isLoading;

  // Use the verify hook to regularly check admin credentials
  const {
    mutate: verifyMutate,
    isLoading: isVerifyLoading,
    isValidating: isVerifyValidating,
  } = useAuthControllerVerify({
    axios: {
      withCredentials: true,
    },
    swr: {
      enabled: onMountState || onUserLoggedInState,
      revalidateOnFocus: false,
      refreshInterval: 1000 * 60 * 5, // 5 minutes
      onSuccess: (result) => {
        setUserFromJWT({
          jwt: result.data,
          setUser: setUser,
        });
        setIsLoading(false);
      },
      onError: (error: AxiosError) => {
        if (user) {
          setUser(null);
        }
        setIsLoading(false);
        console.log('Unauthorized', error.message);
      },
    },
  });

  /**
   * Function to log in an admin user
   *
   * @param {SignInDto} authCredential - The admin's authentication credentials
   * @returns
   */
  async function adminLogin(authCredential: SignInDto) {
    if (!authCredential.email || !authCredential.passwordHash) {
      return;
    }

    const credentials: SignInDto = {
      email: authCredential.email,
      passwordHash: authCredential.passwordHash,
    };

    setIsLoading(true);

    await authControllerCheckAdminCredentials(credentials, {
      withCredentials: true,
    })
      .then((response: AxiosResponse) => {
        if (response.status >= 300 || !response?.headers) {
          setErrorMessage('Something went wrong, please try again');
          return;
        }

        const userData: AdminWithClientDto = jwtDecode(response.data as string);

        setUser(userData);
      })
      .catch((error: AxiosError) => {
        setErrorMessage(error.message);
      });
    setIsLoading(false);
  }

  /**
   * Function to log out the current admin user
   */
  async function adminLogout() {
    authControllerLogout({
      withCredentials: true,
    })
      .then((result) => {
        setUser(null);
        return result;
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }

  const isLoadingOrValidating =
    isLoading || isVerifyLoading || isVerifyValidating;

  return (
    <AdminAuthenticationContext.Provider
      value={{
        user,
        setUser,
        isLoading: isLoadingOrValidating,
        errorMessage,
        adminLogin,
        adminLogout,
        verifySession: () => verifyMutate(),
      }}
    >
      {props.children}
    </AdminAuthenticationContext.Provider>
  );
}

export const useAdminAuthenticationContext =
  (): AdminAuthenticationContextType => {
    const context = useContext(AdminAuthenticationContext);

    if (!context) {
      throw new Error(
        'useAdminAuthenticationContext must be used within a AdminAuthenticationProvider',
      );
    }

    return context;
  };

export default AdminAuthenticationProvider;
