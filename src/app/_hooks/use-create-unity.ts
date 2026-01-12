import { useState } from 'react';
import { type CreateUnityDto } from '../api/generated/model';
import { unityControllerCreateUnity } from '../api/generated/unity/unity';
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
    createUnity,
  };
}
