import * as Form from '@radix-ui/react-form';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import Input from '~/app/_components/input';
import StyledFormWrapper from '~/app/_components/form/style-form-wrapper';
import StyledFormLabel from '~/app/_components/form/styled-form-label';
import type { CreateUnityDto } from '~/app/api/generated/model';
import FormError, {
  type FormErrorMessageList,
} from '~/app/_components/form/form-error';
import type { HandleInputChangeArgs } from './create-unity-form';
import { handlePhoneChange } from '~/utils/formatPhoneString';
import { updateInputData } from '~/utils/form/update-input-form';
import { VALIDATION_OPTIONS_FOR_CREATE_UNITY } from '~/configs/create-unity-input';

interface UnityFormFieldSectionProps {
  inputData: CreateUnityWithoutClientIdDto | null;
  updateInputData: Dispatch<
    SetStateAction<CreateUnityWithoutClientIdDto | null>
  >;
  onIsRequiredFieldsOk?: () => void;
  onIsRequiredFieldsFailed: () => void;
}

export type CreateUnityWithoutClientIdDto = Omit<CreateUnityDto, 'clientId'>;

export function UnityFormField(props: UnityFormFieldSectionProps) {
  const [unityFormErrorMessageList, setUnityFormErrorMessageList] =
    useState<FormErrorMessageList>([]);

  const phoneInputRef = useRef<HTMLInputElement>(null);

  const checkRequiredFieldsOnDataChange = useCallback(() => {
    if (!props.inputData?.name) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    const hasError = unityFormErrorMessageList.length;

    if (hasError) {
      props.onIsRequiredFieldsFailed?.();
      return;
    }

    props.onIsRequiredFieldsOk?.();
  }, [props, unityFormErrorMessageList]);

  function updateUnityInputField({
    event,
    field,
  }: HandleInputChangeArgs<CreateUnityWithoutClientIdDto>) {
    let value = event.target.value;

    if (field === 'phone') {
      value = handlePhoneChange(value, phoneInputRef);
    }

    const validatedData = updateInputData<CreateUnityWithoutClientIdDto>({
      data: value,
      dataField: field,
      validationConfigObject: VALIDATION_OPTIONS_FOR_CREATE_UNITY[field],
      errorList: unityFormErrorMessageList,
      onError: setUnityFormErrorMessageList as unknown as (
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
          [field]: validatedData,
        };
      }

      return {
        name: '',
        address: '',
        phone: '',
        [field]: validatedData,
      };
    });
  }

  useEffect(
    function checkInputDataChangeEffect() {
      checkRequiredFieldsOnDataChange();
    },
    [props.inputData],
  );

  return (
    <>
      <Form.Field name="name" className="flex flex-col gap-2">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Unity Name</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="text"
                className="flex w-full"
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'name' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="name" errorList={unityFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="address" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Address</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="address"
                className="flex w-full"
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'address' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="address" errorList={unityFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="phone" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Phone</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="phone"
                ref={phoneInputRef}
                className="flex w-full"
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'phone' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="phone" errorList={unityFormErrorMessageList} />
      </Form.Field>
    </>
  );
}
