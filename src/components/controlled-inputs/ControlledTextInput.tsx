import classNames from 'classnames';
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import React, { useState } from 'react';
import FormErrorMessage from './FormErrorMessage';

export type ControlledTextInputType =
  | 'text'
  | 'email'
  | 'number'
  | 'hidden'
  | 'date'
  | 'datetime-local'
  | 'image'
  | 'month'
  | 'password'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week';

export type ControlledTextInputModeProps =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search';

export interface ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  type?: ControlledTextInputType;
  inputMode?: ControlledTextInputModeProps;
  label?: string;
  subLabel?: string;
  readOnly?: boolean;
  noBorder?: boolean;
  placeholder?: string;
  hideErrorMessage?: boolean;
  startAdornmentComponent?: React.ReactNode;
  endAdornmentComponent?: React.ReactNode;
  isRequired?: boolean;
  maxLength?: number;
}

const ControlledTextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  subLabel,
  type = 'text',
  inputMode = 'text',
  readOnly,
  noBorder,
  placeholder,
  hideErrorMessage = false,
  shouldUnregister = true,
  startAdornmentComponent,
  endAdornmentComponent,
  isRequired = false,
  maxLength,
  ...rest
}: ControlledTextInputProps<TFieldValues, TName>) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <Controller
      {...rest}
      render={({
        field: { onChange, value, name, onBlur },
        fieldState: { error, invalid },
      }) => (
        <div className='w-full space-y-1'>
          {!!label && (
            <label className={classNames('inline-block')} htmlFor={name}>
              <span
                className={classNames(
                  'text-base font-medium',
                  invalid ? 'text-danger' : 'text-dark-9'
                )}
              >
                {label}
              </span>
              {!!subLabel && (
                <span className='text-sm text-dark-6 ml-1'>{subLabel}</span>
              )}
              {isRequired && <span className='text-danger ml-0.5'>*</span>}
            </label>
          )}
          <div
            className={classNames(
              'flex items-center border rounded-lg overflow-hidden',
              focus ? 'border-dark-9' : 'border-dark-5',
              value && 'text-dark-9',
              invalid && '!border-danger',
              {
                'pl-3': !!startAdornmentComponent,
                'pr-3': !!endAdornmentComponent,
                'border-none': noBorder,
              }
            )}
          >
            {startAdornmentComponent}
            <input
              id={name}
              value={value}
              onChange={onChange}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setFocus(false);
                onBlur();
              }}
              type={type}
              inputMode={inputMode}
              name={name}
              readOnly={readOnly}
              placeholder={placeholder}
              className={classNames(
                'appearance-none px-3 py-3.5 w-full border-none focus:outline-none focus:ring-0 text-base leading-[20px]',
                {
                  'bg-gray-50': readOnly,
                }
              )}
              maxLength={maxLength}
            />
            {endAdornmentComponent}
          </div>
          {!!error && !hideErrorMessage && (
            <FormErrorMessage message={error.message} />
          )}
        </div>
      )}
    />
  );
};
export default ControlledTextInput;
