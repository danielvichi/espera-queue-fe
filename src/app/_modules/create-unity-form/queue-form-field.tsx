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

import FormError, {
  type FormErrorMessageList,
} from '~/app/_components/form/form-error';
import type { HandleInputChangeArgs } from './create-unity-form';
import { updateInputData } from '~/utils/form/update-input-form';
import {
  VALIDATION_OPTIONS_FOR_CREATE_QUEUE,
  type InputCreateQueueWithoutUnityIdAndAdminIdDto,
} from '~/configs/create-queue-input';
import {
  InputCreateQueueDtoType,
  QueueDtoType,
} from '~/app/api/generated/model';
import filterOnlyNumber from '~/utils/validateNumber';
import { QueueTypeSelect } from './components/queue-type-select';

interface QueueFormFieldSectionProps {
  inputData: InputCreateQueueWithoutUnityIdAndAdminIdDto | null;
  updateInputData: Dispatch<
    SetStateAction<InputCreateQueueWithoutUnityIdAndAdminIdDto | null>
  >;
  onIsRequiredFieldsOk?: () => void;
  onIsRequiredFieldsFailed: () => void;
}

export function QueueFormField(props: QueueFormFieldSectionProps) {
  const [unityFormErrorMessageList, setUnityFormErrorMessageList] =
    useState<FormErrorMessageList>([]);

  const maxUserRef = useRef<HTMLInputElement>(null);
  const startQueueAtRef = useRef<HTMLInputElement>(null);
  const endQueueAtRef = useRef<HTMLInputElement>(null);

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
  }: HandleInputChangeArgs<InputCreateQueueWithoutUnityIdAndAdminIdDto>) {
    let value: string | number = event.target.value;

    console.log('field', field, 'value', value);

    if (field === 'maxUsersInQueue') {
      value = filterOnlyNumber(value);

      if (maxUserRef.current) {
        maxUserRef.current.valueAsNumber = value;
      }
    }

    const validatedData =
      updateInputData<InputCreateQueueWithoutUnityIdAndAdminIdDto>({
        data: value,
        dataField: field,
        validationConfigObject: VALIDATION_OPTIONS_FOR_CREATE_QUEUE[field],
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
        type: InputCreateQueueDtoType.GENERAL,
        name: '',
        startQueueAt: '',
        endQueueAt: '',
        maxUsersInQueue: 0,
        [field]: validatedData,
      };
    });
  }

  const queueTypeOptions = Object.values(QueueDtoType);

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
            <StyledFormLabel>Queue Name</StyledFormLabel>

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

      <Form.Field name="type" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Type</StyledFormLabel>

            <Form.Control asChild>
              {/* <Input
                type="type"
                datatype="number"
                className="flex w-full"
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'type' })
                }
              /> */}
              <QueueTypeSelect
                className="flex w-full"
                options={queueTypeOptions}
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'type' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError errorType="type" errorList={unityFormErrorMessageList} />
      </Form.Field>

      <Form.Field name="maxUsersInQueue" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Line size limit</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="number"
                ref={maxUserRef}
                className="flex w-full"
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'maxUsersInQueue' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError
          errorType="maxUsersInQueue"
          errorList={unityFormErrorMessageList}
        />
      </Form.Field>

      <Form.Field name="startQueueAt" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Start Time</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="startQueueAt"
                ref={startQueueAtRef}
                className="flex w-full"
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'startQueueAt' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError
          errorType="startQueueAt"
          errorList={unityFormErrorMessageList}
        />
      </Form.Field>

      <Form.Field name="endQueueAt" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>End Time</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="endQueueAt"
                ref={endQueueAtRef}
                className="flex w-full"
                onChange={(event) =>
                  updateUnityInputField({ event, field: 'endQueueAt' })
                }
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError
          errorType="endQueueAt"
          errorList={unityFormErrorMessageList}
        />
      </Form.Field>
    </>
  );
}
