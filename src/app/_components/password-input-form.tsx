import * as Form from '@radix-ui/react-form';
import { useRef, useState } from 'react';
import type { FormErrorMessageList } from '../_modules/create-client-form/create-client-form';
import validatePassword from '~/utils/validatePassword';
import addErrorToQueue, {
  removeAllFieldError,
} from '../_modules/create-client-form/utils/add-error-to-queue';
import FormError from '../_modules/create-client-form/form-error';

interface PasswordInputFormProps {
  onCheckSuccess: (passwordString: string) => void;
  onCheckFail?: () => void;
}

export function PasswordInputForm(props: PasswordInputFormProps) {
  const [passwordFormErrorMessageList, setPasswordFormErrorMessageList] =
    useState<FormErrorMessageList>([]);

  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordConfirmInput = useRef<HTMLInputElement>(null);

  function handlePasswordOnBlur() {
    const passwordInputValue = passwordInput.current?.value;
    const passwordConfirmationInputValue = passwordConfirmInput.current?.value;

    if (!passwordInputValue) {
      return;
    }

    const validationResult = validatePassword(passwordInputValue);

    if (!validationResult.isValid) {
      props.onCheckFail?.();
      removeAllFieldError(
        'password',
        passwordFormErrorMessageList,
        setPasswordFormErrorMessageList,
      );
      addErrorToQueue(
        ['password', validationResult.message],
        setPasswordFormErrorMessageList,
      );
      return;
    } else {
      removeAllFieldError(
        'password',
        passwordFormErrorMessageList,
        setPasswordFormErrorMessageList,
      );
    }

    if (!passwordConfirmationInputValue) {
      return;
    }

    const passwordMatch = passwordInputValue === passwordConfirmationInputValue;

    if (!passwordMatch) {
      props.onCheckFail?.();
      addErrorToQueue(
        ['password', 'Password does not match'],
        setPasswordFormErrorMessageList,
      );
      return;
    } else {
      removeAllFieldError(
        'password',
        passwordFormErrorMessageList,
        setPasswordFormErrorMessageList,
      );
    }

    props.onCheckSuccess(passwordInputValue);
  }

  return (
    <>
      <Form.Field name="password" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>Password</Form.Label>

          <Form.Control asChild>
            <input
              type="password"
              ref={passwordInput}
              onBlur={handlePasswordOnBlur}
            />
          </Form.Control>
        </div>
      </Form.Field>

      <Form.Field name="confirmPassword" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label>Confirm password</Form.Label>

          <Form.Control asChild>
            <input
              type="confirmPassword"
              ref={passwordConfirmInput}
              onBlur={handlePasswordOnBlur}
            />
          </Form.Control>
        </div>
        <FormError
          errorType="password"
          errorList={passwordFormErrorMessageList}
        />
      </Form.Field>
    </>
  );
}
