const PASSWORD_REGEX_PATTERNS = {
  UPPERCASE: /[A-Z]/, // At least one uppercase letter
  LOWERCASE: /[a-z]/, // At least one lowercase letter
  NUMBER: /[0-9]/, // At least one number
  SPECIAL_CHAR: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, // Special characters
};

const MIN_LENGTH = 16;
const MAX_LENGTH = 125;

interface ValidateResult {
  isValid: boolean;
  message: string;
}

// Steps broken down for easier maintenance
export default function validatePassword(
  passwordString: string,
): ValidateResult {
  if (passwordString.length < MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${MIN_LENGTH} long`,
    };
  }

  if (passwordString.length > MAX_LENGTH) {
    return {
      isValid: false,
      message: `Password must be ${MAX_LENGTH} long`,
    };
  }

  if (!PASSWORD_REGEX_PATTERNS.UPPERCASE.test(passwordString)) {
    return {
      isValid: false,
      message: `Password must contain at least one Uppercase character`,
    };
  }

  if (!PASSWORD_REGEX_PATTERNS.LOWERCASE.test(passwordString)) {
    return {
      isValid: false,
      message: `Password must contain at least one Lowercase character`,
    };
  }

  if (!PASSWORD_REGEX_PATTERNS.NUMBER.test(passwordString)) {
    return {
      isValid: false,
      message: `Password must contain at least one number`,
    };
  }

  if (!PASSWORD_REGEX_PATTERNS.SPECIAL_CHAR.test(passwordString)) {
    return {
      isValid: false,
      message: `Password must contain at least special character`,
    };
  }

  return { isValid: true, message: "" };
}
