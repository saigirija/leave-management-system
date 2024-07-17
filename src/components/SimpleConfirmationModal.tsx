import {
  DeleteOutline,
  HighlightOff,
  VerticalAlignTop,
} from '@mui/icons-material';
import SuccessIcon from '@mui/icons-material/Check';
import DangerIcon from '@mui/icons-material/DeleteOutline';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import classNames from 'classnames';
import React from 'react';
import { EnumMap } from '../types';
import Button, { ButtonVariant } from './Button';

export type ModalVariantType =
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'danger'
  | 'upload'
  | 'cancel'
  | 'close';

export type ModalSizeVariantType = 'default' | 'small' | 'medium' | 'large';

interface SimpleConfirmationModalProps {
  variant: ModalVariantType;
  title?: string;
  isOpen: boolean;
  subtitle?: string;
  hideIcon?: boolean;
  size?: ModalSizeVariantType;
  onClose(): void;
  customIcon?: React.ReactElement;
  onConfirm?(): void;
  isSubmitting: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  hideBottomButtons?: boolean;
  hideCancelButton?: boolean;
  children: React.ReactNode;
}

const SimpleConfirmationModal: React.FC<SimpleConfirmationModalProps> = ({
  variant,
  title,
  isOpen,
  subtitle,
  onClose,
  hideIcon = false,
  size = 'default',
  onConfirm,
  isSubmitting,
  customIcon,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  hideBottomButtons = false,
  hideCancelButton = false,
  children,
}) => {
  const classMapStyle: EnumMap<ModalVariantType, string> = {
    error: 'bg-danger text-danger',
    info: 'bg-primary text-primary',
    success: 'bg-success text-success',
    warning: 'bg-warning text-warning',
    danger: 'bg-danger text-danger',
    upload: 'bg-primary text-primary',
    cancel: 'bg-danger text-danger',
    close: 'bg-danger text-danger',
  };

  const IconComponent: EnumMap<ModalVariantType, React.ReactElement> = {
    error: <ErrorIcon fontSize='small' />,
    info: <InfoIcon fontSize='small' />,
    success: <SuccessIcon fontSize='small' />,
    warning: <WarningIcon fontSize='small' />,
    danger: <DangerIcon fontSize='small' />,
    upload: <VerticalAlignTop fontSize='small' />,
    cancel: <DeleteOutline fontSize='small' />,
    close: <HighlightOff fontSize='small' />,
  };

  const sizeVariant: EnumMap<ModalSizeVariantType, string> = {
    default: 'md:w-1/2 lg:w-1/4',
    large: 'md:w-3/5 lg:w-1/3',
    small: 'md:w-2/5 lg:w-1/5',
    medium: 'md:w-5/12 lg:w-4/12',
  };

  const modalVariantToButtonVariantMap: EnumMap<
    ModalVariantType,
    ButtonVariant
  > = {
    info: 'primary',
    success: 'success',
    warning: 'secondary',
    upload: 'primary',
    cancel: 'danger',
    close: 'danger',
    danger: 'danger',
    error: 'danger',
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full-window'>
      <div
        className='absolute top-0 bottom-0 left-0 right-0 z-0 block bg-black bg-opacity-40'
        role='button'
        onClick={onClose}
      />
      <div className='flex items-center justify-center w-full h-full px-4 py-6 lg:p-0'>
        <div
          className={classNames(
            'w-full bg-white rounded-xl shadow-web p-4 z-10',
            sizeVariant[size]
          )}
        >
          <div
            className={classNames('flex items-start', {
              'justify-center': hideIcon,
            })}
          >
            {customIcon ? (
              <div className='mr-3'>
                <div
                  className={classNames(
                    'flex justify-center items-center w-10 h-10 p-1 bg-opacity-20 rounded-full',
                    classMapStyle[variant]
                  )}
                >
                  {customIcon}
                </div>
              </div>
            ) : (
              !hideIcon && (
                <div className='mr-3'>
                  <div
                    className={classNames(
                      'flex justify-center items-center w-10 h-10 bg-opacity-20 rounded-full p-1',
                      classMapStyle[variant]
                    )}
                  >
                    {IconComponent[variant]}
                  </div>
                </div>
              )
            )}
            <div className='w-full py-2'>
              {title && (
                <p className='font-body font-bold text-dark-9 text-base text-center'>
                  {title}
                </p>
              )}
              {subtitle && (
                <p className='text-base text-gray-500 font-primary-regular py-2'>
                  {subtitle}
                </p>
              )}
              {children}
              {!hideBottomButtons && (
                <div className='flex flex-row mt-6 space-x-3 px-4'>
                  {!hideCancelButton && (
                    <Button
                      label={cancelButtonText}
                      variant='primary-outline'
                      onClick={onClose}
                      className='w-full'
                    />
                  )}
                  <Button
                    label={confirmButtonText}
                    variant={modalVariantToButtonVariantMap[variant]}
                    onClick={onConfirm}
                    isDisabled={isSubmitting}
                    isSubmitting={isSubmitting}
                    className='w-full'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleConfirmationModal;
