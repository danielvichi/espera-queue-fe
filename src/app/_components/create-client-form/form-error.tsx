import * as Form from "@radix-ui/react-form";
import type { FormErrorMessageList } from "./create-client-form";

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
        <Form.Message className="text-[10pt] first-letter:capitalize">
          {`${error[1]}`}
        </Form.Message>
      );
    }
  }
}
