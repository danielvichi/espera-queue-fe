import type { CreateClientWithAdminDto } from "~/app/api/generated/model";
import type { ValidateOptions } from "~/utils/validateString";

const MAX_NAME_CHAR_LENGTH = 254;

export type ValidationOptions<Type> = Record<
  keyof Type,
  Omit<ValidateOptions, "fieldName">
>;

type CreateClientWithAdminDtoWithoutAdmin = Omit<
  CreateClientWithAdminDto,
  "admin"
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const VALIDATION_OPTIONS_FOR_CREATE_CLIENT: ValidationOptions<CreateClientWithAdminDtoWithoutAdmin> =
  {
    address: {
      allowSpecialChars: true,
      minLength: 10,
      required: false,
    },
    name: {
      allowSpecialChars: false,
      minLength: 3,
      maxLength: MAX_NAME_CHAR_LENGTH,
      required: true,
    },
    cnpj: {
      allowSpecialChars: false,
      minLength: 14,
      maxLength: 14,
      required: false,
    },
    phone: {
      allowSpecialChars: true,
      minLength: 10,
      maxLength: 14,
      required: false,
      pattern: /^\(\d{2}\)\d{5}-\d{4}$/,
    },
  };

type CreateClientAdminWithoutPassword = Omit<
  CreateClientWithAdminDto["admin"],
  "passwordHash"
>;

export const VALIDATION_OPTIONS_FOR_CREATE_CLIENT_ADMIN: ValidationOptions<CreateClientAdminWithoutPassword> =
  {
    email: {
      allowSpecialChars: true,
      minLength: 6,
      maxLength: 254,
      required: true,
      pattern: EMAIL_PATTERN,
    },
    name: {
      allowSpecialChars: false,
      minLength: 3,
      maxLength: MAX_NAME_CHAR_LENGTH,
      required: true,
    },
  };

export const VALIDATION_OPTIONS_FOR_ADMIN_LOGIN: ValidationOptions<{
  email: string;
}> = {
  email: {
    allowSpecialChars: true,
    minLength: 6,
    maxLength: 254,
    required: true,
    pattern: EMAIL_PATTERN,
  },
};
