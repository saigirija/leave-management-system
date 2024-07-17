import CachedIcon from '@mui/icons-material/Cached';
import classNames from 'classnames';
import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'primary-no-outline'
  | 'secondary'
  | 'secondary-outline'
  | 'danger'
  | 'danger-outline'
  | 'success'
  | 'success-outline';

export type ButtonType = 'submit' | 'reset' | 'button' | undefined;

export interface ButtonProps {
  variant?: ButtonVariant;
  label: string;
  onClick?: () => void;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  type?: ButtonType;
  className?: string | undefined;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  label,
  onClick,
  leftIcon,
  rightIcon,
  isDisabled = false,
  isSubmitting = false,
  type = 'button',
  className,
}) => {
  const buttonVariantToClassNameMap: Record<ButtonVariant, string> = {
    primary: 'ring-2 ring-primary bg-primary text-white',
    'primary-outline': 'ring-2 ring-primary bg-white text-primary',
    'primary-no-outline': 'ring-0 ring-white bg-white text-primary',
    secondary: 'ring-2 ring-dark-9 bg-dark-9 text-white',
    'secondary-outline': 'ring-2 ring-dark-9 bg-transparent text-dark-9',
    danger: 'ring-2 ring-danger bg-danger text-white',
    'danger-outline': 'ring-2 ring-danger bg-transparent text-danger',
    success: 'ring-2 ring-success bg-success text-white',
    'success-outline': 'ring-2 ring-success bg-white text-success',
  };

  const Loader = <CachedIcon className='animate-spin' />;
  const RightIcon = !!rightIcon && (isSubmitting ? Loader : rightIcon);
  const LeftIcon = !!leftIcon
    ? isSubmitting
      ? Loader
      : leftIcon
    : !RightIcon && isSubmitting && Loader;

  const disabled = isDisabled || isSubmitting;

  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(
        'font-sans appearance-none rounded-lg text-lg font-medium leading-[18px] space-x-1.5 flex flex-row flex-no-wrap items-center justify-center py-2.5 px-4 min-w-165',
        disabled
          ? 'ring-2 ring-dark-4 bg-dark-4 text-white'
          : buttonVariantToClassNameMap[variant],
        className
      )}
      onClick={onClick}
    >
      {LeftIcon}
      <span>{label}</span>
      {RightIcon}
    </button>
  );
};

export default Button;
