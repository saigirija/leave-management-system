import {
  DEFAULT_404_MESSAGE,
  DEFAULT_FORBIDDEN_MESSAGE,
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_UNAUTHORIZED_MESSAGE,
} from '../constants/ErrorsContants';
import { ErrorCode } from '../types';

export const getErrorMessage = (
  errorCode: ErrorCode,
  resourceName?: string
) => {
  if (errorCode === ErrorCode.UNAUTHORIZED) {
    return `${DEFAULT_UNAUTHORIZED_MESSAGE} ${resourceName}.`;
  }

  if (errorCode === ErrorCode.FORBIDDEN) {
    return `${DEFAULT_FORBIDDEN_MESSAGE} ${resourceName}.`;
  }

  if (errorCode === ErrorCode.NOT_FOUND) {
    return DEFAULT_404_MESSAGE;
  }

  return DEFAULT_SERVER_ERROR_MESSAGE;
};
