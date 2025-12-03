'use client';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useAdminAuthenticationContext } from '../../_contexts/admin-authentication-provider';
import useCreateClient from '../../_hooks/use-create-client';
import * as Form from '@radix-ui/react-form';
import type { CreateClientWithAdminDto } from '../../api/generated/model';
import ClientFormFieldSection from './client-form-field';
import { AdminFormFieldSection } from './admin-form-field';
import Button from '~/app/_components/button';

export type FormErrorMessageList = Array<[string, string]>;

export interface HandleInputBlurArgs<T> {
  event: ChangeEvent<HTMLInputElement>;
  field: keyof T;
}

const KNOWN_ERROR: Record<string, string> = {
  '409': 'Account already exist',
};

function CardContainer(props: { children: React.ReactNode }) {
  return (
    <div className="absolute flex flex-col gap-4 h-full p-6 w-full max-w-4xl border border-red-400">
      {props.children}
    </div>
  );
}

interface CardCarrouselContainerProps {
  activeIndex?: number;
  getTotalChildrenAmount?: (amount: number) => void;
  children: React.ReactNode;
}

function CardCarrouselContainer(props: CardCarrouselContainerProps) {
  const { children, activeIndex, getTotalChildrenAmount } = props;

  const childrenAmount = children
    ? Array.isArray(children)
      ? children.length
      : 1
    : 0;

  getTotalChildrenAmount?.(childrenAmount);

  return (
    <div className="relative min-h-[230px] flex flex-row gap-4 overflow-x-auto w-full max-w-4xl">
      {children}
    </div>
  );
}

function Errors(props: { errorCode: number | null }) {
  const { errorCode } = props;
  if (!errorCode) {
    return null;
  }

  const defaultMessage = 'Something went wrong, please try again';
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
        'no isClientFormIsOk, isAdminFormIsOk, inputData',
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
    },
    [inputData],
  );

  return (
    <>
      Create Business Account
      <Errors errorCode={errorCode} />
      <Form.Root>
        <CardCarrouselContainer>
          <CardContainer>
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
          </CardContainer>

          <CardContainer>
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
          </CardContainer>
        </CardCarrouselContainer>

        <Button
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
        </Button>
      </Form.Root>
    </>
  );
}
