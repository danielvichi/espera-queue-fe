import type { Dispatch, SetStateAction } from "react";

export default function addErrorToQueue(
  error: [string, string],
  setError: Dispatch<SetStateAction<Array<[string, string]>>>,
) {
  setError((previousErrorState) => {
    const alreadyHasError = previousErrorState.find(
      (previousErrorItem) =>
        previousErrorItem[0] === error[0] && previousErrorItem[1] === error[1],
    );

    if (!alreadyHasError) {
      return [...previousErrorState, error];
    }

    return previousErrorState;
  });
}

export function removeAllFieldError(
  field: string,
  errorList: Array<[string, string]>,
  setError: Dispatch<SetStateAction<Array<[string, string]>>>,
) {
  const filteredErrorList = errorList.filter(
    (errorItem) => errorItem[0] !== field,
  );

  setError(filteredErrorList);
}
