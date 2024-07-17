import {
  Controller,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import classNames from 'classnames';
import { useState } from 'react';
import { ISelectOption } from '../../types';
import FormErrorMessage from './FormErrorMessage';

export interface FormFieldTooltipIndexProps {
  tooltipIndex?: number;
}

interface ControlledSelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName>,
    FormFieldTooltipIndexProps {
  label?: string;
  subLabel?: string;
  placeholder?: string;
  options: Array<ISelectOption>;
  readOnly?: boolean;
  isRequired?: boolean;
}

const ControlledHTMLSelectInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  subLabel,
  placeholder,
  options,
  readOnly = false,
  shouldUnregister = true,
  isRequired = false,
  ...rest
}: ControlledSelectInputProps<TFieldValues, TName>) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <Controller
      shouldUnregister={shouldUnregister}
      {...rest}
      render={({
        field: { onChange, value, name, onBlur },
        fieldState: { error, invalid },
      }) => (
        <div className='space-y-1 w-full'>
          {label && (
            <label className='inline-block' htmlFor={name}>
              <span
                className={classNames(
                  'font-sans font-semibold text-base',
                  invalid ? 'text-danger' : 'text-dark-9'
                )}
              >
                {label}
              </span>
              {!!subLabel && (
                <span className='font-sans text-sm text-dark-5 ml-1'>
                  {subLabel}
                </span>
              )}
              {isRequired && <span className='text-danger'>*</span>}
            </label>
          )}
          <div
            className={classNames(
              'flex items-stretch border rounded-lg overflow-hidden',
              value && value.length > 0 ? 'text-dark-9' : 'text-dark-5',
              invalid && '!border-danger',
              focus ? 'border-dark-9' : 'border-dark-5'
            )}
          >
            <select
              id={name}
              value={value}
              onChange={onChange}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setFocus(false);
                onBlur();
              }}
              name={name}
              placeholder={placeholder}
              disabled={readOnly}
              className={classNames(
                'appearance-none p-2 w-full border-none focus:outline-none focus:ring-0 font-sans font-normal',
                {
                  'bg-gray-50 pointer-events-none': readOnly,
                }
              )}
            >
              {options.map(({ value, label, disabled }) => (
                <option
                  key={[value, label].join(',')}
                  value={value}
                  disabled={disabled}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
          {error && <FormErrorMessage message={error.message} />}
        </div>
      )}
    />
  );
};

export default ControlledHTMLSelectInput;
