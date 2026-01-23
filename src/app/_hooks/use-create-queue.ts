import { useState } from 'react';
import { type InputCreateQueueDto } from '../api/generated/model';
import type { AxiosError } from 'axios';
import { queueControllerCreateQueue } from '../api/generated/queue/queue';
import type { InputCreateQueueWithoutUnityIdAndAdminIdDto } from '~/configs/create-queue-input';

export function useCreateQueue() {
  const [inputData, setInputData] =
    useState<InputCreateQueueWithoutUnityIdAndAdminIdDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  async function createQueue(input: InputCreateQueueDto) {
    setIsLoading(true);
    if (errorCode) {
      setErrorCode(null);
    }

    return await queueControllerCreateQueue(input, {
      withCredentials: true,
    })
      .then((response) => {
        const queueData = response.data;
        console.log('queue', queueData);
        return response;
      })
      .catch((error: AxiosError) => {
        console.error(error);

        if (error.status) {
          setErrorCode(error.status);
        } else {
          setErrorCode(0);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /**
   * Function to reset error state
   */
  function resetErrors() {
    setErrorCode(null);
  }

  return {
    inputData,
    setInputData,
    isLoading,
    errorCode,
    resetErrors,
    createQueue,
  };
}
