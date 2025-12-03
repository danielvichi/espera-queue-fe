import * as Form from '@radix-ui/react-form';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type {
  FormErrorMessageList,
  HandleInputBlurArgs,
} from './create-client-form';
import type { CreateClientWithAdminDto } from '~/app/api/generated/model';
import { VALIDATION_OPTIONS_FOR_CREATE_CLIENT } from '~/configs/create-client-input';
import { updateInputData } from './utils/update-input-form';
import FormError from './form-error';
import formatPhoneString from '~/utils/formatPhoneString';
import Input from '../../_components/input';

type CreateClientWithAdminDtoWithoutAdmin = Omit<
  CreateClientWithAdminDto,
  'admin'
>;

interface ClientFormFieldSectionProps {
  inputData: CreateClientWithAdminDto | null;
  updateInputData: Dispatch<SetStateAction<CreateClientWithAdminDto | null>>;
  onIsRequiredFieldsOk?: () => void;
  onIsRequiredFieldsFailed: () => void;
}

export default function ClientFormFieldSection(
  props: ClientFormFieldSectionProps,
) {
  const [clientFormErrorMessageList, setClientFormErrorMessageList] =
    useState<FormErrorMessageList>([]);

  const phoneInputRef = useRef<HTMLInputElement>(null);

  const checkRequiredFieldsOnBlur = useCallback(() => {
    if (!props.inputData?.name) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    const hasRequiredFieldError =
      clientFormErrorMessageList.filter((errorItem) => errorItem[0] === 'name')
        .length > 0;

    if (hasRequiredFieldError) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    props.onIsRequiredFieldsOk?.();
  }, [props, clientFormErrorMessageList]);

  function handlePhoneChange(string: string) {
    if (!phoneInputRef.current) {
      return '';
    }
    const formattedValue = formatPhoneString(string);

    phoneInputRef.current.value = formattedValue;

    return formattedValue ?? '';
  }

  function updateClientInputFields({
    event,
    field,
  }: HandleInputBlurArgs<CreateClientWithAdminDtoWithoutAdmin>) {
    let value = event.target.value;

    if (field === 'phone') {
      value = handlePhoneChange(value);
    }

    const validatedData = updateInputData<CreateClientWithAdminDtoWithoutAdmin>(
      {
        data: value,
        dataField: field,
        validationConfigObject: VALIDATION_OPTIONS_FOR_CREATE_CLIENT[field],
        errorList: clientFormErrorMessageList,
        onError: setClientFormErrorMessageList as unknown as (
          errors: unknown,
        ) => void,
      },
    );

    if (field === 'phone') {
      console.log('validatedData', validatedData);
    }

    if (!validatedData) {
      return;
    }

    props.updateInputData((previousData) => {
      if (previousData) {
        return {
          ...previousData,
          [field]: validatedData,
        };
      }

      return {
        name: '',
        address: '',
        cnpj: '',
        phone: '',
        [field]: validatedData,
        admin: {
          email: '',
          name: '',
          passwordHash: '',
        },
      };
    });
  }

  useEffect(
    function checkClientInputDataEffect() {
      checkRequiredFieldsOnBlur();
    },
    [props.inputData, checkRequiredFieldsOnBlur],
  );

  return (
    <>
      <Form.Field name="name" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>Business Name</Form.Label>

          <Form.Control asChild>
            <Input
              type="text"
              onChange={(event) =>
                updateClientInputFields({ event, field: 'name' })
              }
              required
            />
          </Form.Control>
        </div>
        <FormError errorType="name" errorList={clientFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="cnpj" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>CNPJ</Form.Label>

          <Form.Control asChild>
            <Input
              type="text"
              onChange={(event) =>
                updateClientInputFields({ event, field: 'cnpj' })
              }
            />
          </Form.Control>
        </div>
        <FormError errorType="cnpj" errorList={clientFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="address" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>Address</Form.Label>

          <Form.Control asChild>
            <Input
              type="text"
              onChange={(event) =>
                updateClientInputFields({ event, field: 'address' })
              }
            />
          </Form.Control>
        </div>
        <FormError errorType="address" errorList={clientFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="phone" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>Phone</Form.Label>

          <Form.Control asChild>
            <Input
              type="text"
              ref={phoneInputRef}
              onChange={(event) =>
                updateClientInputFields({ event, field: 'phone' })
              }
            />
          </Form.Control>
        </div>
        <FormError errorType="phone" errorList={clientFormErrorMessageList} />
      </Form.Field>
    </>
  );
}
