import Route404 from '../screens/Route404';
import { ErrorCode } from '../types';
import { getErrorMessage } from '../utils/ErrorUtils';
import DefaultEmpty from './DefaultEmpty';
import DefaultError from './DefaultError';
import DefaultLoader from './DefaultLoader';

export interface ResourceContainerProps {
  loading: boolean;
  LoaderComponent?: React.ReactElement;
  isEmpty: boolean;
  resourceName: string;
  emptyMessage?: string;
  emptyIcon?: React.ReactElement;
  EmptyComponent?: React.ReactElement;
  ServerErrorComponent?: React.ReactElement;
  errorCode?: null | ErrorCode;
  children: React.ReactNode;
}

const ResourceContainer: React.FC<ResourceContainerProps> = ({
  loading,
  LoaderComponent,
  isEmpty,
  resourceName,
  emptyMessage,
  emptyIcon,
  EmptyComponent,
  errorCode,
  ServerErrorComponent,
  children,
}) => {
  const finalEmptyMessage =
    emptyMessage || `There are no ${resourceName.toLowerCase()}s to display.`;

  if (errorCode === ErrorCode.NOT_FOUND) {
    return <Route404 />;
  }

  if (errorCode === ErrorCode.UNAUTHORIZED) {
    return (
      <DefaultError
        message={getErrorMessage(ErrorCode.UNAUTHORIZED, resourceName)}
      />
    );
  }

  if (errorCode === ErrorCode.FORBIDDEN) {
    return (
      <DefaultError
        message={getErrorMessage(ErrorCode.FORBIDDEN, resourceName)}
      />
    );
  }

  if (errorCode === ErrorCode.SERVER_ERROR) {
    return (
      ServerErrorComponent || (
        <DefaultError message={getErrorMessage(ErrorCode.SERVER_ERROR)} />
      )
    );
  }

  if (loading) {
    return LoaderComponent || <DefaultLoader />;
  }

  if (isEmpty) {
    return (
      EmptyComponent || (
        <DefaultEmpty message={finalEmptyMessage} icon={emptyIcon} />
      )
    );
  }

  return <div>{children}</div>;
};

export default ResourceContainer;
