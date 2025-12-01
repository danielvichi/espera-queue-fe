import * as Form from '@radix-ui/react-form';
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { CreateClientWithAdminDto } from '~/app/api/generated/model';
import type {
  FormErrorMessageList,
  HandleInputBlurArgs,
} from './create-client-form';
import FormError from './form-error';
import { updateInputData } from './utils/update-input-form';
import { VALIDATION_OPTIONS_FOR_CREATE_CLIENT_ADMIN } from '~/configs/create-client-input';
import { PasswordInputForm } from '../password-input-form';
import Input from '../input';

type CreateClientWithAdminDtoOnlyAdminWithoutPassword = Omit<
  CreateClientWithAdminDto['admin'],
  'passwordHash'
>;

interface AdminFormFieldSectionProps {
  inputData: CreateClientWithAdminDto | null;
  updateInputData: Dispatch<SetStateAction<CreateClientWithAdminDto | null>>;
  onIsRequiredFieldsOk?: () => void;
  onIsRequiredFieldsFailed: () => void;
}

export function AdminFormFieldSection(props: AdminFormFieldSectionProps) {
  const [adminFormErrorMessageList, setAdminFormErrorMessageList] =
    useState<FormErrorMessageList>([]);

  const checkRequiredFieldsOnBlur = useCallback(() => {
    if (!props.inputData?.admin.name) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    if (!props.inputData?.admin.email) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    if (!props.inputData?.admin.passwordHash) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    const hasRequiredFieldError = adminFormErrorMessageList.length > 0;

    if (hasRequiredFieldError) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    props.onIsRequiredFieldsOk?.();
  }, [props, adminFormErrorMessageList]);

  function handleOnInputBlur({
    event,
    field,
  }: HandleInputBlurArgs<CreateClientWithAdminDtoOnlyAdminWithoutPassword>) {
    const value = event.target.value;

    const validatedData =
      updateInputData<CreateClientWithAdminDtoOnlyAdminWithoutPassword>({
        data: value,
        dataField: field,
        validationConfigObject:
          VALIDATION_OPTIONS_FOR_CREATE_CLIENT_ADMIN[field] ?? {},
        errorList: adminFormErrorMessageList,
        onError: setAdminFormErrorMessageList as unknown as (
          errors: unknown,
        ) => void,
      });

    if (!validatedData) {
      return;
    }

    props.updateInputData((previousData) => {
      if (previousData) {
        return {
          ...previousData,
          admin: {
            ...previousData.admin,
            [field]: validatedData,
          },
        };
      }

      return {
        name: '',
        address: '',
        cnpj: '',
        phone: '',
        admin: {
          email: '',
          name: '',
          passwordHash: '',
          [field]: validatedData,
        },
      };
    });
  }

  function handleOnPasswordSuccessCheck(passwordString: string) {
    // TODO: Make password into hash
    const passwordIntoHash = passwordString;

    props.updateInputData((prevData) => {
      let updatedState = {} as CreateClientWithAdminDto;

      if (prevData) {
        updatedState = prevData;
      } else {
        updatedState = {
          address: '',
          admin: {
            name: '',
            email: '',
            passwordHash: '',
          },
          cnpj: '',
          name: '',
          phone: '',
        };
      }

      updatedState.admin.passwordHash = passwordIntoHash;
      return updatedState;
    });

    checkRequiredFieldsOnBlur();
  }

  function handleOnPasswordFailCheck() {
    props.updateInputData((prevData) => {
      let updatedState = {} as CreateClientWithAdminDto;

      if (prevData) {
        updatedState = prevData;
      } else {
        updatedState = {
          address: '',
          admin: {
            name: '',
            email: '',
            passwordHash: '',
          },
          cnpj: '',
          name: '',
          phone: '',
        };
      }

      updatedState.admin.passwordHash = '';
      return updatedState;
    });
  }

  useEffect(
    function checkAdminInputDataEffect() {
      checkRequiredFieldsOnBlur();
    },
    [props.inputData, checkRequiredFieldsOnBlur],
  );

  return (
    <>
      <Form.Field name="name" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>Owner Name</Form.Label>

          <Form.Control asChild>
            <Input
              type="text"
              onBlur={(event) => handleOnInputBlur({ event, field: 'name' })}
            />
          </Form.Control>
        </div>
        <FormError errorType="name" errorList={adminFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="email" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>e-mail</Form.Label>

          <Form.Control asChild>
            <Input
              type="email"
              onBlur={(event) => handleOnInputBlur({ event, field: 'email' })}
            />
          </Form.Control>
        </div>
        <FormError errorType="email" errorList={adminFormErrorMessageList} />
      </Form.Field>

      <PasswordInputForm
        onCheckSuccess={handleOnPasswordSuccessCheck}
        onCheckFail={handleOnPasswordFailCheck}
      />
    </>
  );
}
