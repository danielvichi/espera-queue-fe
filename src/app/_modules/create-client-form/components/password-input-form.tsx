import * as Form from '@radix-ui/react-form';
import { useRef, useState } from 'react';
import validatePassword from '~/utils/validatePassword';
import addErrorToQueue, {
  removeAllFieldError,
} from '~/utils/form/add-error-to-queue';
import FormError, {
  type FormErrorMessageList,
} from '~/app/_components/form/form-error';
import StyledFormLabel from '~/app/_components/form/styled-form-label';
import StyledFormWrapper from '~/app/_components/form/style-form-wrapper';
import Input from '~/app/_components/input';

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
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Password</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="password"
                className="flex w-full"
                ref={passwordInput}
                onBlur={handlePasswordOnBlur}
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
      </Form.Field>

      <Form.Field name="confirmPassword" className="flex flex-col gap-1">
        <StyledFormWrapper>
          <>
            <StyledFormLabel>Confirm password</StyledFormLabel>

            <Form.Control asChild>
              <Input
                type="confirmPassword"
                className="flex w-full"
                ref={passwordConfirmInput}
                onBlur={handlePasswordOnBlur}
              />
            </Form.Control>
          </>
        </StyledFormWrapper>
        <FormError
          errorType="password"
          errorList={passwordFormErrorMessageList}
        />
      </Form.Field>
    </>
  );
}
