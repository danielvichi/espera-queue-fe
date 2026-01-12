import * as Form from '@radix-ui/react-form';

export type FormErrorMessageList = Array<[string, string]>;

interface FormErrorProps {
  errorType: string;
  errorList: FormErrorMessageList;
}

export default function FormError(props: FormErrorProps) {
  const { errorList, errorType } = props;

  if (errorList.length <= 0) {
    return null;
  }

  for (const error of errorList) {
    if (error[0] === errorType) {
      return (
        <Form.Message className="pl-0 md:pl-[170px] text-[10pt] first-letter:capitalize">
          {`${error[1]}`}
        </Form.Message>
      );
    }
  }
}
