export const NAME_MAX_LENGTH = 40;

const nameErrorCodes = {
  required: "GREETING_NAME_REQUIRED",
  tooLong: "GREETING_NAME_TOO_LONG",
} as const;

export type NameErrorCode =
  (typeof nameErrorCodes)[keyof typeof nameErrorCodes];

export class InvalidNameError extends Error {
  readonly code: NameErrorCode;

  constructor(code: NameErrorCode) {
    super(code);
    this.name = "InvalidNameError";
    this.code = code;
  }
}

export type Name = {
  readonly value: string;
};

export function parseName(input: string): Name {
  const value = input.trim();
  if (value.length === 0) {
    throw new InvalidNameError(nameErrorCodes.required);
  }
  if (value.length > NAME_MAX_LENGTH) {
    throw new InvalidNameError(nameErrorCodes.tooLong);
  }
  return { value };
}
