import type { CreateUnityWithoutClientIdDto } from '~/app/_modules/create-unity-form/unity-form-field';
import type { ValidateOptions } from '~/utils/validateString';
import { PHONE_PATTERN_REGEX } from './regex';

const MAX_UNITY_NAME_CHAR_LENGTH = 254;

export type ValidationOptions<Type> = Record<
  keyof Type,
  Omit<ValidateOptions, 'fieldName'>
>;

export const VALIDATION_OPTIONS_FOR_CREATE_UNITY: ValidationOptions<CreateUnityWithoutClientIdDto> =
  {
    address: {
      allowSpecialChars: true,
      minLength: 10,
      required: false,
    },
    name: {
      allowSpecialChars: false,
      minLength: 3,
      maxLength: MAX_UNITY_NAME_CHAR_LENGTH,
      required: true,
    },
    phone: {
      allowSpecialChars: true,
      minLength: 10,
      maxLength: 14,
      required: false,
      pattern: PHONE_PATTERN_REGEX,
    },
  };
