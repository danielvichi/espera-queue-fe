"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
} from "react";
import type { AdminWithClientDto, SignInDto } from "../api/generated/model";
import {
  authControllerCheckAdminCredentials,
  authControllerLogout,
  useAuthControllerVerify,
} from "../api/generated/auth/auth";
import { jwtDecode } from "jwt-decode";
import { type AxiosError, type AxiosResponse } from "axios";
import setUserFromJWT from "~/utils/setUserFromJWT";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    mutate: verifyMutate,
    isLoading: isVerifyLoading,
    isValidating: isVerifyValidating,
  } = useAuthControllerVerify({
    axios: {
      withCredentials: true,
    },
    swr: {
      refreshWhenHidden: false,
      revalidateOnFocus: true,
      refreshInterval: 1000 * 60 * 60 * 5,
      onSuccess: (result) => {
        setUserFromJWT({
          jwt: result.data,
          setUser: setUser,
        });
      },
      onError: (error: AxiosError) => {
        void adminLogout();
        console.log("Unauthorized", error.message);
      },
    },
  });

  async function adminLogin(authCredential: SignInDto) {
    console.log("adminLogin", authCredential);

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
          setErrorMessage("Something went wrong, please try again");
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

  useEffect(function onInit() {
    void verifyMutate();
  }, []);

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
        "useAdminAuthenticationContext must be used within a AdminAuthenticationProvider",
      );
    }

    return context;
  };

export default AdminAuthenticationProvider;
