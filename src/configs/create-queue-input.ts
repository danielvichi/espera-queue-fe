import type { ValidateOptions } from '~/utils/validateString';
import type { InputCreateQueueDto } from '~/app/api/generated/model';
import { NUMBER_ONLY_REGEX, TIME_PATTERN_REGEX } from './regex';

const MAX_UNITY_NAME_CHAR_LENGTH = 254;

export type InputCreateQueueWithoutUnityIdAndAdminIdDto = Omit<
  InputCreateQueueDto,
  'unityId' | 'adminId'
>;

export type ValidationOptions<Type> = Record<
  keyof Type,
  Omit<ValidateOptions, 'fieldName'>
>;

export const VALIDATION_OPTIONS_FOR_CREATE_QUEUE: ValidationOptions<InputCreateQueueWithoutUnityIdAndAdminIdDto> =
  {
    name: {
      allowSpecialChars: false,
      minLength: 3,
      maxLength: MAX_UNITY_NAME_CHAR_LENGTH,
      required: false,
    },
    type: {
      required: true,
    },
    maxUsersInQueue: {
      required: false,
      maxLength: 4,
      pattern: NUMBER_ONLY_REGEX,
    },
    startQueueAt: {
      allowSpecialChars: true,
      required: false,
      pattern: TIME_PATTERN_REGEX,
    },
    endQueueAt: {
      allowSpecialChars: true,
      required: false,
      pattern: TIME_PATTERN_REGEX,
    },
  };
