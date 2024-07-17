import { RegisterOptions, ControllerProps } from 'react-hook-form';
import { EMAIL_REGEX, PHONE_REGEX, SYMBOLS_REGEX } from './StringUtils';

export const EMAIL_VALIDATIONS: Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
> = {
  pattern: {
    value: EMAIL_REGEX,
    message: 'Please enter a valid email address',
  },
};

export const PHONE_NUMBER_VALIDATIONS: Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
> = {
  pattern: {
    value: PHONE_REGEX,
    message: 'Please enter a valid phone number',
  },
};

type Validation = ControllerProps['rules'];

export const PASSWORD_VALIDATIONS: Validation = {
  minLength: {
    value: 8,
    message: 'Password must have a minimum of 8 characters',
  },
  maxLength: {
    value: 24,
    message: 'Password must have a maximum of 24 characters',
  },
  required: 'Password is required',
  validate: (value: string) => {
    if (/[\s]/.test(value)) {
      return 'Password cannot contain any spaces';
    }

    const errors = [];
    if (!/[a-z]/.test(value)) {
      errors.push('1 lower-case character');
    }

    if (!/[A-Z]/.test(value)) {
      errors.push('1 upper-case character');
    }

    if (!/[0-9]/.test(value)) {
      errors.push('1 digit');
    }

    if (!SYMBOLS_REGEX.test(value)) {
      errors.push('1 symbol');
    }

    if (errors.length === 0) {
      return undefined;
    }

    return `Password must contain at least: ${errors.join(', ')}`;
  },
};
