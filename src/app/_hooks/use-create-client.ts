'use client';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type {
  AdminWithClientDto,
  CreateClientWithAdminDto,
} from '../api/generated/model';
import { clientControllerCreateClientAndSignin } from '../api/generated/client/client';

export default function useCreateClient() {
  const [inputData, setInputData] = useState<CreateClientWithAdminDto | null>(
    null,
  );
  const [isCreatingAccount, setCreatingClient] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  /**
   * Function to create a new client and sign in
   *
   * @param {CreateClientWithAdminDto} input - The client data to create
   * @returns - {Promise<AdminWithClientDto | null>} - The created admin user or null if failed
   */
  async function createClient(
    input: CreateClientWithAdminDto,
  ): Promise<AdminWithClientDto | null> {
    setCreatingClient(true);

    return await clientControllerCreateClientAndSignin(input, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.headers) {
          setErrorCode(400);
        }

        const decodedJwt: AdminWithClientDto = jwtDecode(response.data);
        return decodedJwt;
      })
      .catch((error: unknown) => {
        console.log(error);
        // Safely extract a numeric status if present on the error object
        if (typeof error === 'object' && error !== null && 'status' in error) {
          const status = (error as { status?: unknown }).status;
          if (typeof status === 'number') {
            setErrorCode(status);
          } else {
            setErrorCode(null);
          }
        } else {
          setErrorCode(null);
        }
        return null;
      })
      .finally(() => {
        setCreatingClient(false);
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
    isCreatingAccount,
    errorCode,
    resetErrors,
    createClient,
  };
}
