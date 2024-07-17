import classNames from 'classnames';
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export interface ZenControlledFileUploadInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  buttonLabel?: string;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  readonly?: boolean;
  rightAction?: {
    text: string;
    onClick(): void;
  };
  subLabel?: string;
  isRequired?: boolean;
}

const ZenControlledFileUploadInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  buttonLabel = 'Browse',
  readonly,
  accept,
  multiple,
  rules,
  rightAction,
  defaultValue,
  shouldUnregister = true,
  subLabel,
  isRequired = false,
  ...rest
}: ZenControlledFileUploadInputProps<TFieldValues, TName>) => {
  return (
    <div className='space-y-1 w-full'>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        {...rest}
        render={({
          field: { name, value, ref, onChange },
          fieldState: { error, invalid },
        }) => {
          const fileNames = ((value as any) || [])
            .map((f: File) => f.name)
            .join(', ');

          return (
            <>
              <div className='flex flex-row justify-between'>
                {label && (
                  <label className='inline-block' htmlFor={name}>
                    <span
                      className={classNames(
                        'font-sans font-semibold',
                        invalid ? 'text-danger' : 'text-dark-9'
                      )}
                    >
                      {label}
                    </span>
                    {!!subLabel && (
                      <span className='font-sans text-sm text-gray-400 ml-1'>
                        {subLabel}
                      </span>
                    )}
                    {isRequired && <span className='text-error'>*</span>}
                  </label>
                )}
                {rightAction && (
                  <a
                    className='font-sans font-medium text-base text-primary underline'
                    href='#!'
                    onClick={rightAction.onClick}
                  >
                    {rightAction.text}
                  </a>
                )}
              </div>
              <div
                className={classNames(
                  'border rounded-lg overflow-hidden border-dark-5',
                  !!fileNames && 'border-dark-9',
                  invalid && '!border-danger'
                )}
              >
                <div
                  className={classNames({
                    'cursor-not-allowed': readonly,
                  })}
                >
                  <input
                    id={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(Array.from(e.target.files!));
                    }}
                    placeholder={placeholder}
                    accept={accept}
                    type='file'
                    disabled={readonly}
                    name={name}
                    multiple={multiple}
                    className='hidden'
                  />
                  <div
                    className={classNames(
                      'flex items-center appearance-none text-gray-500 w-full border-none focus:outline-none focus:ring-0 font-sans font-normal',
                      {
                        'bg-gray-50': readonly,
                      }
                    )}
                  >
                    <label htmlFor={name} className='border-r px-4 py-1.5'>
                      {buttonLabel}
                    </label>
                    <span className='px-3 line-clamp-1'>
                      {fileNames || placeholder}
                    </span>
                  </div>
                </div>
              </div>
              {error && <FormErrorMessage message={error.message} />}
            </>
          );
        }}
      />
    </div>
  );
};
export default ZenControlledFileUploadInput;
