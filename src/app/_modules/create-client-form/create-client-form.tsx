'use client';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useAdminAuthenticationContext } from '../../_contexts/admin-authentication-provider';
import useCreateClient from '../../_hooks/use-create-client';
import * as Form from '@radix-ui/react-form';
import type { CreateClientWithAdminDto } from '../../api/generated/model';
import ClientFormFieldSection from './client-form-field';
import { AdminFormFieldSection } from './admin-form-field';
import Button from '~/app/_components/button';
import { CardCarrouselContainer, CardContainer } from './components/carrousel';
import StepsBreadCrumbs from './components/steps-bread-crumb';

export type FormErrorMessageList = Array<[string, string]>;

export interface HandleInputBlurArgs<T> {
  event: ChangeEvent<HTMLInputElement>;
  field: keyof T;
}

const KNOWN_ERROR: Record<string, string> = {
  '409': 'Account already exist',
};

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

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isClientFormIsOk, setIsClientFormOk] = useState<boolean>(false);
  const [isAdminFormIsOk, setIsAdminFormOk] = useState<boolean>(false);

  function setStep(index: number) {
    setActiveStepIndex(index);
  }

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
      <StepsBreadCrumbs
        activeStepIndex={activeStepIndex}
        steps={['Business', 'Admin']}
        setActiveStepIndex={setStep}
      />
      <Form.Root>
        <CardCarrouselContainer activeIndex={activeStepIndex}>
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
      </Form.Root>
      <div className="flex w-full justify-center gap-4">
        <Button
          className="w-full max-w-80"
          disabled={
            !isClientFormIsOk || isCreatingAccount || activeStepIndex >= 1
          }
          onClick={setStep.bind(null, activeStepIndex + 1)}
          style={{
            display: activeStepIndex >= 1 ? 'none' : 'block',
          }}
        >
          Next
        </Button>

        <Button
          className="w-full max-w-80"
          disabled={
            isCreatingAccount || activeStepIndex > 1 || activeStepIndex <= 0
          }
          onClick={setStep.bind(null, activeStepIndex - 1)}
          style={{
            display: activeStepIndex < 1 ? 'none' : 'block',
          }}
        >
          Previous
        </Button>

        <Button
          className="w-full max-w-80"
          disabled={
            !isClientFormIsOk ||
            !isAdminFormIsOk ||
            isCreatingAccount ||
            !!errorCode
          }
          onClick={handleSubmit}
          style={{
            display: activeStepIndex >= 1 ? 'block' : 'none',
          }}
        >
          Create Account
        </Button>
      </div>
    </>
  );
}
