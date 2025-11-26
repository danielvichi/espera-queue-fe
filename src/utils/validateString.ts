export interface ValidateOptions {
  fieldName: string;
  minLength?: number;
  maxLength?: number;
  allowSpecialChars?: boolean;
  required?: boolean;
  pattern?: RegExp;
  customFailMessage?: string;
}

interface ValidateArgs {
  string: string;
  options?: ValidateOptions;
}

interface ValidateResult {
  isValid: boolean;
  message: string;
}

const validateString = (data: ValidateArgs): ValidateResult => {
  const { string, options } = data;

  const {
    fieldName,
    minLength = 0,
    maxLength,
    required = false,
    allowSpecialChars = false,
    pattern,
    customFailMessage,
  } = options ?? {};

  // Convert value to string for length checks
  const stringValue = String(string).trim();

  // Check if required field is empty
  if (required && stringValue === "") {
    return {
      isValid: false,
      message: customFailMessage ?? `${fieldName} is required`,
    };
  }

  // Escape validation if is not required and it is empty
  if (!required && stringValue === "") {
    return {
      isValid: true,
      message: "",
    };
  }

  if (minLength && stringValue.length < minLength) {
    return {
      isValid: false,
      message:
        customFailMessage ??
        `${fieldName} must be at least ${minLength} characters long`,
    };
  }

  if (maxLength && stringValue.length > maxLength) {
    return {
      isValid: false,
      message:
        customFailMessage ??
        `${fieldName} must not be longer than ${maxLength} characters`,
    };
  }

  if (!allowSpecialChars) {
    const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharsRegex.test(stringValue))
      return {
        isValid: false,
        message:
          customFailMessage ??
          `${fieldName} must not contains special characters`,
      };
  }

  // Custom regex validation
  if (pattern && !pattern.test(stringValue)) {
    return {
      isValid: false,
      message: customFailMessage ?? `${fieldName} format is invalid`,
    };
  }

  return { isValid: true, message: "" };
};

export default validateString;
