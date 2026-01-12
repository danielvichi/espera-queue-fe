import * as Form from '@radix-ui/react-form';
import { useEffect, useState, type ChangeEvent } from 'react';
import Button from '~/app/_components/button';
import FormError, {
  type FormErrorMessageList,
} from '~/app/_components/form/form-error';
import addErrorToQueue from '~/utils/form/add-error-to-queue';
import Input from '~/app/_components/input';
import { VALIDATION_OPTIONS_FOR_ADMIN_LOGIN } from '~/configs/create-client-input';
import validateString from '~/utils/validateString';

type LoginCredentials = {
  email: string;
  passwordHash: string;
};

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (authCredentials: LoginCredentials) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState<string | null>(null);
  const [passwordString, setPasswordString] = useState<string | null>(null);
  const [formErrorMessageList, setFormErrorMessageList] =
    useState<FormErrorMessageList>([]);
  const [isAllValid, setIsAllValid] = useState<boolean>(false);

  function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const value = event.currentTarget.value;

    const validationResult = validateString({
      string: value,
      options: {
        fieldName: 'email',
        ...VALIDATION_OPTIONS_FOR_ADMIN_LOGIN.email,
      },
    });

    if (!validationResult.isValid) {
      addErrorToQueue(
        ['email', validationResult.message],
        setFormErrorMessageList,
      );
      return;
    }

    const filteredPreviousErrors = formErrorMessageList.filter(
      (errorItem) => errorItem[0] !== 'email',
    );
    setFormErrorMessageList(filteredPreviousErrors);
    setEmail(value);
  }

  function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const value = event.currentTarget.value;

    setPasswordString(value);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!email || !passwordString || formErrorMessageList.length > 0) {
      return;
    }

    // TODO HASH the passwordString
    const passwordHash = passwordString;

    props.onSubmit({
      email,
      passwordHash,
    });
  }

  useEffect(
    function checkLoginFormIsAllValidEffect() {
      if (!email || !passwordString || formErrorMessageList.length > 0) {
        setIsAllValid(false);
        return;
      }

      setIsAllValid(true);
    },
    [formErrorMessageList, email, passwordString],
  );

  return (
    <Form.Root className="flex flex-col gap-4">
      <Form.Field name="email" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label className="w-full">Email</Form.Label>

          <Form.Control asChild>
            <Input
              disabled={props.isLoading}
              type="text"
              onBlur={handleEmailInputChange}
            />
          </Form.Control>
        </div>
        <FormError errorType="email" errorList={formErrorMessageList} />
      </Form.Field>

      <Form.Field name="password" className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Form.Label className="w-full">Password</Form.Label>

          <Form.Control asChild>
            <Input
              disabled={props.isLoading}
              type="text"
              onChange={handlePasswordInputChange}
            />
          </Form.Control>
        </div>
        <FormError errorType="password" errorList={formErrorMessageList} />
      </Form.Field>

      {props.isLoading ? (
        'Loading'
      ) : (
        <Button
          isLoading={props.isLoading}
          disabled={!isAllValid}
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      )}
    </Form.Root>
  );
}
