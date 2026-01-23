'use client';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type JSX,
} from 'react';
import type { QueueDto } from '../api/generated/model';
import type { AxiosError } from 'axios';
import { queueControllerGetQueueByIds } from '../api/generated/queue/queue';

interface QueueDataProviderType {
  queuesData: QueueDto[] | null | undefined;
  isLoading: boolean;
  errorMessage: string | null;
  refreshQueueData: (queueIds: string[]) => Promise<void>;
}

const QueueDataContext = createContext<QueueDataProviderType | null>(null);

interface QueueDataProviderProps {
  children: React.ReactNode;
}

function QueueDataProvider(props: QueueDataProviderProps): JSX.Element {
  const [queuesData, setQueuesData] = useState<QueueDto[] | null | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchQueueForConnectedAdmin = useCallback(
    (queueIds: string[]) => {
      if (!isLoading) {
        setIsLoading(true);
      }

      queueControllerGetQueueByIds(
        queueIds,
        { queueIds },
        {
          withCredentials: true,
        },
      )
        .then((response) => {
          console.log('Fetched Queue data:', response.data);
          setQueuesData(response.data);
        })
        .catch((error: AxiosError) => {
          setErrorMessage(
            error.message ?? 'An error occurred while fetching queue data.',
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [isLoading],
  );

  async function refreshQueueData(queueIds: string[]) {
    return fetchQueueForConnectedAdmin(queueIds);
  }

  return (
    <QueueDataContext.Provider
      value={{
        queuesData,
        refreshQueueData,
        isLoading: isLoading,
        errorMessage,
      }}
    >
      {props.children}
    </QueueDataContext.Provider>
  );
}

export const useQueuesDataContext = (): QueueDataProviderType => {
  const context = useContext(QueueDataContext);

  if (!context) {
    throw new Error(
      'useQueuesDataContext must be used within a QueueDataProvider',
    );
  }

  return context;
};

export default QueueDataProvider;
