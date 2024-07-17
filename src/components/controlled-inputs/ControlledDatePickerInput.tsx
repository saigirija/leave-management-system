import classNames from 'classnames';
import { DateTime } from 'luxon';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { useState } from 'react';
import FormErrorMessage from './FormErrorMessage';

export interface FormFieldTooltipIndexProps {
  tooltipIndex?: number;
}

interface ControlledDatePickerInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName>,
    FormFieldTooltipIndexProps {
  label?: string;
  subLabel?: string;
  placeholder?: string;
  readOnly?: boolean;
  customInput?: React.ReactElement;
  datePickerConfig?: Omit<
    ReactDatePickerProps,
    'name' | 'onChange' | 'selected' | 'onBlur' | 'readOnly'
  >;
  icon?: React.ReactElement;
  endAdornment?: React.ReactElement;
  isRequired?: boolean;
  noBorder?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const ControlledDatePickerInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  subLabel,
  defaultValue,
  placeholder,
  readOnly,
  customInput,
  datePickerConfig = {},
  tooltipIndex,
  shouldUnregister = true,
  icon,
  noBorder,
  endAdornment,
  isRequired = false,
  minDate,
  maxDate,
  ...rest
}: ControlledDatePickerInputProps<TFieldValues, TName>) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Controller
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      {...rest}
      render={({
        field: { value, onChange, name, onBlur },
        fieldState: { error, invalid },
      }) => (
        <div className='w-full space-y-1'>
          {label && (
            <label className='inline-block' htmlFor={name}>
              <span
                className={classNames(
                  'font-body font-semibold',
                  invalid ? 'text-danger' : 'text-dark-9'
                )}
              >
                {label}
              </span>
              {!!subLabel && (
                <span className='font-body text-sm text-dark-6 ml-1'>
                  {subLabel}
                </span>
              )}
              {isRequired && <span className='text-danger'>*</span>}
            </label>
          )}
          <div
            className={classNames(
              'rounded-lg flex flex-row items-center overflow-hidden',
              {
                'border ': !noBorder,
              },
              focus ? 'border-dark-9' : 'border-dark-5',
              value && 'text-dark-9',
              invalid && '!border-danger'
            )}
            data-tooltip-index={tooltipIndex}
          >
            {icon && <div className='bg-white p-2 rounded-l'>{icon}</div>}
            <DatePicker
              name={name}
              selected={value ? DateTime.fromISO(value).toJSDate() : null}
              onChange={(date: Date) => {
                onChange(DateTime.fromJSDate(date).toISODate());
                setFocus(false);
              }}
              onFocus={() => setFocus(true)}
              onBlur={onBlur}
              placeholderText={placeholder}
              autoComplete='off'
              readOnly={readOnly}
              dateFormatCalendar='MMMM'
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              id={name}
              customInput={customInput}
              minDate={minDate}
              maxDate={maxDate}
              className={classNames(
                !customInput &&
                  'appearance-none border-0 rounded-r border-dark-5 p-2 focus:ring-0 focus:border-dark-5  bg-white w-full font-body font-normal',
                icon ? 'border-l-0' : 'rounded-l',
                {
                  'bg-gray-50': readOnly,
                }
              )}
              {...datePickerConfig}
            />
            {endAdornment && (
              <div className='flex items-center py-2.5 rounded-r-md pr-3 bg-white'>
                {endAdornment}
              </div>
            )}
          </div>
          {error && <FormErrorMessage message={error.message} />}
        </div>
      )}
    />
  );
};

export default ControlledDatePickerInput;
