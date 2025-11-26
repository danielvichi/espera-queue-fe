"use client";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAdminAuthenticationContext } from "../../_auth/admin-authentication-provider";
import useCreateClient from "../../_hooks/use-create-client";
import * as Form from "@radix-ui/react-form";
import type { CreateClientWithAdminDto } from "../../api/generated/model";
import ClientFormFieldSection from "./client-form-field";
import { AdminFormFieldSection } from "./admin-form-field";

export type FormErrorMessageList = Array<[string, string]>;

export interface HandleInputBlurArgs<T> {
  event: ChangeEvent<HTMLInputElement>;
  field: keyof T;
}

const KNOWN_ERROR: Record<string, string> = {
  "409": "Account already exist",
};

function Errors(props: { errorCode: number | null }) {
  const { errorCode } = props;
  if (!errorCode) {
    return null;
  }

  const defaultMessage = "Something went wrong, please try again";
  let friendlyErrorMessage;

  const knowErrorCodes = Object.keys(KNOWN_ERROR);
  if (knowErrorCodes.includes(errorCode.toString())) {
    friendlyErrorMessage = KNOWN_ERROR[errorCode] ?? defaultMessage;
  }

  return <div>{friendlyErrorMessage}</div>;
}

export function CreateClientForm() {
  const { setUser } = useAdminAuthenticationContext();
  const {
    inputData,
    setInputData,
    isCreatingAccount,
    errorCode,
    resetErrors,
    createClient,
  } = useCreateClient();

  const [isClientFormIsOk, setIsClientFormOk] = useState<boolean>(false);
  const [isAdminFormIsOk, setIsAdminFormOk] = useState<boolean>(false);

  async function createClientWithAdmin(data: CreateClientWithAdminDto) {
    const clientWithAdmin = await createClient(data);

    if (!clientWithAdmin) {
      // Error will be probably catch inside `useCreateClient` hook
      return;
    }

    setUser(clientWithAdmin);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!isClientFormIsOk || !isAdminFormIsOk || !inputData) {
      console.log(
        "no isClientFormIsOk, isAdminFormIsOk, inputData",
        isClientFormIsOk,
        isAdminFormIsOk,
        inputData,
      );
      return;
    }

    await createClientWithAdmin(inputData);
  }

  useEffect(
    function resetErrorsOnInputChangeEffect() {
      if (errorCode) {
        resetErrors();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- only inputData should trigger it
    },
    [inputData],
  );

  return (
    <>
      <Errors errorCode={errorCode} />

      <Form.Root className="flex flex-col gap-4">
        <ClientFormFieldSection
          inputData={inputData}
          updateInputData={setInputData}
          onIsRequiredFieldsOk={() => {
            setIsClientFormOk(true);
          }}
          onIsRequiredFieldsFailed={() => {
            setIsClientFormOk(false);
          }}
        />
        <AdminFormFieldSection
          inputData={inputData}
          updateInputData={setInputData}
          onIsRequiredFieldsOk={() => {
            setIsAdminFormOk(true);
          }}
          onIsRequiredFieldsFailed={() => {
            setIsAdminFormOk(false);
          }}
        />
        <button
          className="disabled:opacity-50"
          disabled={
            !isClientFormIsOk ||
            !isAdminFormIsOk ||
            isCreatingAccount ||
            !!errorCode
          }
          onClick={(e) => handleSubmit(e)}
        >
          Create Account
        </button>
      </Form.Root>
    </>
  );
}
