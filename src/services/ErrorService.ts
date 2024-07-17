import { ErrorCode } from '../types';
import Logger from '../utils/Logger';
import { isAxiosError } from '../utils/TypeUtils';

class ErrorService {
  static getErrorCode(error: any): ErrorCode {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        return ErrorCode.UNAUTHORIZED;
      }

      if (status === 403) {
        return ErrorCode.FORBIDDEN;
      }

      if (status === 404) {
        return ErrorCode.NOT_FOUND;
      }
    }

    return ErrorCode.SERVER_ERROR;
  }

  public static notify(message: string, error: Error): void {
    Logger.debug(message, error);
  }
}

export default ErrorService;
