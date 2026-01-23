import { useState } from 'react';
import { type CreateUnityDto } from '../api/generated/model';
import {
  unityControllerCreateUnity,
  unityControllerDeleteUnity,
} from '../api/generated/unity/unity';
import type { AxiosError } from 'axios';
import type { CreateUnityWithoutClientIdDto } from '../_modules/create-unity-form/unity-form-field';

export function useCreateUnity() {
  const [inputData, setInputData] =
    useState<CreateUnityWithoutClientIdDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  async function createUnity(input: CreateUnityDto) {
    setIsLoading(true);
    if (errorCode) {
      setErrorCode(null);
    }

    return await unityControllerCreateUnity(input, {
      withCredentials: true,
    })
      .then((response) => {
        const unityData = response.data;
        console.log('unityData', unityData);
        setInputData(unityData);

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

  async function deleteUnity(unityId: string) {
    setIsLoading(true);

    return await unityControllerDeleteUnity(
      { unityId: unityId },
      { withCredentials: true },
    )
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
    createUnity,
    deleteUnity,
  };
}
