import type { Dispatch, SetStateAction } from "react";
import type { ValidationOptions } from "~/configs/create-client-input";
import validateString from "~/utils/validateString";
import addErrorToQueue from "./add-error-to-queue";

interface UpdateInputDataArgs<InputGroupType> {
  data: string;
  dataField: keyof InputGroupType;
  validationConfigObject: ValidationOptions<InputGroupType>[keyof InputGroupType];
  errorList: Array<[string, string]>;
  onError: Dispatch<SetStateAction<Array<[string, string]>>>;
}

export function updateInputData<T>(
  args: UpdateInputDataArgs<T>,
): string | null {
  const { data, dataField, validationConfigObject, errorList, onError } = args;

  const stringifiedDataField = String(dataField);

  const fieldValidationResult = validateString({
    string: data || "",
    options: {
      fieldName: stringifiedDataField,
      ...validationConfigObject,
    },
  });

  if (!fieldValidationResult.isValid) {
    addErrorToQueue(
      [stringifiedDataField, fieldValidationResult.message],
      onError,
    );
    return null;
  }

  // Assuming field is valid we could check and remove in there was any error related to this field
  let hasFieldError = false;
  for (const error of errorList) {
    if (error[0] === stringifiedDataField) {
      hasFieldError = true;
    }
  }

  if (hasFieldError) {
    const newErrorList = errorList.filter(
      (errorItem) => errorItem[0] !== stringifiedDataField,
    );

    onError(newErrorList);
  }

  return data;
}
