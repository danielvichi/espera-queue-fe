'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type JSX,
} from 'react';
import type { ClientDto, QueueDto, UnityDto } from '../api/generated/model';
import { unityControllerGetAllUnities } from '../api/generated/unity/unity';
import type { AxiosError } from 'axios';

interface AdminAuthenticationContextType {
  client: ClientDto | null | undefined;
  setClient: (userState: ClientDto | null) => void;
  unitiesData: UnityDto[] | null | undefined;
  queuesData: QueueDto[] | null | undefined;
  isLoading: boolean;
  errorMessage: string | null;
  refreshClientData: () => Promise<void>;
}

const AdminAuthenticationContext =
  createContext<AdminAuthenticationContextType | null>(null);

interface ClientDataProviderProps {
  children: React.ReactNode;
}

function ClientDataProvider(props: ClientDataProviderProps): JSX.Element {
  const [client, setClient] = useState<ClientDto | null | undefined>(undefined);
  const [unitiesData, setUnitiesData] = useState<UnityDto[] | null | undefined>(
    undefined,
  );
  const [queuesData, setQueuesData] = useState<QueueDto[] | null | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchClientData = useCallback(() => {
    if (isLoading) {
      setIsLoading(true);
    }

    // TODO make it fetch for connected client's data
    // clientControllerGetClientById();
  }, [isLoading]);

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

  async function refreshClientData() {
    return fetchUnitiesForConnectedAdmin();
  }

  useEffect(
    function fetchDataOnMount() {
      if (!client) {
        return;
      }

      if (!unitiesData && !isLoading) {
        fetchUnitiesForConnectedAdmin();
      }
    },
    [
      client,
      unitiesData,
      isLoading,
      fetchClientData,
      fetchUnitiesForConnectedAdmin,
    ],
  );

  return (
    <AdminAuthenticationContext.Provider
      value={{
        client,
        setClient,
        unitiesData,
        queuesData,
        refreshClientData,
        isLoading: isLoading,
        errorMessage,
      }}
    >
      {props.children}
    </AdminAuthenticationContext.Provider>
  );
}

export const useClientDataContext = (): AdminAuthenticationContextType => {
  const context = useContext(AdminAuthenticationContext);

  if (!context) {
    throw new Error(
      'useClientDataContext must be used within a ClientDataProvider',
    );
  }

  return context;
};

export default ClientDataProvider;
