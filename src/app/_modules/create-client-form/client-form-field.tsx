import * as Form from '@radix-ui/react-form';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import type { CreateClientWithAdminDto } from '~/app/api/generated/model';
import { VALIDATION_OPTIONS_FOR_CREATE_CLIENT } from '~/configs/create-client-input';
import { updateInputData } from '~/utils/form/update-input-form';
import FormError, {
  type FormErrorMessageList,
} from '~/app/_components/form/form-error';
import formatPhoneString, {
  handlePhoneChange,
} from '~/utils/formatPhoneString';
import Input from '~/app/_components/input';
import StyledFormLabel from '~/app/_components/form/styled-form-label';
import StyledFormWrapper from '~/app/_components/form/style-form-wrapper';
import type { HandleInputChangeArgs } from '../create-unity-form/create-unity-form';

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

  const checkRequiredFieldsOnDataChange = useCallback(() => {
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

  function updateClientInputField({
    event,
    field,
  }: HandleInputChangeArgs<CreateClientWithAdminDtoWithoutAdmin>) {
    let value = event.target.value;

    if (field === 'phone') {
      value = handlePhoneChange(value, phoneInputRef);
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
      checkRequiredFieldsOnDataChange();
    },
    [props.inputData, checkRequiredFieldsOnDataChange],
  );

  return (
    <>
      <Form.Field name="name" className="flex flex-col gap-2">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Business Name</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="text"
                className="flex w-full"
                onChange={(event) =>
                  updateClientInputField({ event, field: 'name' })
                }
                required
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="name" errorList={clientFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="cnpj" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>CNPJ</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="text"
                className="flex w-full"
                onChange={(event) =>
                  updateClientInputField({ event, field: 'cnpj' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="cnpj" errorList={clientFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="address" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Address</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="text"
                className="flex w-full"
                onChange={(event) =>
                  updateClientInputField({ event, field: 'address' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="address" errorList={clientFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="phone" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Phone</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="text"
                className="flex w-full"
                ref={phoneInputRef}
                onChange={(event) =>
                  updateClientInputField({ event, field: 'phone' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="phone" errorList={clientFormErrorMessageList} />
      </Form.Field>
    </>
  );
}
