'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type JSX,
} from 'react';
import type { UnityDto } from '../api/generated/model';
import { unityControllerGetAllUnities } from '../api/generated/unity/unity';
import type { AxiosError } from 'axios';
import { useAdminAuthenticationContext } from './admin-authentication-provider';

interface UnityDataProviderType {
  unitiesData: UnityDto[] | null | undefined;
  isLoading: boolean;
  errorMessage: string | null;
  refreshUnityData: () => Promise<void>;
}

const UnityDataContext = createContext<UnityDataProviderType | null>(null);

interface UnityDataProviderProps {
  children: React.ReactNode;
}

function UnityDataProvider(props: UnityDataProviderProps): JSX.Element {
  const [unitiesData, setUnitiesData] = useState<UnityDto[] | null | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user } = useAdminAuthenticationContext();

  const fetchUnitiesForConnectedAdmin = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
    }

    unityControllerGetAllUnities({
      withCredentials: true,
    })
      .then((response) => {
        console.log('Fetched unities data:', response.data);
        setUnitiesData(response.data);
      })
      .catch((error: AxiosError) => {
        setErrorMessage(
          error.message ?? 'An error occurred while fetching unities data.',
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  async function refreshUnityData() {
    return fetchUnitiesForConnectedAdmin();
  }

  useEffect(
    function fetchDataOnMount() {
      if (!user?.client) {
        return;
      }

      if (!unitiesData && !isLoading) {
        fetchUnitiesForConnectedAdmin();
      }
    },
    [user, unitiesData, isLoading, fetchUnitiesForConnectedAdmin],
  );

  return (
    <UnityDataContext.Provider
      value={{
        unitiesData,
        refreshUnityData,
        isLoading: isLoading,
        errorMessage,
      }}
    >
      {props.children}
    </UnityDataContext.Provider>
  );
}

export const useUnitiesDataContext = (): UnityDataProviderType => {
  const context = useContext(UnityDataContext);

  if (!context) {
    throw new Error(
      'useUnitiesDataContext must be used within a UnityDataProvider',
    );
  }

  return context;
};

export default UnityDataProvider;
